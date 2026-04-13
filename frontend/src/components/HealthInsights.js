import React from 'react';
import { TrendingUp, TrendingDown, Minus, Lightbulb } from 'lucide-react';

export function HealthInsights({ cycles, symptoms, stats }) {
  const generateInsights = () => {
    const insights = [];

    // Cycle regularity insight
    if (stats && stats.total_cycles >= 3) {
      if (stats.is_irregular) {
        insights.push({
          type: 'warning',
          icon: TrendingDown,
          title: 'Irregular Cycle Pattern',
          description: `Your cycles vary by ${stats.irregularity_score} days on average. Consider tracking lifestyle factors that might affect regularity.`,
          tip: 'Stress, diet changes, and sleep patterns can impact cycle regularity.'
        });
      } else {
        insights.push({
          type: 'positive',
          icon: TrendingUp,
          title: 'Regular Cycle Pattern',
          description: `Your cycles are consistent with an average length of ${stats.average_cycle_length} days.`,
          tip: 'Maintaining your current lifestyle habits is working well!'
        });
      }
    }

    // Symptom patterns
    if (symptoms && symptoms.length >= 5) {
      const recentSymptoms = symptoms.slice(-5);
      const avgPain = recentSymptoms.reduce((sum, s) => sum + (s.pain_level || 0), 0) / recentSymptoms.length;
      
      if (avgPain > 6) {
        insights.push({
          type: 'warning',
          icon: TrendingDown,
          title: 'High Pain Levels',
          description: `Your average pain level is ${avgPain.toFixed(1)}/10 over the last 5 entries.`,
          tip: 'Consider heat therapy, gentle exercise, or consult a doctor if pain persists.'
        });
      } else if (avgPain < 3) {
        insights.push({
          type: 'positive',
          icon: TrendingUp,
          title: 'Low Pain Levels',
          description: `Your pain levels are well-managed at ${avgPain.toFixed(1)}/10 average.`,
          tip: 'Keep up your current pain management strategies!'
        });
      }

      // Mood patterns
      const moodCounts = {};
      recentSymptoms.forEach(s => {
        if (s.mood) {
          moodCounts[s.mood] = (moodCounts[s.mood] || 0) + 1;
        }
      });

      const dominantMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
      if (dominantMood && (dominantMood[0] === 'anxious' || dominantMood[0] === 'sad')) {
        insights.push({
          type: 'info',
          icon: Minus,
          title: 'Mood Pattern Detected',
          description: `You've been feeling ${dominantMood[0]} frequently in recent cycles.`,
          tip: 'Consider stress management techniques, adequate sleep, and speaking with a healthcare provider if needed.'
        });
      }
    }

    // Data quality insight
    if (cycles && cycles.length < 3) {
      insights.push({
        type: 'info',
        icon: Lightbulb,
        title: 'Build Your Health Profile',
        description: `You have ${cycles.length} cycle${cycles.length !== 1 ? 's' : ''} logged. Track at least 3 cycles for better predictions.`,
        tip: 'More data helps us provide more accurate insights and predictions.'
      });
    }

    // Tracking consistency
    if (cycles && cycles.length >= 3) {
      const dates = cycles.map(c => new Date(c.start_date).getTime()).sort((a, b) => b - a);
      const gaps = [];
      for (let i = 0; i < dates.length - 1; i++) {
        gaps.push((dates[i] - dates[i + 1]) / (1000 * 60 * 60 * 24));
      }
      const avgGap = gaps.reduce((a, b) => a + b, 0) / gaps.length;
      
      if (avgGap < 40) {
        insights.push({
          type: 'positive',
          icon: TrendingUp,
          title: 'Consistent Tracking',
          description: 'You\'re doing great at logging your cycles regularly!',
          tip: 'Consistent tracking leads to more accurate predictions and insights.'
        });
      }
    }

    return insights;
  };

  const insights = generateInsights();

  if (insights.length === 0) {
    return null;
  }

  const getInsightClass = (type) => {
    switch (type) {
      case 'positive': return 'insight-positive';
      case 'warning': return 'insight-warning';
      case 'info': return 'insight-info';
      default: return '';
    }
  };

  return (
    <div className="health-insights-card">
      <div className="insights-header">
        <Lightbulb size={20} />
        <h3>Health Insights</h3>
      </div>

      <div className="insights-list">
        {insights.map((insight, i) => {
          const Icon = insight.icon;
          return (
            <div key={i} className={`insight-item ${getInsightClass(insight.type)}`}>
              <div className="insight-icon">
                <Icon size={20} />
              </div>
              <div className="insight-content">
                <h4>{insight.title}</h4>
                <p className="insight-description">{insight.description}</p>
                <p className="insight-tip">💡 {insight.tip}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
