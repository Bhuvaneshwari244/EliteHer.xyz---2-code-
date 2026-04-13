import React from 'react';
import { Activity } from 'lucide-react';

export function SymptomInsights({ symptoms }) {
  if (!symptoms || symptoms.length < 2) {
    return (
      <div className="insight-card">
        <div className="insight-header">
          <Activity size={20} />
          <h3>Symptom Insights</h3>
        </div>
        <p className="insight-empty">Log at least 2 periods with symptoms to see patterns.</p>
      </div>
    );
  }

  // Count symptom frequency
  const symptomCounts = {};
  symptoms.forEach((s) => {
    if (s.cramps) symptomCounts['Cramps'] = (symptomCounts['Cramps'] || 0) + 1;
    if (s.headache) symptomCounts['Headache'] = (symptomCounts['Headache'] || 0) + 1;
    if (s.acne) symptomCounts['Acne'] = (symptomCounts['Acne'] || 0) + 1;
    if (s.bloating) symptomCounts['Bloating'] = (symptomCounts['Bloating'] || 0) + 1;
  });

  const sorted = Object.entries(symptomCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  const maxCount = sorted.length > 0 ? sorted[0][1] : 1;

  return (
    <div className="insight-card">
      <div className="insight-header">
        <Activity size={20} />
        <div>
          <h3>Symptom Insights</h3>
          <p className="insight-subtitle">Your most common symptoms</p>
        </div>
      </div>

      <div className="symptom-bars">
        {sorted.map(([symptom, count], i) => {
          const pct = (count / maxCount) * 100;
          return (
            <div key={i} className="symptom-bar-item">
              <div className="symptom-bar-label">
                <span>{symptom}</span>
                <span className="symptom-count">{count}/{symptoms.length} cycles</span>
              </div>
              <div className="symptom-bar-track">
                <div className="symptom-bar-fill" style={{ width: `${pct}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>

      {sorted.length === 0 && (
        <p className="insight-empty">No symptoms logged yet. Track symptoms when logging periods.</p>
      )}
    </div>
  );
}
