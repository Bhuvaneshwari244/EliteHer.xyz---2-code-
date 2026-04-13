import React, { useState, useEffect } from 'react';
import { Moon, Sun, TrendingUp, Star } from 'lucide-react';

function SleepTracker() {
  const [todaySleep, setTodaySleep] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [history, setHistory] = useState([]);
  const [formData, setFormData] = useState({
    bedtime: '23:00',
    wakeup: '07:00',
    quality: 7
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem('sleep_tracker');
    if (saved) {
      const data = JSON.parse(saved);
      const todayData = data.find(d => d.date === today);
      if (todayData) {
        setTodaySleep(todayData);
      }
      setHistory(data.slice(0, 7));
    }
  };

  const calculateDuration = (bedtime, wakeup) => {
    const bed = new Date(`2000-01-01T${bedtime}`);
    let wake = new Date(`2000-01-01T${wakeup}`);
    
    if (wake < bed) {
      wake = new Date(`2000-01-02T${wakeup}`);
    }
    
    const diff = wake - bed;
    const hours = diff / (1000 * 60 * 60);
    return hours.toFixed(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const duration = calculateDuration(formData.bedtime, formData.wakeup);
    const today = new Date().toISOString().split('T')[0];
    
    const newEntry = {
      date: today,
      bedtime: formData.bedtime,
      wakeup: formData.wakeup,
      duration: parseFloat(duration),
      quality: formData.quality,
      timestamp: new Date().toISOString()
    };

    const saved = localStorage.getItem('sleep_tracker');
    let data = saved ? JSON.parse(saved) : [];
    
    const todayIndex = data.findIndex(d => d.date === today);
    if (todayIndex >= 0) {
      data[todayIndex] = newEntry;
    } else {
      data.unshift(newEntry);
    }
    
    localStorage.setItem('sleep_tracker', JSON.stringify(data));
    setTodaySleep(newEntry);
    setHistory(data.slice(0, 7));
    setShowForm(false);
  };

  const getQualityLabel = (quality) => {
    if (quality >= 8) return 'Excellent';
    if (quality >= 6) return 'Good';
    if (quality >= 4) return 'Fair';
    return 'Poor';
  };

  const getQualityColor = (quality) => {
    if (quality >= 8) return '#10b981';
    if (quality >= 6) return '#3b82f6';
    if (quality >= 4) return '#f59e0b';
    return '#ef4444';
  };

  const avgDuration = history.length > 0 
    ? (history.reduce((sum, s) => sum + s.duration, 0) / history.length).toFixed(1)
    : 0;

  const avgQuality = history.length > 0
    ? (history.reduce((sum, s) => sum + s.quality, 0) / history.length).toFixed(1)
    : 0;

  return (
    <div className="sleep-tracker-card">
      <div className="sleep-header">
        <div>
          <h3>
            <Moon size={24} />
            Sleep Tracker
          </h3>
          <p className="sleep-subtitle">Monitor your sleep patterns</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {todaySleep ? 'Update' : 'Log Sleep'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="sleep-form">
          <div className="form-row">
            <div className="form-group">
              <label>
                <Moon size={16} />
                Bedtime
              </label>
              <input
                type="time"
                value={formData.bedtime}
                onChange={(e) => setFormData({...formData, bedtime: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>
                <Sun size={16} />
                Wake Up Time
              </label>
              <input
                type="time"
                value={formData.wakeup}
                onChange={(e) => setFormData({...formData, wakeup: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Sleep Quality: {formData.quality}/10</label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.quality}
              onChange={(e) => setFormData({...formData, quality: parseInt(e.target.value)})}
              className="quality-slider"
            />
            <div className="quality-labels">
              <span>Poor</span>
              <span>Fair</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Save Sleep Data</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}

      {todaySleep ? (
        <div className="sleep-today">
          <div className="sleep-visual">
            <div className="sleep-circle">
              <Moon size={48} color="#6366f1" />
              <span className="sleep-hours">{todaySleep.duration}h</span>
            </div>
          </div>

          <div className="sleep-details">
            <div className="sleep-time">
              <Moon size={20} />
              <div>
                <span className="time-label">Bedtime</span>
                <span className="time-value">{todaySleep.bedtime}</span>
              </div>
            </div>
            <div className="sleep-time">
              <Sun size={20} />
              <div>
                <span className="time-label">Wake Up</span>
                <span className="time-value">{todaySleep.wakeup}</span>
              </div>
            </div>
            <div className="sleep-quality-display">
              <Star size={20} fill={getQualityColor(todaySleep.quality)} color={getQualityColor(todaySleep.quality)} />
              <div>
                <span className="quality-label">Quality</span>
                <span className="quality-value" style={{color: getQualityColor(todaySleep.quality)}}>
                  {getQualityLabel(todaySleep.quality)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <Moon size={48} color="#ccc" />
          <p>No sleep data for today</p>
          <p className="empty-subtitle">Log your sleep to track patterns</p>
        </div>
      )}

      {history.length > 0 && (
        <div className="sleep-stats">
          <h4>
            <TrendingUp size={18} />
            7-Day Average
          </h4>
          <div className="stats-grid">
            <div className="stat-box">
              <span className="stat-value">{avgDuration}h</span>
              <span className="stat-label">Sleep Duration</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{avgQuality}/10</span>
              <span className="stat-label">Sleep Quality</span>
            </div>
          </div>

          <div className="sleep-history-chart">
            {history.map((sleep, idx) => (
              <div key={idx} className="history-item">
                <div className="history-bar-container">
                  <div 
                    className="history-bar"
                    style={{
                      height: `${(sleep.duration / 12) * 100}%`,
                      background: getQualityColor(sleep.quality)
                    }}
                  />
                </div>
                <span className="history-label">
                  {new Date(sleep.date).toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="sleep-tips">
        <h4>😴 Sleep Tips</h4>
        <ul>
          <li>Aim for 7-9 hours of sleep per night</li>
          <li>Maintain a consistent sleep schedule</li>
          <li>Sleep quality affects menstrual health</li>
          <li>Avoid screens 1 hour before bed</li>
        </ul>
      </div>
    </div>
  );
}

export default SleepTracker;
