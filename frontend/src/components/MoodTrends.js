import React from 'react';
import { Smile } from 'lucide-react';

const moodEmojis = {
  'happy': '😊',
  'neutral': '😐',
  'sad': '😢',
  'irritable': '😤',
  'anxious': '😰'
};

export function MoodTrends({ symptoms }) {
  const symptomsWithMood = symptoms ? symptoms.filter((s) => s.mood) : [];

  if (symptomsWithMood.length < 2) {
    return (
      <div className="insight-card">
        <div className="insight-header">
          <Smile size={20} />
          <h3>Mood Trends</h3>
        </div>
        <p className="insight-empty">Log moods with at least 2 entries to see trends.</p>
      </div>
    );
  }

  // Count moods
  const moodCounts = {};
  symptomsWithMood.forEach((s) => {
    moodCounts[s.mood] = (moodCounts[s.mood] || 0) + 1;
  });

  const sorted = Object.entries(moodCounts).sort(([, a], [, b]) => b - a);
  const topMood = sorted[0];

  // Timeline of last 6 entries with moods
  const recentMoods = [...symptomsWithMood]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6)
    .reverse();

  return (
    <div className="insight-card">
      <div className="insight-header">
        <Smile size={20} />
        <div>
          <h3>Mood Trends</h3>
          <p className="insight-subtitle">Most common: {moodEmojis[topMood[0]]} {topMood[0]}</p>
        </div>
      </div>

      {/* Mood distribution */}
      <div className="mood-distribution">
        {sorted.map(([mood, count], i) => (
          <div key={i} className="mood-item">
            <span className="mood-emoji">{moodEmojis[mood] || '🔵'}</span>
            <span className="mood-count">{count}</span>
          </div>
        ))}
      </div>

      {/* Recent mood timeline */}
      <div className="mood-timeline-label">Recent moods</div>
      <div className="mood-timeline">
        {recentMoods.map((entry, i) => (
          <div key={i} className="mood-timeline-item">
            <div className="mood-timeline-emoji">{moodEmojis[entry.mood] || '🔵'}</div>
            <div className="mood-timeline-date">
              {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
