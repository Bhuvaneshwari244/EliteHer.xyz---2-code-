import React, { useState } from 'react';
import { Dumbbell, Heart, Zap, Clock } from 'lucide-react';

function PCODExercisePlanner() {
  const [selectedType, setSelectedType] = useState('cardio');

  const exerciseTypes = {
    cardio: {
      icon: Heart,
      title: 'Cardio Exercises',
      color: '#f44336',
      description: 'Improves insulin sensitivity and burns calories',
      exercises: [
        { name: 'Brisk Walking', duration: '30-45 min', calories: '150-200', benefit: 'Low impact, easy to start' },
        { name: 'Jogging/Running', duration: '20-30 min', calories: '250-350', benefit: 'High calorie burn' },
        { name: 'Cycling', duration: '30-45 min', calories: '200-300', benefit: 'Joint-friendly' },
        { name: 'Swimming', duration: '30-45 min', calories: '250-350', benefit: 'Full body workout' },
        { name: 'Dancing', duration: '30-45 min', calories: '200-300', benefit: 'Fun and engaging' },
        { name: 'Jump Rope', duration: '15-20 min', calories: '200-300', benefit: 'High intensity' }
      ],
      frequency: '5 days/week',
      tips: [
        'Start slow and gradually increase intensity',
        'Aim for 150 minutes per week',
        'Monitor heart rate - stay in fat-burning zone',
        'Stay hydrated before, during, and after'
      ]
    },
    strength: {
      icon: Dumbbell,
      title: 'Strength Training',
      color: '#ff9800',
      description: 'Builds muscle, boosts metabolism, improves insulin sensitivity',
      exercises: [
        { name: 'Squats', sets: '3x12-15', benefit: 'Leg strength, hormone balance' },
        { name: 'Lunges', sets: '3x10 each leg', benefit: 'Lower body strength' },
        { name: 'Push-ups', sets: '3x8-12', benefit: 'Upper body strength' },
        { name: 'Planks', sets: '3x30-60 sec', benefit: 'Core stability' },
        { name: 'Deadlifts', sets: '3x10-12', benefit: 'Full body strength' },
        { name: 'Dumbbell Rows', sets: '3x12 each arm', benefit: 'Back strength' }
      ],
      frequency: '3 days/week',
      tips: [
        'Rest 48 hours between sessions',
        'Focus on compound movements',
        'Progressive overload - gradually increase weight',
        'Proper form is more important than heavy weight'
      ]
    },
    hiit: {
      icon: Zap,
      title: 'HIIT Workouts',
      color: '#9c27b0',
      description: 'High-intensity intervals for maximum fat burn',
      exercises: [
        { name: 'Burpees', duration: '30 sec on, 30 sec rest', benefit: 'Full body cardio' },
        { name: 'Mountain Climbers', duration: '30 sec on, 30 sec rest', benefit: 'Core and cardio' },
        { name: 'High Knees', duration: '30 sec on, 30 sec rest', benefit: 'Cardio boost' },
        { name: 'Jump Squats', duration: '30 sec on, 30 sec rest', benefit: 'Leg power' },
        { name: 'Plank Jacks', duration: '30 sec on, 30 sec rest', benefit: 'Core and cardio' },
        { name: 'Sprint Intervals', duration: '30 sec sprint, 90 sec walk', benefit: 'Max calorie burn' }
      ],
      frequency: '2-3 days/week',
      tips: [
        'Warm up for 5-10 minutes first',
        'Start with 15-20 minute sessions',
        'Not recommended for beginners',
        'Allow recovery days between sessions'
      ]
    },
    yoga: {
      icon: Heart,
      title: 'Yoga & Flexibility',
      color: '#4caf50',
      description: 'Reduces stress, improves flexibility, balances hormones',
      exercises: [
        { name: 'Sun Salutations', duration: '10-15 min', benefit: 'Full body warm-up' },
        { name: 'Butterfly Pose', duration: '2-3 min', benefit: 'Hip flexibility, reproductive health' },
        { name: 'Cobra Pose', duration: '1-2 min', benefit: 'Stimulates ovaries' },
        { name: 'Bridge Pose', duration: '1-2 min', benefit: 'Pelvic floor strength' },
        { name: 'Child\'s Pose', duration: '2-3 min', benefit: 'Stress relief' },
        { name: 'Legs Up Wall', duration: '5-10 min', benefit: 'Relaxation, circulation' }
      ],
      frequency: 'Daily or 5 days/week',
      tips: [
        'Practice on empty stomach or 2 hours after eating',
        'Focus on breathing',
        'Hold poses for 30-60 seconds',
        'Great for stress management'
      ]
    }
  };

  const currentType = exerciseTypes[selectedType];
  const TypeIcon = currentType.icon;

  return (
    <div className="pcod-exercise-planner">
      <div className="exercise-header">
        <Dumbbell size={24} />
        <h3>PCOD Exercise Planner</h3>
      </div>

      <div className="exercise-info">
        <p>🏃‍♀️ Regular exercise is one of the most effective ways to manage PCOD</p>
        <p><strong>Benefits:</strong> Weight loss, insulin sensitivity, hormone balance, stress reduction</p>
      </div>

      <div className="type-selector">
        {Object.entries(exerciseTypes).map(([key, type]) => {
          const Icon = type.icon;
          return (
            <button
              key={key}
              className={`type-btn ${selectedType === key ? 'active' : ''}`}
              onClick={() => setSelectedType(key)}
              style={{ 
                borderColor: selectedType === key ? type.color : '#ddd',
                background: selectedType === key ? type.color + '15' : 'white'
              }}
            >
              <Icon size={24} style={{ color: type.color }} />
              <span>{type.title}</span>
            </button>
          );
        })}
      </div>

      <div className="exercise-content">
        <div className="content-header" style={{ borderLeftColor: currentType.color }}>
          <TypeIcon size={28} style={{ color: currentType.color }} />
          <div>
            <h4>{currentType.title}</h4>
            <p>{currentType.description}</p>
          </div>
        </div>

        <div className="frequency-badge" style={{ background: currentType.color }}>
          <Clock size={16} />
          Recommended: {currentType.frequency}
        </div>

        <div className="exercises-list">
          {currentType.exercises.map((exercise, index) => (
            <div key={index} className="exercise-card">
              <div className="exercise-name">{exercise.name}</div>
              <div className="exercise-details">
                {exercise.duration && <span className="detail-badge">{exercise.duration}</span>}
                {exercise.sets && <span className="detail-badge">{exercise.sets}</span>}
                {exercise.calories && <span className="detail-badge calories">{exercise.calories} cal</span>}
              </div>
              <div className="exercise-benefit">{exercise.benefit}</div>
            </div>
          ))}
        </div>

        <div className="tips-section">
          <h5>💡 Tips for {currentType.title}:</h5>
          <ul>
            {currentType.tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="weekly-plan">
        <h4>📅 Sample Weekly Plan:</h4>
        <div className="plan-grid">
          <div className="plan-day">
            <strong>Monday</strong>
            <span>Cardio (30 min)</span>
          </div>
          <div className="plan-day">
            <strong>Tuesday</strong>
            <span>Strength Training</span>
          </div>
          <div className="plan-day">
            <strong>Wednesday</strong>
            <span>Yoga (45 min)</span>
          </div>
          <div className="plan-day">
            <strong>Thursday</strong>
            <span>HIIT (20 min)</span>
          </div>
          <div className="plan-day">
            <strong>Friday</strong>
            <span>Cardio (30 min)</span>
          </div>
          <div className="plan-day">
            <strong>Saturday</strong>
            <span>Strength Training</span>
          </div>
          <div className="plan-day rest">
            <strong>Sunday</strong>
            <span>Rest or Light Yoga</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pcod-exercise-planner {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin: 20px 0;
        }

        .exercise-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          color: #ff9800;
        }

        .exercise-info {
          background: #fff3e0;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          border-left: 4px solid #ff9800;
        }

        .exercise-info p {
          margin: 4px 0;
          color: #333;
        }

        .type-selector {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 12px;
          margin-bottom: 24px;
        }

        .type-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px;
          border: 2px solid;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .type-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .exercise-content {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .content-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: white;
          border-radius: 8px;
          border-left: 4px solid;
          margin-bottom: 16px;
        }

        .content-header h4 {
          margin: 0 0 4px 0;
        }

        .content-header p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }

        .frequency-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          color: white;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .exercises-list {
          display: grid;
          gap: 12px;
          margin-bottom: 20px;
        }

        .exercise-card {
          padding: 16px;
          background: white;
          border-radius: 8px;
          border-left: 4px solid #ff9800;
        }

        .exercise-name {
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .exercise-details {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 8px;
        }

        .detail-badge {
          padding: 4px 12px;
          background: #f0f0f0;
          border-radius: 12px;
          font-size: 12px;
          color: #666;
        }

        .detail-badge.calories {
          background: #e8f5e9;
          color: #2e7d32;
        }

        .exercise-benefit {
          color: #666;
          font-size: 13px;
        }

        .tips-section {
          background: white;
          padding: 16px;
          border-radius: 8px;
        }

        .tips-section h5 {
          margin: 0 0 12px 0;
        }

        .tips-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .tips-section li {
          padding: 6px 0;
          padding-left: 20px;
          position: relative;
          color: #666;
          font-size: 14px;
        }

        .tips-section li:before {
          content: "→";
          position: absolute;
          left: 0;
          color: #ff9800;
        }

        .weekly-plan {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
        }

        .weekly-plan h4 {
          margin: 0 0 16px 0;
        }

        .plan-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
        }

        .plan-day {
          padding: 16px;
          background: white;
          border-radius: 8px;
          text-align: center;
          border: 2px solid #4caf50;
        }

        .plan-day.rest {
          border-color: #9e9e9e;
          opacity: 0.7;
        }

        .plan-day strong {
          display: block;
          margin-bottom: 8px;
          color: #333;
        }

        .plan-day span {
          font-size: 13px;
          color: #666;
        }

        @media (max-width: 768px) {
          .type-selector {
            grid-template-columns: repeat(2, 1fr);
          }

          .plan-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default PCODExercisePlanner;
