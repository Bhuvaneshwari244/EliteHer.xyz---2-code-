import React, { useState, useEffect } from 'react';
import { Pill, Plus, Trash2, Clock, AlertCircle } from 'lucide-react';

function MedicationTracker() {
  const [medications, setMedications] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    time: '09:00',
    notes: ''
  });

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('medications');
    if (saved) {
      setMedications(JSON.parse(saved));
    }
  }, []);

  const saveMedications = (meds) => {
    localStorage.setItem('medications', JSON.stringify(meds));
    setMedications(meds);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMed = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString()
    };
    saveMedications([...medications, newMed]);
    setFormData({
      name: '',
      dosage: '',
      frequency: 'daily',
      time: '09:00',
      notes: ''
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this medication?')) {
      saveMedications(medications.filter(med => med.id !== id));
    }
  };

  const getFrequencyLabel = (freq) => {
    const labels = {
      'daily': 'Every day',
      'twice-daily': 'Twice a day',
      'weekly': 'Once a week',
      'as-needed': 'As needed'
    };
    return labels[freq] || freq;
  };

  return (
    <div className="medication-tracker-card">
      <div className="medication-header">
        <div>
          <h3>
            <Pill size={24} />
            Medication Tracker
          </h3>
          <p className="medication-subtitle">Track your medications and supplements</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)} 
          className="btn-primary"
        >
          <Plus size={20} />
          Add Medication
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="medication-form">
          <div className="form-row">
            <div className="form-group">
              <label>Medication Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g., Vitamin D, Iron supplement"
                required
              />
            </div>

            <div className="form-group">
              <label>Dosage *</label>
              <input
                type="text"
                value={formData.dosage}
                onChange={(e) => setFormData({...formData, dosage: e.target.value})}
                placeholder="e.g., 500mg, 1 tablet"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Frequency *</label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({...formData, frequency: e.target.value})}
                required
              >
                <option value="daily">Every day</option>
                <option value="twice-daily">Twice a day</option>
                <option value="weekly">Once a week</option>
                <option value="as-needed">As needed</option>
              </select>
            </div>

            <div className="form-group">
              <label>Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({...formData, time: e.target.value})}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Notes (optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="e.g., Take with food, side effects, etc."
              rows="2"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Save Medication</button>
            <button 
              type="button" 
              onClick={() => setShowForm(false)} 
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {medications.length === 0 ? (
        <div className="empty-state">
          <Pill size={48} color="#ccc" />
          <p>No medications tracked yet</p>
          <p className="empty-subtitle">Add your first medication to start tracking</p>
        </div>
      ) : (
        <div className="medications-list">
          {medications.map((med) => (
            <div key={med.id} className="medication-item">
              <div className="medication-icon">
                <Pill size={24} />
              </div>
              <div className="medication-details">
                <h4>{med.name}</h4>
                <div className="medication-info">
                  <span className="dosage-badge">{med.dosage}</span>
                  <span className="frequency-badge">
                    <Clock size={14} />
                    {getFrequencyLabel(med.frequency)}
                  </span>
                  {med.time && (
                    <span className="time-badge">
                      {med.time}
                    </span>
                  )}
                </div>
                {med.notes && (
                  <p className="medication-notes">
                    <AlertCircle size={14} />
                    {med.notes}
                  </p>
                )}
              </div>
              <button 
                onClick={() => handleDelete(med.id)} 
                className="delete-btn"
                aria-label="Delete medication"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="medication-reminder">
        <AlertCircle size={16} />
        <p>
          <strong>Reminder:</strong> Always consult your healthcare provider before starting 
          or stopping any medication.
        </p>
      </div>
    </div>
  );
}

export default MedicationTracker;
