import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cyclesAPI } from '../services/api';
import { Plus, Shield, ArrowLeft } from 'lucide-react';
import Navigation from '../components/Navigation';
import { AnimatedBackground } from '../components/AnimatedBackground';
import ThemeToggle from '../components/ThemeToggle';
import LanguageSelector from '../components/LanguageSelector';

function CycleTracker() {
  const navigate = useNavigate();
  const [cycles, setCycles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    start_date: '',
    end_date: '',
    flow_intensity: 'medium'
  });

  useEffect(() => {
    fetchCycles();
  }, []);

  const fetchCycles = async () => {
    try {
      const response = await cyclesAPI.getCycles();
      setCycles(response.data.cycles);
    } catch (error) {
      console.error('Error fetching cycles:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await cyclesAPI.addCycle(formData);
      setShowForm(false);
      setFormData({ start_date: '', end_date: '', flow_intensity: 'medium' });
      fetchCycles();
    } catch (error) {
      console.error('Error adding cycle:', error);
    }
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
            <span className="logo-icon">📅</span>
            <div>
              <h1 className="logo-title">Cycle Tracker</h1>
              <p className="logo-subtitle">Track your menstrual cycles</p>
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
        <h2>Your Cycles</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          <Plus size={20} /> Add Cycle
        </button>
      </header>

      {showForm && (
        <div className="form-card">
          <h3>Log New Cycle</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>End Date (optional)</label>
              <input
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({...formData, end_date: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Flow Intensity</label>
              <select
                value={formData.flow_intensity}
                onChange={(e) => setFormData({...formData, flow_intensity: e.target.value})}
              >
                <option value="light">Light</option>
                <option value="medium">Medium</option>
                <option value="heavy">Heavy</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Save Cycle
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="cycles-list">
        <h3>Your Cycle History</h3>
        {cycles.length === 0 ? (
          <p className="empty-state">No cycles tracked yet. Start by adding your first cycle!</p>
        ) : (
          <div className="cycles-grid">
            {cycles.map((cycle) => (
              <div key={cycle.id} className="cycle-card">
                <div className="cycle-date">
                  {new Date(cycle.start_date).toLocaleDateString()}
                </div>
                {cycle.end_date && (
                  <div className="cycle-duration">
                    Duration: {Math.ceil((new Date(cycle.end_date) - new Date(cycle.start_date)) / (1000 * 60 * 60 * 24))} days
                  </div>
                )}
                <div className={`flow-badge flow-${cycle.flow_intensity}`}>
                  {cycle.flow_intensity} flow
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>
    </div>
  );
}

export default CycleTracker;
