import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Droplet, AlertCircle } from 'lucide-react';

export function SmartReminders({ cycles, nextPeriod }) {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    generateReminders();
  }, [cycles, nextPeriod]);

  const generateReminders = () => {
    const newReminders = [];
    const today = new Date();

    // Next period reminder
    if (nextPeriod) {
      const daysUntil = Math.ceil((new Date(nextPeriod) - today) / (1000 * 60 * 60 * 24));
      
      if (daysUntil <= 3 && daysUntil > 0) {
        newReminders.push({
          id: 'period-soon',
          icon: Droplet,
          color: 'var(--coral)',
          title: 'Period Coming Soon',
          message: `Your period is expected in ${daysUntil} day${daysUntil !== 1 ? 's' : ''}`,
          priority: 'high',
          action: 'Prepare supplies'
        });
      } else if (daysUntil === 0) {
        newReminders.push({
          id: 'period-today',
          icon: Droplet,
          color: 'var(--rose)',
          title: 'Period Expected Today',
          message: 'Your period is predicted to start today',
          priority: 'high',
          action: 'Log when it starts'
        });
      } else if (daysUntil <= 7 && daysUntil > 3) {
        newReminders.push({
          id: 'period-week',
          icon: Calendar,
          color: 'var(--warm)',
          title: 'Period in a Week',
          message: `Your period is expected in ${daysUntil} days`,
          priority: 'medium',
          action: 'Track symptoms'
        });
      }
    }

    // Log reminder if no recent entries
    if (cycles && cycles.length > 0) {
      const lastCycle = cycles.sort((a, b) => 
        new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
      )[0];
      const daysSinceLog = Math.floor((today - new Date(lastCycle.start_date)) / (1000 * 60 * 60 * 24));
      
      if (daysSinceLog > 40) {
        newReminders.push({
          id: 'log-reminder',
          icon: AlertCircle,
          color: 'var(--warm)',
          title: 'Time to Log',
          message: `It's been ${daysSinceLog} days since your last entry`,
          priority: 'medium',
          action: 'Log your period'
        });
      }
    } else {
      newReminders.push({
        id: 'first-log',
        icon: Calendar,
        color: 'var(--coral)',
        title: 'Start Tracking',
        message: 'Log your first period to get personalized predictions',
        priority: 'high',
        action: 'Log period now'
      });
    }

    // Health check reminder
    if (cycles && cycles.length >= 3) {
      const lastCycles = cycles.slice(-3);
      const hasIrregular = lastCycles.some(c => {
        // Check if any cycle is irregular
        return false; // Simplified for now
      });
      
      if (hasIrregular) {
        newReminders.push({
          id: 'health-check',
          icon: AlertCircle,
          color: 'var(--rose)',
          title: 'Health Check Recommended',
          message: 'Your cycles show irregular patterns',
          priority: 'high',
          action: 'View PCOD assessment'
        });
      }
    }

    setReminders(newReminders);
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'reminder-high';
      case 'medium': return 'reminder-medium';
      default: return 'reminder-low';
    }
  };

  if (reminders.length === 0) {
    return null;
  }

  return (
    <div className="smart-reminders-card">
      <div className="reminders-header">
        <Bell size={20} />
        <h3>Smart Reminders</h3>
        <span className="reminder-badge">{reminders.length}</span>
      </div>

      <div className="reminders-list">
        {reminders.map((reminder) => {
          const Icon = reminder.icon;
          return (
            <div key={reminder.id} className={`reminder-item ${getPriorityClass(reminder.priority)}`}>
              <div className="reminder-icon" style={{ color: reminder.color }}>
                <Icon size={20} />
              </div>
              <div className="reminder-content">
                <h4>{reminder.title}</h4>
                <p>{reminder.message}</p>
                <span className="reminder-action">{reminder.action}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
