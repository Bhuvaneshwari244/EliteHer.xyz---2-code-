import React, { useState, useEffect } from 'react';
import { Target, Plus, Check, Trash2, TrendingUp } from 'lucide-react';

function GoalTracker() {
  const [goals, setGoals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'health',
    target: '',
    deadline: ''
  });

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = () => {
    const saved = localStorage.getItem('health_goals');
    if (saved) {
      setGoals(JSON.parse(saved));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newGoal = {
      ...formData,
      id: Date.now(),
      progress: 0,
      completed: false,
      createdAt: new Date().toISOString()
    };

    const updated = [...goals, newGoal];
    setGoals(updated);
    localStorage.setItem('health_goals', JSON.stringify(updated));
    
    setFormData({ title: '', category: 'health', target: '', deadline: '' });
    setShowForm(false);
  };

  const updateProgress = (id, progress) => {
    const updated = goals.map(g => {
      if (g.id === id) {
        return {
          ...g,
          progress: Math.min(100, Math.max(0, progress)),
          completed: progress >= 100
        };
      }
      return g;
    });
    setGoals(updated);
    localStorage.setItem('health_goals', JSON.stringify(updated));
  };

  const deleteGoal = (id) => {
    const updated = goals.filter(g => g.id !== id);
    setGoals(updated);
    localStorage.setItem('health_goals', JSON.stringify(updated));
  };

  const getCategoryColor = (category) => {
    const colors = {
      health: '#10b981',
      fitness: '#f59e0b',
      nutrition: '#8b5cf6',
      mental: '#3b82f6',
      cycle: '#ec4899'
    };
    return colors[category] || '#6366f1';
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      health: '🏥',
      fitness: '💪',
      nutrition: '🥗',
      mental: '🧘‍♀️',
      cycle: '📅'
    };
    return emojis[category] || '🎯';
  };

  const completedGoals = goals.filter(g => g.completed).length;
  const activeGoals = goals.filter(g => !g.completed).length;

  return (
    <div className="goal-tracker-card">
      <div className="goal-header">
        <div>
          <h3>
            <Target size={24} />
            Health Goals
          </h3>
          <p className="goal-subtitle">Track your wellness journey</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          {showForm ? 'Cancel' : 'New Goal'}
        </button>
      </div>

      <div className="goal-stats">
        <div className="goal-stat">
          <TrendingUp size={20} color="#10b981" />
          <div>
            <span className="stat-value">{activeGoals}</span>
            <span className="stat-label">Active Goals</span>
          </div>
        </div>
        <div className="goal-stat">
          <Check size={20} color="#6366f1" />
          <div>
            <span className="stat-value">{completedGoals}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="goal-form">
          <div className="form-group">
            <label>Goal Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Drink 8 glasses of water daily"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                required
              >
                <option value="health">Health</option>
                <option value="fitness">Fitness</option>
                <option value="nutrition">Nutrition</option>
                <option value="mental">Mental Wellness</option>
                <option value="cycle">Cycle Tracking</option>
              </select>
            </div>

            <div className="form-group">
              <label>Target</label>
              <input
                type="text"
                value={formData.target}
                onChange={(e) => setFormData({...formData, target: e.target.value})}
                placeholder="e.g., 30 days"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Deadline (Optional)</label>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => setFormData({...formData, deadline: e.target.value})}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <button type="submit" className="btn-primary">Create Goal</button>
        </form>
      )}

      <div className="goals-list">
        {goals.length === 0 ? (
          <div className="empty-state">
            <Target size={48} color="#ccc" />
            <p>No goals yet</p>
            <p className="empty-subtitle">Set your first health goal to get started!</p>
          </div>
        ) : (
          goals.map(goal => (
            <div key={goal.id} className={`goal-card ${goal.completed ? 'completed' : ''}`}>
              <div className="goal-content">
                <div className="goal-icon" style={{ background: getCategoryColor(goal.category) }}>
                  {getCategoryEmoji(goal.category)}
                </div>
                <div className="goal-details">
                  <h4>{goal.title}</h4>
                  <div className="goal-meta">
                    <span className="goal-category">{goal.category}</span>
                    {goal.target && <span className="goal-target">Target: {goal.target}</span>}
                    {goal.deadline && (
                      <span className="goal-deadline">
                        Due: {new Date(goal.deadline).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    )}
                  </div>
                  
                  <div className="goal-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ 
                          width: `${goal.progress}%`,
                          background: getCategoryColor(goal.category)
                        }}
                      />
                    </div>
                    <span className="progress-text">{goal.progress}%</span>
                  </div>

                  {!goal.completed && (
                    <div className="progress-controls">
                      <button 
                        onClick={() => updateProgress(goal.id, goal.progress - 10)}
                        className="btn-progress"
                      >
                        -10%
                      </button>
                      <button 
                        onClick={() => updateProgress(goal.id, goal.progress + 10)}
                        className="btn-progress"
                      >
                        +10%
                      </button>
                      <button 
                        onClick={() => updateProgress(goal.id, 100)}
                        className="btn-complete"
                      >
                        <Check size={16} />
                        Complete
                      </button>
                    </div>
                  )}

                  {goal.completed && (
                    <div className="completed-badge">
                      <Check size={16} />
                      Completed!
                    </div>
                  )}
                </div>
              </div>
              
              <button 
                className="btn-delete"
                onClick={() => deleteGoal(goal.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GoalTracker;
