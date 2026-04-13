import React, { useState, useEffect } from 'react';
import { Heart, AlertCircle, Info } from 'lucide-react';

function FertilityCalculator({ cycles }) {
  const [fertilityData, setFertilityData] = useState(null);
  const [avgCycleLength, setAvgCycleLength] = useState(28);

  useEffect(() => {
    if (cycles && cycles.length > 0) {
      calculateFertility();
    }
  }, [cycles]);

  const calculateFertility = () => {
    // Calculate average cycle length
    const completedCycles = cycles.filter(c => c.end_date);
    if (completedCycles.length > 0) {
      const lengths = completedCycles.map(c => {
        const start = new Date(c.start_date);
        const end = new Date(c.end_date);
        return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      });
      const avg = Math.round(lengths.reduce((a, b) => a + b, 0) / lengths.length);
      setAvgCycleLength(avg);
    }

    // Get last period start date
    const sortedCycles = [...cycles].sort((a, b) => 
      new Date(b.start_date) - new Date(a.start_date)
    );
    const lastPeriod = sortedCycles[0];
    
    if (lastPeriod) {
      const lastPeriodDate = new Date(lastPeriod.start_date);
      const today = new Date();
      
      // Calculate ovulation (typically day 14 before next period)
      const ovulationDay = avgCycleLength - 14;
      const ovulationDate = new Date(lastPeriodDate);
      ovulationDate.setDate(ovulationDate.getDate() + ovulationDay);
      
      // Fertile window (5 days before ovulation + ovulation day + 1 day after)
      const fertileStart = new Date(ovulationDate);
      fertileStart.setDate(fertileStart.getDate() - 5);
      const fertileEnd = new Date(ovulationDate);
      fertileEnd.setDate(fertileEnd.getDate() + 1);
      
      // Next period prediction
      const nextPeriod = new Date(lastPeriodDate);
      nextPeriod.setDate(nextPeriod.getDate() + avgCycleLength);
      
      // Check if currently in fertile window
      const isInFertileWindow = today >= fertileStart && today <= fertileEnd;
      
      // Days until ovulation
      const daysUntilOvulation = Math.ceil((ovulationDate - today) / (1000 * 60 * 60 * 24));
      
      setFertilityData({
        ovulationDate,
        fertileStart,
        fertileEnd,
        nextPeriod,
        isInFertileWindow,
        daysUntilOvulation,
        avgCycleLength
      });
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getConceptionProbability = () => {
    if (!fertilityData) return 0;
    
    const { daysUntilOvulation } = fertilityData;
    
    if (daysUntilOvulation === 0) return 30; // Ovulation day
    if (daysUntilOvulation === -1) return 25; // Day after ovulation
    if (daysUntilOvulation === 1) return 27; // Day before ovulation
    if (daysUntilOvulation === 2) return 23; // 2 days before
    if (daysUntilOvulation >= -5 && daysUntilOvulation <= -2) return 15; // 2-5 days before
    
    return 5; // Outside fertile window
  };

  if (!cycles || cycles.length === 0) {
    return (
      <div className="fertility-calculator-card">
        <h3>
          <Heart size={24} />
          Fertility Window Calculator
        </h3>
        <div className="empty-state">
          <Heart size={48} color="#ccc" />
          <p>Track at least one cycle to see fertility predictions</p>
        </div>
      </div>
    );
  }

  if (!fertilityData) {
    return (
      <div className="fertility-calculator-card">
        <h3>
          <Heart size={24} />
          Fertility Window Calculator
        </h3>
        <p className="loading">Calculating...</p>
      </div>
    );
  }

  const probability = getConceptionProbability();

  return (
    <div className="fertility-calculator-card">
      <h3>
        <Heart size={24} />
        Fertility Window Calculator
      </h3>

      {fertilityData.isInFertileWindow && (
        <div className="fertile-alert">
          <Heart size={20} />
          <span>You are currently in your fertile window!</span>
        </div>
      )}

      <div className="fertility-grid">
        <div className="fertility-card ovulation">
          <div className="fertility-icon">🥚</div>
          <h4>Predicted Ovulation</h4>
          <p className="fertility-date">{formatDate(fertilityData.ovulationDate)}</p>
          {fertilityData.daysUntilOvulation > 0 && (
            <p className="fertility-countdown">In {fertilityData.daysUntilOvulation} days</p>
          )}
          {fertilityData.daysUntilOvulation === 0 && (
            <p className="fertility-countdown">Today!</p>
          )}
          {fertilityData.daysUntilOvulation < 0 && (
            <p className="fertility-countdown">{Math.abs(fertilityData.daysUntilOvulation)} days ago</p>
          )}
        </div>

        <div className="fertility-card fertile-window">
          <div className="fertility-icon">🌱</div>
          <h4>Fertile Window</h4>
          <p className="fertility-date">
            {formatDate(fertilityData.fertileStart)}
          </p>
          <p className="fertility-to">to</p>
          <p className="fertility-date">
            {formatDate(fertilityData.fertileEnd)}
          </p>
        </div>

        <div className="fertility-card next-period">
          <div className="fertility-icon">📅</div>
          <h4>Next Period</h4>
          <p className="fertility-date">{formatDate(fertilityData.nextPeriod)}</p>
          <p className="fertility-countdown">
            {Math.ceil((fertilityData.nextPeriod - new Date()) / (1000 * 60 * 60 * 24))} days
          </p>
        </div>
      </div>

      <div className="conception-probability">
        <h4>
          <Info size={18} />
          Conception Probability Today
        </h4>
        <div className="probability-bar-bg">
          <div 
            className="probability-bar-fill"
            style={{width: `${probability}%`}}
          >
            <span className="probability-text">{probability}%</span>
          </div>
        </div>
        <p className="probability-note">
          {probability > 20 ? 'High fertility period' : 
           probability > 10 ? 'Moderate fertility' : 
           'Low fertility period'}
        </p>
      </div>

      <div className="fertility-info">
        <AlertCircle size={16} />
        <p>
          <strong>Note:</strong> This calculator provides estimates based on your cycle data. 
          Actual ovulation can vary. For family planning, consult a healthcare provider.
        </p>
      </div>

      <div className="fertility-tips">
        <h4>Tips for Conception</h4>
        <ul>
          <li>Have intercourse every 1-2 days during fertile window</li>
          <li>Track basal body temperature for more accuracy</li>
          <li>Consider ovulation predictor kits</li>
          <li>Maintain a healthy lifestyle and reduce stress</li>
          <li>Take prenatal vitamins with folic acid</li>
        </ul>
      </div>
    </div>
  );
}

export default FertilityCalculator;
