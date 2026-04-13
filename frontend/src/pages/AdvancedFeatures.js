import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useLanguage } from '../context/LanguageContext';
import VoiceSymptomLogger from '../components/VoiceSymptomLogger';
import PainHeatMap from '../components/PainHeatMap';
import HormoneHoroscope from '../components/HormoneHoroscope';
import EmergencyLocator from '../components/EmergencyLocator';
import FertilityWindowCalculator from '../components/FertilityWindowCalculator';
import SupplementTracker from '../components/SupplementTracker';
import BreastSelfExamReminder from '../components/BreastSelfExamReminder';
import PCODDietPlanner from '../components/PCODDietPlanner';
import PCODSymptomTracker from '../components/PCODSymptomTracker';
import PCODExercisePlanner from '../components/PCODExercisePlanner';
import PCODWeightTracker from '../components/PCODWeightTracker';

function AdvancedFeatures() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSymptomLogged = (symptomData) => {
    console.log('Voice symptom logged:', symptomData);
    // You can save to backend here
    alert('Symptoms logged successfully!');
  };

  const handlePainLogged = (painData) => {
    console.log('Pain map logged:', painData);
    // You can save to backend here
  };

  return (
    <div className="advanced-features-page">
      <Navigation />
      
      <div className="page-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={20} />
          {t('common.back')}
        </button>
        <div className="header-content">
          <Sparkles size={32} className="header-icon" />
          <div>
            <h1>{t('advanced.title')}</h1>
            <p>{t('advanced.subtitle')}</p>
          </div>
        </div>
      </div>

      <div className="features-container">
        {/* Voice Symptom Logger */}
        <section className="feature-section">
          <VoiceSymptomLogger onSymptomLogged={handleSymptomLogged} />
        </section>

        {/* Pain Heat Map */}
        <section className="feature-section">
          <PainHeatMap onPainLogged={handlePainLogged} />
        </section>

        {/* Hormone Horoscope */}
        <section className="feature-section">
          <HormoneHoroscope />
        </section>

        {/* Fertility Window Calculator */}
        <section className="feature-section">
          <FertilityWindowCalculator />
        </section>

        {/* Emergency Locator */}
        <section className="feature-section">
          <EmergencyLocator />
        </section>

        {/* Supplement Tracker */}
        <section className="feature-section">
          <SupplementTracker />
        </section>

        {/* Breast Self-Exam Reminder */}
        <section className="feature-section">
          <BreastSelfExamReminder />
        </section>

        {/* PCOD Diet Planner */}
        <section className="feature-section">
          <PCODDietPlanner />
        </section>

        {/* PCOD Symptom Tracker */}
        <section className="feature-section">
          <PCODSymptomTracker />
        </section>

        {/* PCOD Exercise Planner */}
        <section className="feature-section">
          <PCODExercisePlanner />
        </section>

        {/* PCOD Weight Tracker */}
        <section className="feature-section">
          <PCODWeightTracker />
        </section>
      </div>

      <footer className="page-footer">
        <div className="footer-content">
          <span className="footer-logo">🌸</span>
          <p>{t('advanced.poweredBy')}</p>
        </div>
      </footer>

      <style jsx>{`
        .advanced-features-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #fff5f5 0%, #ffe0e0 100%);
          padding-bottom: 40px;
        }

        .page-header {
          background: white;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin-bottom: 32px;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: transparent;
          border: 2px solid #ff6b6b;
          border-radius: 8px;
          color: #ff6b6b;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 16px;
        }

        .back-button:hover {
          background: #ff6b6b;
          color: white;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-icon {
          color: #ff6b6b;
        }

        .header-content h1 {
          margin: 0;
          color: #333;
          font-size: 32px;
        }

        .header-content p {
          margin: 4px 0 0 0;
          color: #666;
          font-size: 16px;
        }

        .features-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .feature-section {
          margin-bottom: 32px;
        }

        .page-footer {
          text-align: center;
          padding: 32px 24px;
          margin-top: 40px;
        }

        .footer-content {
          max-width: 600px;
          margin: 0 auto;
        }

        .footer-logo {
          font-size: 48px;
          display: block;
          margin-bottom: 12px;
        }

        .footer-content p {
          color: #666;
          margin: 0;
        }

        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .header-content h1 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}

export default AdvancedFeatures;
