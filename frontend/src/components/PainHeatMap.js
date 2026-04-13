import React, { useState } from 'react';
import { Activity } from 'lucide-react';

function PainHeatMap({ onPainLogged }) {
  const [painPoints, setPainPoints] = useState([]);
  const [intensity, setIntensity] = useState(5);

  const bodyParts = [
    { id: 'head', label: 'Head', x: 50, y: 10 },
    { id: 'chest', label: 'Chest', x: 50, y: 30 },
    { id: 'abdomen', label: 'Abdomen', x: 50, y: 45 },
    { id: 'lower-abdomen', label: 'Lower Abdomen', x: 50, y: 55 },
    { id: 'back-upper', label: 'Upper Back', x: 50, y: 30 },
    { id: 'back-lower', label: 'Lower Back', x: 50, y: 50 },
    { id: 'left-breast', label: 'Left Breast', x: 40, y: 30 },
    { id: 'right-breast', label: 'Right Breast', x: 60, y: 30 },
    { id: 'legs', label: 'Legs', x: 50, y: 75 },
  ];

  const handleBodyPartClick = (part) => {
    const existingIndex = painPoints.findIndex(p => p.id === part.id);
    
    if (existingIndex >= 0) {
      // Remove if already selected
      setPainPoints(painPoints.filter(p => p.id !== part.id));
    } else {
      // Add new pain point
      setPainPoints([...painPoints, { ...part, intensity }]);
    }
  };

  const savePainMap = () => {
    if (painPoints.length === 0) {
      alert('Please select at least one pain location');
      return;
    }

    const painData = {
      date: new Date().toISOString().split('T')[0],
      painPoints: painPoints.map(p => ({
        location: p.label,
        intensity: p.intensity
      }))
    };

    if (onPainLogged) {
      onPainLogged(painData);
    }

    alert('Pain map saved successfully!');
    setPainPoints([]);
  };

  const getIntensityColor = (level) => {
    if (level <= 3) return '#ffc6c7';
    if (level <= 6) return '#ff9999';
    return '#ff6b6b';
  };

  return (
    <div className="pain-heatmap">
      <div className="pain-header">
        <Activity size={24} />
        <h3>Pain Heat Map</h3>
      </div>

      <p className="pain-instruction">
        Tap on the body diagram where you feel pain
      </p>

      <div className="intensity-slider">
        <label>Pain Intensity: {intensity}/10</label>
        <input 
          type="range" 
          min="1" 
          max="10" 
          value={intensity}
          onChange={(e) => setIntensity(parseInt(e.target.value))}
        />
        <div className="intensity-labels">
          <span>Mild</span>
          <span>Moderate</span>
          <span>Severe</span>
        </div>
      </div>

      <div className="body-diagram">
        <svg viewBox="0 0 100 100" className="body-svg">
          {/* Simple body outline */}
          <ellipse cx="50" cy="10" rx="8" ry="10" fill="#f0f0f0" stroke="#ccc" strokeWidth="0.5" />
          <rect x="42" y="20" width="16" height="25" rx="3" fill="#f0f0f0" stroke="#ccc" strokeWidth="0.5" />
          <rect x="42" y="45" width="16" height="20" rx="2" fill="#f0f0f0" stroke="#ccc" strokeWidth="0.5" />
          <rect x="44" y="65" width="5" height="30" rx="2" fill="#f0f0f0" stroke="#ccc" strokeWidth="0.5" />
          <rect x="51" y="65" width="5" height="30" rx="2" fill="#f0f0f0" stroke="#ccc" strokeWidth="0.5" />

          {/* Pain points */}
          {bodyParts.map(part => {
            const painPoint = painPoints.find(p => p.id === part.id);
            return (
              <g key={part.id}>
                <circle
                  cx={part.x}
                  cy={part.y}
                  r="6"
                  fill={painPoint ? getIntensityColor(painPoint.intensity) : 'transparent'}
                  stroke={painPoint ? '#ff6b6b' : '#ddd'}
                  strokeWidth="1"
                  opacity={painPoint ? 0.8 : 0.3}
                  onClick={() => handleBodyPartClick(part)}
                  style={{ cursor: 'pointer' }}
                />
                {painPoint && (
                  <text
                    x={part.x}
                    y={part.y + 1}
                    textAnchor="middle"
                    fontSize="6"
                    fill="white"
                    fontWeight="bold"
                  >
                    {painPoint.intensity}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {painPoints.length > 0 && (
        <div className="pain-summary">
          <h4>Selected Pain Points:</h4>
          <ul>
            {painPoints.map(point => (
              <li key={point.id}>
                <span className="pain-location">{point.label}</span>
                <span className="pain-level" style={{ color: getIntensityColor(point.intensity) }}>
                  Level {point.intensity}/10
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="save-pain-btn" onClick={savePainMap}>
        Save Pain Map
      </button>

      <style jsx>{`
        .pain-heatmap {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin: 20px 0;
        }

        .pain-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          color: #ff6b6b;
        }

        .pain-instruction {
          color: #666;
          margin-bottom: 20px;
          text-align: center;
        }

        .intensity-slider {
          margin-bottom: 24px;
        }

        .intensity-slider label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
        }

        .intensity-slider input[type="range"] {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(to right, #ffc6c7, #ff9999, #ff6b6b);
          outline: none;
        }

        .intensity-labels {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #999;
          margin-top: 4px;
        }

        .body-diagram {
          max-width: 300px;
          margin: 0 auto 24px;
          background: #fafafa;
          border-radius: 12px;
          padding: 20px;
        }

        .body-svg {
          width: 100%;
          height: auto;
        }

        .pain-summary {
          background: #fff5f5;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 16px;
        }

        .pain-summary h4 {
          margin: 0 0 12px 0;
          color: #333;
        }

        .pain-summary ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .pain-summary li {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #ffe0e0;
        }

        .pain-summary li:last-child {
          border-bottom: none;
        }

        .pain-location {
          font-weight: 500;
        }

        .pain-level {
          font-weight: 600;
        }

        .save-pain-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .save-pain-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
        }
      `}</style>
    </div>
  );
}

export default PainHeatMap;
