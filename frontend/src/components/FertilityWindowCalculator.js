import React, { useState, useEffect } from 'react';
import { Heart, Calendar, TrendingUp } from 'lucide-react';

function FertilityWindowCalculator() {
  const [cycleLength, setCycleLength] = useState(28);
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [fertilityWindow, setFertilityWindow] = useState(null);

  const calculateFertility = () => {
    if (!lastPeriodDate) {
      alert('Please enter your last period date');
      return;
    }

    const lastPeriod = new Date(lastPeriodDate);
    const ovulationDay = cycleLength - 14;
    
    const ovulationDate = new Date(lastPeriod);
    ovulationDate.setDate(lastPeriod.getDate() + ovulationDay);

    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(ovulationDate.getDate() - 5);

    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(ovulationDate.getDate() + 1);

    const nextPeriod = new Date(lastPeriod);
    nextPeriod.setDate(lastPeriod.getDate() + cycleLength);

    const today = new Date();
    const daysUntilOvulation = Math.ceil((ovulationDate - today) / (1000 * 60 * 60 * 24));
    const isInFertileWindow = today >= fertileStart && today <= fertileEnd;

    setFertilityWindow({
      ovulationDate,
      fertileStart,
      fertileEnd,
      nextPeriod,
      daysUntilOvulation,
      isInFertileWindow,
      probability: isInFertileWindow ? 'High' : daysUntilOvulation > 0 && daysUntilOvulation <= 7 ? 'Medium' : 'Low'
    });
  };

  useEffect(() => {
    if (lastPeriodDate) {
      calculateFertility();
    }
  }, [cycleLength, lastPeriodDate]);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="fertility-calculator">
      <div className="fertility-header">
        <Heart size={24} />
        <h3>Fertility Window Calculator</h3>
      </div>

      <div className="calculator-inputs">
        <div className="input-group">
          <label>Last Period Start Date:</label>
          <input 
            type="date" 
            value={lastPeriodDate}
            onChange={(e) => setLastPeriodDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="input-group">
          <label>Average Cycle Length: {cycleLength} days</label>
          <input 
            type="range" 
            min="21" 
            max="35" 
            value={cycleLength}
            onChange={(e) => setCycleLength(parseInt(e.target.value))}
          />
          <div className="range-labels">
            <span>21</span>
            <span>28</span>
            <span>35</span>
          </div>
        </div>
      </div>

      {fertilityWindow && (
        <div className="fertility-results">
          <div className={`fertility-status ${fertilityWindow.isInFertileWindow ? 'high' : 'normal'}`}>
            <TrendingUp size={20} />
            <div>
              <h4>Conception Probability: {fertilityWindow.probability}</h4>
              <p>
                {fertilityWindow.isInFertileWindow 
                  ? '🌟 You are in your fertile window!' 
                  : fertilityWindow.daysUntilOvulation > 0 
                    ? `${fertilityWindow.daysUntilOvulation} days until ovulation`
                    : 'Ovulation has passed this cycle'}
              </p>
            </div>
          </div>

          <div className="fertility-dates">
            <div className="date-card ovulation">
              <Calendar size={18} />
              <div>
                <strong>Ovulation Day</strong>
                <p>{formatDate(fertilityWindow.ovulationDate)}</p>
              </div>
            </div>

            <div className="date-card fertile">
              <Heart size={18} />
              <div>
                <strong>Fertile Window</strong>
                <p>{formatDate(fertilityWindow.fertileStart)} - {formatDate(fertilityWindow.fertileEnd)}</p>
              </div>
            </div>

            <div className="date-card period">
              <Calendar size={18} />
              <div>
                <strong>Next Period</strong>
                <p>{formatDate(fertilityWindow.nextPeriod)}</p>
              </div>
            </div>
          </div>

          <div className="fertility-info">
            <h4>📚 Understanding Your Fertility:</h4>
            <ul>
              <li><strong>Fertile Window:</strong> 6 days before ovulation (5 days + ovulation day)</li>
              <li><strong>Peak Fertility:</strong> 2-3 days before ovulation</li>
              <li><strong>Ovulation:</strong> Typically occurs 14 days before next period</li>
              <li><strong>Conception Chance:</strong> Highest during fertile window (20-30%)</li>
            </ul>
          </div>

          <div className="fertility-tips">
            <h4>💡 Tips for Conception:</h4>
            <ul>
              <li>Track basal body temperature for more accuracy</li>
              <li>Monitor cervical mucus changes</li>
              <li>Use ovulation predictor kits</li>
              <li>Maintain a healthy lifestyle</li>
              <li>Consult a doctor if trying for over 12 months</li>
            </ul>
          </div>
        </div>
      )}

      <style jsx>{`
        .fertility-calculator {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin: 20px 0;
        }

        .fertility-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          color: #ff6b6b;
        }

        .calculator-inputs {
          margin-bottom: 24px;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        .input-group input[type="date"] {
          width: 100%;
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
        }

        .input-group input[type="range"] {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(to right, #ffc6c7, #ff6b6b);
        }

        .range-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #999;
          margin-top: 4px;
        }

        .fertility-results {
          margin-top: 24px;
        }

        .fertility-status {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 20px;
        }

        .fertility-status.high {
          background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
          border: 2px solid #4caf50;
        }

        .fertility-status.normal {
          background: linear-gradient(135deg, #fff5f5, #ffe0e0);
          border: 2px solid #ff6b6b;
        }

        .fertility-status h4 {
          margin: 0 0 4px 0;
          color: #333;
        }

        .fertility-status p {
          margin: 0;
          color: #666;
        }

        .fertility-dates {
          display: grid;
          gap: 12px;
          margin-bottom: 20px;
        }

        .date-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-radius: 8px;
          border: 2px solid;
        }

        .date-card.ovulation {
          background: #fff3e0;
          border-color: #ff9800;
          color: #e65100;
        }

        .date-card.fertile {
          background: #f3e5f5;
          border-color: #9c27b0;
          color: #6a1b9a;
        }

        .date-card.period {
          background: #ffebee;
          border-color: #f44336;
          color: #c62828;
        }

        .date-card strong {
          display: block;
          margin-bottom: 4px;
        }

        .date-card p {
          margin: 0;
          font-size: 14px;
        }

        .fertility-info, .fertility-tips {
          background: #f8f9fa;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 16px;
        }

        .fertility-info h4, .fertility-tips h4 {
          margin: 0 0 12px 0;
          color: #333;
        }

        .fertility-info ul, .fertility-tips ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .fertility-info li, .fertility-tips li {
          padding: 6px 0;
          padding-left: 20px;
          position: relative;
          color: #666;
          font-size: 14px;
        }

        .fertility-info li:before {
          content: "•";
          position: absolute;
          left: 0;
          color: #ff6b6b;
          font-weight: bold;
        }

        .fertility-tips li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #4caf50;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default FertilityWindowCalculator;
