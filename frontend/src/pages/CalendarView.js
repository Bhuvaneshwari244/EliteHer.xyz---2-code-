import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cyclesAPI, symptomsAPI } from '../services/api';
import { Shield, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import { AnimatedBackground } from '../components/AnimatedBackground';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSelector from '../components/LanguageSelector';

function CalendarView() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [cycles, setCycles] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [cyclesRes, symptomsRes] = await Promise.all([
        cyclesAPI.getCycles(),
        symptomsAPI.getSymptoms()
      ]);
      setCycles(cyclesRes.data.cycles || []);
      setSymptoms(symptomsRes.data.symptoms || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days in month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getDayType = (date) => {
    if (!date) return null;
    
    const dateStr = date.toISOString().split('T')[0];
    
    // Check if it's a period day
    for (const cycle of cycles) {
      const startDate = new Date(cycle.start_date);
      const endDate = cycle.end_date ? new Date(cycle.end_date) : null;
      
      if (endDate) {
        if (date >= startDate && date <= endDate) {
          return 'period';
        }
      }
    }
    
    // Check if there are symptoms logged
    const hasSymptoms = symptoms.some(s => s.date === dateStr);
    if (hasSymptoms) return 'symptom';
    
    // Check if it's predicted ovulation (day 14 of cycle)
    for (const cycle of cycles) {
      const startDate = new Date(cycle.start_date);
      const daysSinceStart = Math.floor((date - startDate) / (1000 * 60 * 60 * 24));
      
      if (daysSinceStart >= 12 && daysSinceStart <= 16) {
        return 'ovulation';
      }
      
      if (daysSinceStart >= 8 && daysSinceStart <= 18) {
        return 'fertile';
      }
    }
    
    return null;
  };

  const getDaySymptoms = (date) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return symptoms.filter(s => s.date === dateStr);
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const today = new Date();
  const days = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  if (loading) {
    return <div className="loading">Loading calendar...</div>;
  }

  return (
    <div className="dashboard">
      <Navigation />
      <AnimatedBackground />
      
      <button onClick={() => navigate(-1)} className="back-button" title="Go back">
        <ArrowLeft size={20} />
      </button>
      
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-logo">
            <span className="logo-icon">📅</span>
            <div>
              <h1 className="logo-title">Calendar View</h1>
              <p className="logo-subtitle">Visual cycle tracking</p>
            </div>
          </div>
          <div className="header-actions">
            <LanguageSelector />
            <ThemeToggle />
            <div className="privacy-badge">
              <Shield size={16} />
              <span>Private & Secure</span>
            </div>
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </div>
        </div>
      </header>

      <div className="page-container">
        {/* Calendar Header */}
        <div className="calendar-header">
          <button onClick={previousMonth} className="calendar-nav-btn">
            <ChevronLeft size={24} />
          </button>
          <h2 className="calendar-month">{monthName}</h2>
          <button onClick={nextMonth} className="calendar-nav-btn">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Legend */}
        <div className="calendar-legend">
          <div className="legend-item">
            <span className="legend-color period"></span>
            <span>Period</span>
          </div>
          <div className="legend-item">
            <span className="legend-color ovulation"></span>
            <span>Ovulation</span>
          </div>
          <div className="legend-item">
            <span className="legend-color fertile"></span>
            <span>Fertile Window</span>
          </div>
          <div className="legend-item">
            <span className="legend-color symptom"></span>
            <span>Symptoms Logged</span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="calendar-grid">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="calendar-day empty"></div>;
            }
            
            const dayType = getDayType(date);
            const isToday = date.toDateString() === today.toDateString();
            const daySymptoms = getDaySymptoms(date);
            
            return (
              <div
                key={index}
                className={`calendar-day ${dayType || ''} ${isToday ? 'today' : ''}`}
                onClick={() => setSelectedDay(date)}
              >
                <span className="day-number">{date.getDate()}</span>
                {daySymptoms.length > 0 && (
                  <span className="symptom-indicator">{daySymptoms.length}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Selected Day Details */}
        {selectedDay && (
          <div className="day-details">
            <h3>{selectedDay.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
            
            {getDaySymptoms(selectedDay).length > 0 ? (
              <div className="symptoms-list">
                <h4>Symptoms Logged:</h4>
                {getDaySymptoms(selectedDay).map((symptom, idx) => (
                  <div key={idx} className="symptom-item">
                    <p><strong>Mood:</strong> {symptom.mood}</p>
                    <p><strong>Pain Level:</strong> {symptom.pain_level}/10</p>
                    {symptom.symptoms && symptom.symptoms.length > 0 && (
                      <p><strong>Symptoms:</strong> {symptom.symptoms.join(', ')}</p>
                    )}
                    {symptom.notes && <p><strong>Notes:</strong> {symptom.notes}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-data">No symptoms logged for this day</p>
            )}
            
            <div className="day-actions">
              <button 
                onClick={() => navigate('/symptoms')} 
                className="btn-primary"
              >
                Log Symptoms
              </button>
              <button 
                onClick={() => setSelectedDay(null)} 
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">🌸</span>
            <span className="footer-name">Aura</span>
          </div>
          <p className="footer-disclaimer">
            For informational purposes only. Always consult a healthcare professional for medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default CalendarView;
