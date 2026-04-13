import React, { useState, useEffect } from 'react';
import { Droplet, Plus, Minus, TrendingUp } from 'lucide-react';

function WaterTracker() {
  const [todayIntake, setTodayIntake] = useState(0);
  const [goal, setGoal] = useState(8); // 8 glasses default
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem('water_tracker');
    if (saved) {
      const data = JSON.parse(saved);
      const todayData = data.find(d => d.date === today);
      if (todayData) {
        setTodayIntake(todayData.intake);
      }
      setHistory(data.slice(0, 7)); // Last 7 days
    }
    
    const savedGoal = localStorage.getItem('water_goal');
    if (savedGoal) {
      setGoal(parseInt(savedGoal));
    }
  };

  const saveData = (intake) => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem('water_tracker');
    let data = saved ? JSON.parse(saved) : [];
    
    const todayIndex = data.findIndex(d => d.date === today);
    if (todayIndex >= 0) {
      data[todayIndex].intake = intake;
    } else {
      data.unshift({ date: today, intake });
    }
    
    localStorage.setItem('water_tracker', JSON.stringify(data));
    setTodayIntake(intake);
    setHistory(data.slice(0, 7));
  };

  const addGlass = () => {
    saveData(todayIntake + 1);
  };

  const removeGlass = () => {
    if (todayIntake > 0) {
      saveData(todayIntake - 1);
    }
  };

  const percentage = Math.min((todayIntake / goal) * 100, 100);

  return (
    <div className="water-tracker-card">
      <h3>
        <Droplet size={24} />
        Water Intake Tracker
      </h3>

      <div className="water-goal">
        <div className="water-visual">
          <div className="water-glass">
            <div 
              className="water-fill"
              style={{ height: `${percentage}%` }}
            >
              <div className="water-wave"></div>
            </div>
            <span className="water-count">{todayIntake}/{goal}</span>
          </div>
        </div>

        <div className="water-info">
          <h4>Today's Progress</h4>
          <p className="water-status">
            {todayIntake >= goal ? (
              <span className="status-complete">🎉 Goal achieved!</span>
            ) : (
              <span className="status-pending">
                {goal - todayIntake} more glass{goal - todayIntake !== 1 ? 'es' : ''} to go
              </span>
            )}
          </p>
          
          <div className="water-controls">
            <button onClick={removeGlass} className="water-btn minus" disabled={todayIntake === 0}>
              <Minus size={20} />
            </button>
            <button onClick={addGlass} className="water-btn plus">
              <Plus size={20} />
            </button>
          </div>

          <div className="goal-setter">
            <label>Daily Goal:</label>
            <input
              type="number"
              min="1"
              max="20"
              value={goal}
              onChange={(e) => {
                const newGoal = parseInt(e.target.value);
                setGoal(newGoal);
                localStorage.setItem('water_goal', newGoal);
              }}
            />
            <span>glasses</span>
          </div>
        </div>
      </div>

      {history.length > 0 && (
        <div className="water-history">
          <h4>
            <TrendingUp size={18} />
            Last 7 Days
          </h4>
          <div className="history-bars">
            {history.map((day, idx) => (
              <div key={idx} className="history-bar-item">
                <div className="history-bar-container">
                  <div 
                    className="history-bar"
                    style={{ height: `${(day.intake / goal) * 100}%` }}
                  />
                </div>
                <span className="history-date">
                  {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="water-tips">
        <h4>💡 Hydration Tips</h4>
        <ul>
          <li>Drink a glass of water when you wake up</li>
          <li>Keep water nearby throughout the day</li>
          <li>Drink more during your period</li>
          <li>Increase intake if exercising</li>
        </ul>
      </div>
    </div>
  );
}

export default WaterTracker;
