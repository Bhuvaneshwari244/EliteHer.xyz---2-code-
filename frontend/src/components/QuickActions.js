import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Activity, AlertCircle, FileDown, Calendar } from 'lucide-react';

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'log-period',
      icon: Plus,
      label: 'Log Period',
      color: 'var(--coral)',
      onClick: () => navigate('/cycles')
    },
    {
      id: 'log-symptom',
      icon: Activity,
      label: 'Log Symptoms',
      color: 'var(--warm)',
      onClick: () => navigate('/symptoms')
    },
    {
      id: 'pcod-check',
      icon: AlertCircle,
      label: 'PCOD Check',
      color: 'var(--rose)',
      onClick: () => navigate('/pcod-assessment')
    },
    {
      id: 'view-calendar',
      icon: Calendar,
      label: 'View Calendar',
      color: 'var(--sage)',
      onClick: () => navigate('/cycles')
    }
  ];

  return (
    <div className="quick-actions-card">
      <h3 className="quick-actions-title">Quick Actions</h3>
      <div className="quick-actions-grid">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={action.onClick}
              className="quick-action-btn"
              style={{ '--action-color': action.color }}
            >
              <div className="quick-action-icon">
                <Icon size={24} />
              </div>
              <span className="quick-action-label">{action.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
