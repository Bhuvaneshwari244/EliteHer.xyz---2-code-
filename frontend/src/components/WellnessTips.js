import React, { useState, useEffect } from 'react';
import { Lightbulb, ChevronRight } from 'lucide-react';

const WELLNESS_TIPS = [
  {
    category: 'Nutrition',
    tip: 'Eat iron-rich foods like spinach and lentils during your period to replenish lost nutrients.',
    icon: '🥗'
  },
  {
    category: 'Exercise',
    tip: 'Light yoga or walking can help reduce menstrual cramps and improve mood.',
    icon: '🧘'
  },
  {
    category: 'Sleep',
    tip: 'Aim for 7-9 hours of sleep. Your body needs extra rest during menstruation.',
    icon: '😴'
  },
  {
    category: 'Hydration',
    tip: 'Drink plenty of water to reduce bloating and help your body function optimally.',
    icon: '💧'
  },
  {
    category: 'Self-Care',
    tip: 'Use a heating pad on your lower abdomen to ease cramps naturally.',
    icon: '🌸'
  },
  {
    category: 'Stress',
    tip: 'Practice deep breathing or meditation to manage stress and hormonal balance.',
    icon: '🧠'
  }
];

export function WellnessTips() {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % WELLNESS_TIPS.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const tip = WELLNESS_TIPS[currentTip];

  return (
    <div className="wellness-tips-card">
      <div className="wellness-header">
        <div className="wellness-icon">
          <Lightbulb size={20} />
        </div>
        <div>
          <h3 className="wellness-title">Daily Wellness Tip</h3>
          <p className="wellness-category">{tip.category}</p>
        </div>
        <button
          onClick={() => setCurrentTip((prev) => (prev + 1) % WELLNESS_TIPS.length)}
          className="wellness-next-btn"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="wellness-content">
        <span className="wellness-emoji">{tip.icon}</span>
        <p className="wellness-tip">{tip.tip}</p>
      </div>

      {/* Dot indicators */}
      <div className="wellness-dots">
        {WELLNESS_TIPS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentTip(i)}
            className={`wellness-dot ${i === currentTip ? 'active' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
