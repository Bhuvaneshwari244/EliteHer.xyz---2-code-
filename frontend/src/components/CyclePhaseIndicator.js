import React from 'react';
import { Calendar, Droplet, Heart, Moon } from 'lucide-react';

const phases = [
  {
    name: 'Menstrual',
    icon: Droplet,
    color: '#ef4444',
    description: 'Your period is here',
    tips: ['Stay hydrated', 'Rest when needed', 'Use heat for cramps']
  },
  {
    name: 'Follicular',
    icon: Calendar,
    color: '#10b981',
    description: 'Energy is building',
    tips: ['Great time for new projects', 'Increase exercise', 'Focus on goals']
  },
  {
    name: 'Ovulation',
    icon: Heart,
    color: '#f59e0b',
    description: 'Peak fertility window',
    tips: ['High energy levels', 'Social activities', 'Creative work']
  },
  {
    name: 'Luteal',
    icon: Moon,
    color: '#8b5cf6',
    description: 'Winding down',
    tips: ['Self-care focus', 'Gentle exercise', 'Prepare for period']
  }
];

function getCurrentPhase(cycles) {
  if (!cycles || cycles.length === 0) {
    return { ...phases[0], currentDay: 1, totalDays: 28 };
  }

  const sorted = [...cycles].sort((a, b) => 
    new Date(b.start_date).getTime() - new Date(a.start_date).getTime()
  );
  
  const lastStart = new Date(sorted[0].start_date);
  const daysSinceLast = Math.floor((Date.now() - lastStart.getTime()) / (1000 * 60 * 60 * 24));
  const avgLen = 28; // Default cycle length
  const currentDay = (daysSinceLast % avgLen) + 1;

  let phase;
  if (currentDay <= 5) phase = phases[0];
  else if (currentDay <= 13) phase = phases[1];
  else if (currentDay <= 16) phase = phases[2];
  else phase = phases[3];

  return { ...phase, currentDay, totalDays: avgLen };
}

export function CyclePhaseIndicator({ cycles }) {
  const phase = getCurrentPhase(cycles);
  const Icon = phase.icon;
  const progress = cycles && cycles.length > 0 ? (phase.currentDay / phase.totalDays) * 100 : 0;

  return (
    <div className="cycle-phase-card">
      <div className="phase-header">
        <div>
          <h3 className="phase-title">Current Phase</h3>
          {cycles && cycles.length > 0 && (
            <p className="phase-day">Day {phase.currentDay} of {phase.totalDays}</p>
          )}
        </div>
      </div>

      <div className="phase-content">
        <div className="phase-icon-wrapper">
          <Icon size={48} style={{ color: phase.color }} />
        </div>
        <div>
          <h4 className="phase-name" style={{ color: phase.color }}>{phase.name}</h4>
          <p className="phase-description">{phase.description}</p>
        </div>
      </div>

      {cycles && cycles.length > 0 && (
        <div className="phase-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%`, backgroundColor: phase.color }}></div>
          </div>
        </div>
      )}

      <div className="phase-tips">
        {phase.tips.map((tip, i) => (
          <div key={i} className="tip-item">• {tip}</div>
        ))}
      </div>
    </div>
  );
}
