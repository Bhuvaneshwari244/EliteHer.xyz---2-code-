import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { symptomsAPI } from '../services/api';
import { Plus, Shield, ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import { AnimatedBackground } from '../components/AnimatedBackground';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSelector from '../components/LanguageSelector';

function SymptomLogger() {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: 'neutral',
    pain_level: 0,
    cramps: false,
    headache: false,
    fatigue: 0,
    acne: false,
    bloating: false,
    notes: ''
  });

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    try {
      const response = await symptomsAPI.getSymptoms();
      setSymptoms(response.data.symptoms);
    } catch (error) {
      console.error('Error fetching symptoms:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await symptomsAPI.logSymptom(formData);
      setShowForm(false);
      setFormData({
        date: new Date().toISOString().split('T')[0],
        mood: 'neutral',
        pain_level: 0,
        cramps: false,
        headache: false,
        fatigue: 0,
        acne: false,
        bloating: false,
        notes: ''
      });
      fetchSymptoms();
    } catch (error) {
      console.error('Error logging symptom:', error);
    }
  };

  const moodEmojis = {
    happy: '😊',
    neutral: '😐',
    sad: '😢',
    anxious: '😰',
    irritable: '😠'
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <Navigation />
      <AnimatedBackground />
      
      <button onClick={() => navigate(-1)} className="back-button" title="Go back">
        <ArrowLeft size={20} />
      </button>
      
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-logo">
            <span className="logo-icon">📝</span>
            <div>
              <h1 className="logo-title">Symptom Logger</h1>
              <p className="logo-subtitle">Track daily symptoms</p>
            </div>
          </div>
          <div className="header-actions">
            <LanguageSelector />
            <ThemeToggle />
            <div className="privacy-badge">
              <Shield size={16} />
              <span>Private & Secure</span>
            </div>
            <button onClick={handleLogout} className="btn-secondary">Logout</button>
          </div>
        </div>
      </header>

      <div className="page-container">
      <header className="page-header">
        <h2>Your Symptoms</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          <Plus size={20} /> Log Symptoms
        </button>
      </header>

      {showForm && (
        <div className="form-card">
          <h3>Log Today's Symptoms</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>Mood</label>
              <select
                value={formData.mood}
                onChange={(e) => setFormData({...formData, mood: e.target.value})}
              >
                <option value="happy">😊 Happy</option>
                <option value="neutral">😐 Neutral</option>
                <option value="sad">😢 Sad</option>
                <option value="anxious">😰 Anxious</option>
                <option value="irritable">😠 Irritable</option>
              </select>
            </div>

            <div className="form-group">
              <label>Pain Level: {formData.pain_level}/10</label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.pain_level}
                onChange={(e) => setFormData({...formData, pain_level: parseInt(e.target.value)})}
              />
            </div>

            <div className="form-group">
              <label>Fatigue Level: {formData.fatigue}/10</label>
              <input
                type="range"
                min="0"
                max="10"
                value={formData.fatigue}
                onChange={(e) => setFormData({...formData, fatigue: parseInt(e.target.value)})}
              />
            </div>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.cramps}
                  onChange={(e) => setFormData({...formData, cramps: e.target.checked})}
                />
                Cramps
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.headache}
                  onChange={(e) => setFormData({...formData, headache: e.target.checked})}
                />
                Headache
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.acne}
                  onChange={(e) => setFormData({...formData, acne: e.target.checked})}
                />
                Acne
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={formData.bloating}
                  onChange={(e) => setFormData({...formData, bloating: e.target.checked})}
                />
                Bloating
              </label>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Any additional notes..."
                rows="3"
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Symptoms
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="symptoms-list">
        <h3>Symptom History</h3>
        {symptoms.length === 0 ? (
          <p className="empty-state">No symptoms logged yet. Start tracking today!</p>
        ) : (
          <div className="symptoms-grid">
            {symptoms.slice().reverse().map((symptom) => (
              <div key={symptom.id} className="symptom-card">
                <div className="symptom-header">
                  <span className="symptom-date">
                    {new Date(symptom.date).toLocaleDateString()}
                  </span>
                  <span className="symptom-mood">{moodEmojis[symptom.mood]}</span>
                </div>
                <div className="symptom-details">
                  {symptom.pain_level > 0 && <span className="badge">Pain: {symptom.pain_level}/10</span>}
                  {symptom.fatigue > 0 && <span className="badge">Fatigue: {symptom.fatigue}/10</span>}
                  {symptom.cramps && <span className="badge badge-warning">Cramps</span>}
                  {symptom.headache && <span className="badge badge-warning">Headache</span>}
                  {symptom.acne && <span className="badge">Acne</span>}
                  {symptom.bloating && <span className="badge">Bloating</span>}
                </div>
                {symptom.notes && <p className="symptom-notes">{symptom.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default SymptomLogger;
