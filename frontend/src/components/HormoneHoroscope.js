import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Heart, Zap } from 'lucide-react';

function HormoneHoroscope() {
  const [horoscope, setHoroscope] = useState(null);
  const [cycleDay, setCycleDay] = useState(1);

  useEffect(() => {
    generateHoroscope(cycleDay);
  }, [cycleDay]);

  const getCyclePhase = (day) => {
    if (day >= 1 && day <= 5) return 'menstrual';
    if (day >= 6 && day <= 13) return 'follicular';
    if (day >= 14 && day <= 16) return 'ovulation';
    return 'luteal';
  };

  const generateHoroscope = (day) => {
    const phase = getCyclePhase(day);
    
    const horoscopes = {
      menstrual: {
        phase: 'Menstrual Phase',
        emoji: '🌙',
        color: '#9b59b6',
        energy: 'Low',
        mood: 'Introspective',
        prediction: 'Today is a day for rest and self-care. Your body is working hard, so be gentle with yourself.',
        tips: [
          'Take it easy - rest is productive',
          'Stay hydrated and eat iron-rich foods',
          'Light yoga or stretching can help with cramps',
          'Perfect day for journaling or meditation'
        ],
        activities: ['Rest', 'Light yoga', 'Reading', 'Warm baths'],
        avoid: ['Intense workouts', 'Stressful meetings', 'Late nights'],
        superpower: 'Intuition is heightened - trust your gut feelings'
      },
      follicular: {
        phase: 'Follicular Phase',
        emoji: '🌱',
        color: '#27ae60',
        energy: 'Rising',
        mood: 'Optimistic',
        prediction: 'Your energy is building! This is a great time to start new projects and take on challenges.',
        tips: [
          'Perfect time to try new things',
          'Your creativity is peaking',
          'Great for learning and problem-solving',
          'Social activities will feel energizing'
        ],
        activities: ['New projects', 'Socializing', 'Learning', 'Exercise'],
        avoid: ['Procrastination', 'Isolation'],
        superpower: 'Peak creativity and mental clarity'
      },
      ovulation: {
        phase: 'Ovulation Phase',
        emoji: '✨',
        color: '#f39c12',
        energy: 'Peak',
        mood: 'Confident',
        prediction: 'You\'re at your peak! Confidence is high, and you\'re radiating positive energy.',
        tips: [
          'Schedule important meetings or presentations',
          'Perfect time for job interviews',
          'Your communication skills are at their best',
          'Great for physical activities and workouts'
        ],
        activities: ['Presentations', 'Networking', 'HIIT workouts', 'Dating'],
        avoid: ['Staying in your comfort zone', 'Missing opportunities'],
        superpower: 'Magnetic charisma and peak performance'
      },
      luteal: {
        phase: 'Luteal Phase',
        emoji: '🍂',
        color: '#e67e22',
        energy: 'Declining',
        mood: 'Focused',
        prediction: 'Energy is winding down. Focus on completing tasks and preparing for your period.',
        tips: [
          'Great for detail-oriented work',
          'Listen to your body\'s needs',
          'Reduce caffeine and sugar',
          'Practice stress management'
        ],
        activities: ['Organizing', 'Completing projects', 'Self-care', 'Meal prep'],
        avoid: ['Starting big projects', 'Overcommitting', 'Junk food'],
        superpower: 'Attention to detail and organizational skills'
      }
    };

    setHoroscope(horoscopes[phase]);
  };

  if (!horoscope) return null;

  return (
    <div className="hormone-horoscope">
      <div className="horoscope-header">
        <Sparkles size={24} />
        <h3>Your Hormone Horoscope</h3>
      </div>

      <div className="cycle-day-selector">
        <label>Cycle Day:</label>
        <input 
          type="number" 
          min="1" 
          max="35" 
          value={cycleDay}
          onChange={(e) => setCycleDay(parseInt(e.target.value) || 1)}
        />
      </div>

      <div className="horoscope-card" style={{ borderColor: horoscope.color }}>
        <div className="phase-header" style={{ background: horoscope.color }}>
          <span className="phase-emoji">{horoscope.emoji}</span>
          <h4>{horoscope.phase}</h4>
        </div>

        <div className="horoscope-stats">
          <div className="stat">
            <Zap size={16} />
            <span>Energy: {horoscope.energy}</span>
          </div>
          <div className="stat">
            <Heart size={16} />
            <span>Mood: {horoscope.mood}</span>
          </div>
        </div>

        <div className="prediction">
          <p>{horoscope.prediction}</p>
        </div>

        <div className="superpower">
          <TrendingUp size={18} />
          <p><strong>Today's Superpower:</strong> {horoscope.superpower}</p>
        </div>

        <div className="tips-section">
          <h5>💡 Tips for Today:</h5>
          <ul>
            {horoscope.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

        <div className="activities-grid">
          <div className="activity-box do">
            <h5>✅ Do Today:</h5>
            <ul>
              {horoscope.activities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
          <div className="activity-box avoid">
            <h5>❌ Avoid:</h5>
            <ul>
              {horoscope.avoid.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hormone-horoscope {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin: 20px 0;
        }

        .horoscope-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          color: #ff6b6b;
        }

        .cycle-day-selector {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .cycle-day-selector input {
          width: 80px;
          padding: 8px;
          border: 2px solid #ddd;
          border-radius: 6px;
          font-size: 16px;
        }

        .horoscope-card {
          border: 3px solid;
          border-radius: 12px;
          overflow: hidden;
        }

        .phase-header {
          padding: 20px;
          color: white;
          text-align: center;
        }

        .phase-emoji {
          font-size: 48px;
          display: block;
          margin-bottom: 8px;
        }

        .phase-header h4 {
          margin: 0;
          font-size: 24px;
        }

        .horoscope-stats {
          display: flex;
          justify-content: space-around;
          padding: 16px;
          background: #f8f9fa;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #666;
        }

        .prediction {
          padding: 20px;
          font-size: 16px;
          line-height: 1.6;
          color: #333;
          background: #fff5f5;
        }

        .superpower {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: linear-gradient(135deg, #fff5f5, #ffe0e0);
          border-left: 4px solid #ff6b6b;
        }

        .superpower p {
          margin: 0;
          color: #333;
        }

        .tips-section {
          padding: 20px;
        }

        .tips-section h5 {
          margin: 0 0 12px 0;
          color: #333;
        }

        .tips-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .tips-section li {
          padding: 8px 0;
          padding-left: 24px;
          position: relative;
        }

        .tips-section li:before {
          content: "→";
          position: absolute;
          left: 0;
          color: #ff6b6b;
        }

        .activities-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          padding: 20px;
        }

        .activity-box {
          padding: 16px;
          border-radius: 8px;
        }

        .activity-box.do {
          background: #e8f5e9;
          border: 2px solid #4caf50;
        }

        .activity-box.avoid {
          background: #ffebee;
          border: 2px solid #f44336;
        }

        .activity-box h5 {
          margin: 0 0 12px 0;
        }

        .activity-box ul {
          list-style: none;
          padding: 0;
          margin: 0;
          font-size: 14px;
        }

        .activity-box li {
          padding: 4px 0;
        }

        @media (max-width: 768px) {
          .activities-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default HormoneHoroscope;
