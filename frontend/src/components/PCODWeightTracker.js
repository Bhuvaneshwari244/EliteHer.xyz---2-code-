import React, { useState } from 'react';
import { TrendingDown, Target, Calendar, Award } from 'lucide-react';

function PCODWeightTracker() {
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [height, setHeight] = useState('');
  const [weightHistory, setWeightHistory] = useState([
    { date: '2026-04-01', weight: 75, bmi: 27.5 },
    { date: '2026-04-08', weight: 74, bmi: 27.2 },
    { date: '2026-04-13', weight: 73.5, bmi: 27.0 }
  ]);

  const calculateBMI = (weight, heightCm) => {
    const heightM = heightCm / 100;
    return (weight / (heightM * heightM)).toFixed(1);
  };

  const addWeightEntry = () => {
    if (!currentWeight || !height) {
      alert('Please enter weight and height');
      return;
    }

    const bmi = calculateBMI(parseFloat(currentWeight), parseFloat(height));
    const entry = {
      date: new Date().toISOString().split('T')[0],
      weight: parseFloat(currentWeight),
      bmi: parseFloat(bmi)
    };

    setWeightHistory([entry, ...weightHistory]);
    setCurrentWeight('');
    alert('Weight logged successfully!');
  };

  const getWeightLoss = () => {
    if (weightHistory.length < 2) return 0;
    return (weightHistory[weightHistory.length - 1].weight - weightHistory[0].weight).toFixed(1);
  };

  const getProgressPercentage = () => {
    if (!targetWeight || weightHistory.length === 0) return 0;
    const start = weightHistory[weightHistory.length - 1].weight;
    const current = weightHistory[0].weight;
    const target = parseFloat(targetWeight);
    const progress = ((start - current) / (start - target)) * 100;
    return Math.min(Math.max(progress, 0), 100).toFixed(0);
  };

  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: 'Underweight', color: '#2196f3' };
    if (bmi < 25) return { category: 'Normal', color: '#4caf50' };
    if (bmi < 30) return { category: 'Overweight', color: '#ff9800' };
    return { category: 'Obese', color: '#f44336' };
  };

  const latestBMI = weightHistory.length > 0 ? weightHistory[0].bmi : 0;
  const bmiInfo = getBMICategory(latestBMI);

  return (
    <div className="pcod-weight-tracker">
      <div className="weight-header">
        <TrendingDown size={24} />
        <h3>PCOD Weight Management</h3>
      </div>

      <div className="weight-info">
        <p>💡 Even 5-10% weight loss can significantly improve PCOD symptoms</p>
        <p><strong>Benefits:</strong> Better insulin sensitivity, regular periods, reduced symptoms</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#e3f2fd' }}>
            <TrendingDown size={24} color="#2196f3" />
          </div>
          <div className="stat-info">
            <span className="stat-label">Weight Lost</span>
            <span className="stat-value">{Math.abs(getWeightLoss())} kg</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: bmiInfo.color + '20' }}>
            <Target size={24} style={{ color: bmiInfo.color }} />
          </div>
          <div className="stat-info">
            <span className="stat-label">Current BMI</span>
            <span className="stat-value">{latestBMI}</span>
            <span className="stat-category" style={{ color: bmiInfo.color }}>{bmiInfo.category}</span>
          </div>
        </div>

        {targetWeight && (
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#e8f5e9' }}>
              <Award size={24} color="#4caf50" />
            </div>
            <div className="stat-info">
              <span className="stat-label">Progress</span>
              <span className="stat-value">{getProgressPercentage()}%</span>
            </div>
          </div>
        )}
      </div>

      <div className="log-weight-section">
        <h4>Log Your Weight</h4>
        <div className="input-grid">
          <div className="input-group">
            <label>Current Weight (kg):</label>
            <input 
              type="number"
              step="0.1"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(e.target.value)}
              placeholder="e.g., 70.5"
            />
          </div>

          <div className="input-group">
            <label>Height (cm):</label>
            <input 
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g., 165"
            />
          </div>

          <div className="input-group">
            <label>Target Weight (kg):</label>
            <input 
              type="number"
              step="0.1"
              value={targetWeight}
              onChange={(e) => setTargetWeight(e.target.value)}
              placeholder="e.g., 65"
            />
          </div>
        </div>

        <button className="log-btn" onClick={addWeightEntry}>
          <Calendar size={18} />
          Log Weight
        </button>
      </div>

      {weightHistory.length > 0 && (
        <div className="weight-chart">
          <h4>Weight Progress</h4>
          <div className="chart-container">
            {weightHistory.slice().reverse().map((entry, index) => (
              <div key={index} className="chart-bar">
                <div 
                  className="bar-fill"
                  style={{ 
                    height: `${(entry.weight / Math.max(...weightHistory.map(e => e.weight))) * 100}%`,
                    background: 'linear-gradient(180deg, #ff6b6b, #ee5a6f)'
                  }}
                >
                  <span className="bar-value">{entry.weight}kg</span>
                </div>
                <span className="bar-date">{new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="weight-tips">
        <h4>🎯 PCOD Weight Loss Tips:</h4>
        <ul>
          <li><strong>Diet:</strong> Low GI, high protein, reduce refined carbs</li>
          <li><strong>Exercise:</strong> 150 min/week cardio + strength training</li>
          <li><strong>Portion Control:</strong> Use smaller plates, eat slowly</li>
          <li><strong>Hydration:</strong> Drink 8-10 glasses of water daily</li>
          <li><strong>Sleep:</strong> 7-8 hours quality sleep</li>
          <li><strong>Stress:</strong> Manage stress - it affects hormones</li>
          <li><strong>Consistency:</strong> Aim for 0.5-1kg loss per week</li>
          <li><strong>Track:</strong> Log food, exercise, and weight regularly</li>
        </ul>
      </div>

      <style jsx>{`
        .pcod-weight-tracker {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin: 20px 0;
        }

        .weight-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          color: #2196f3;
        }

        .weight-info {
          background: #e3f2fd;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          border-left: 4px solid #2196f3;
        }

        .weight-info p {
          margin: 4px 0;
          color: #333;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 12px;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-label {
          font-size: 13px;
          color: #666;
        }

        .stat-value {
          font-size: 28px;
          font-weight: bold;
          color: #333;
        }

        .stat-category {
          font-size: 12px;
          font-weight: 600;
        }

        .log-weight-section {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .log-weight-section h4 {
          margin: 0 0 16px 0;
        }

        .input-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
          margin-bottom: 16px;
        }

        .input-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
          font-size: 14px;
        }

        .input-group input {
          width: 100%;
          padding: 10px;
          border: 2px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
        }

        .log-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 12px;
          background: #2196f3;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .log-btn:hover {
          background: #1976d2;
          transform: translateY(-2px);
        }

        .weight-chart {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .weight-chart h4 {
          margin: 0 0 16px 0;
        }

        .chart-container {
          display: flex;
          align-items: flex-end;
          gap: 16px;
          height: 200px;
          padding: 10px 0;
        }

        .chart-bar {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
        }

        .bar-fill {
          width: 100%;
          border-radius: 8px 8px 0 0;
          display: flex;
          align-items: flex-start;
          justify-content: center;
          padding-top: 8px;
          margin-top: auto;
          transition: height 0.3s ease;
        }

        .bar-value {
          color: white;
          font-size: 12px;
          font-weight: 600;
        }

        .bar-date {
          font-size: 11px;
          color: #666;
          margin-top: 8px;
        }

        .weight-tips {
          background: #fff5f5;
          padding: 16px;
          border-radius: 8px;
        }

        .weight-tips h4 {
          margin: 0 0 12px 0;
        }

        .weight-tips ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .weight-tips li {
          padding: 6px 0;
          color: #666;
          font-size: 14px;
        }

        .weight-tips strong {
          color: #2196f3;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .input-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default PCODWeightTracker;
