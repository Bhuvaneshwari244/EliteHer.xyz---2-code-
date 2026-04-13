import React, { useState, useEffect } from 'react';
import { Activity, Plus, Trash2, Clock, Flame } from 'lucide-react';

function ExerciseLogger() {
  const [exercises, setExercises] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'walking',
    duration: 30,
    intensity: 'moderate',
    notes: ''
  });

  const exerciseTypes = [
    { value: 'walking', label: 'Walking', calories: 4 },
    { value: 'running', label: 'Running', calories: 10 },
    { value: 'yoga', label: 'Yoga', calories: 3 },
    { value: 'cycling', label: 'Cycling', calories: 8 },
    { value: 'swimming', label: 'Swimming', calories: 9 },
    { value: 'dancing', label: 'Dancing', calories: 6 },
    { value: 'strength', label: 'Strength Training', calories: 5 },
    { value: 'pilates', label: 'Pilates', calories: 4 },
    { value: 'aerobics', label: 'Aerobics', calories: 7 }
  ];

  useEffect(() => {
    loadExercises();
  }, []);

  const loadExercises = () => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem('exercises');
    if (saved) {
      const all = JSON.parse(saved);
      const todayExercises = all.filter(e => e.date === today);
      setExercises(todayExercises);
    }
  };

  const saveExercises = (newExercises) => {
    const saved = localStorage.getItem('exercises');
    const all = saved ? JSON.parse(saved) : [];
    const today = new Date().toISOString().split('T')[0];
    const otherDays = all.filter(e => e.date !== today);
    const updated = [...otherDays, ...newExercises];
    localStorage.setItem('exercises', JSON.stringify(updated));
    setExercises(newExercises);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const exerciseType = exerciseTypes.find(t => t.value === formData.type);
    const caloriesPerMin = exerciseType.calories;
    const intensityMultiplier = formData.intensity === 'low' ? 0.7 : formData.intensity === 'high' ? 1.3 : 1;
    const calories = Math.round(caloriesPerMin * formData.duration * intensityMultiplier);

    const newExercise = {
      id: Date.now(),
      ...formData,
      date: new Date().toISOString().split('T')[0],
      calories,
      timestamp: new Date().toISOString()
    };

    saveExercises([...exercises, newExercise]);
    setFormData({ type: 'walking', duration: 30, intensity: 'moderate', notes: '' });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this exercise?')) {
      saveExercises(exercises.filter(e => e.id !== id));
    }
  };

  const totalDuration = exercises.reduce((sum, e) => sum + e.duration, 0);
  const totalCalories = exercises.reduce((sum, e) => sum + e.calories, 0);

  return (
    <div className="exercise-logger-card">
      <div className="exercise-header">
        <div>
          <h3>
            <Activity size={24} />
            Exercise Logger
          </h3>
          <p className="exercise-subtitle">Track your daily physical activity</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          <Plus size={20} />
          Log Exercise
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="exercise-form">
          <div className="form-row">
            <div className="form-group">
              <label>Exercise Type *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                required
              >
                {exerciseTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Duration (minutes) *</label>
              <input
                type="number"
                min="1"
                max="300"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Intensity *</label>
            <div className="intensity-options">
              <label className="intensity-option">
                <input
                  type="radio"
                  name="intensity"
                  value="low"
                  checked={formData.intensity === 'low'}
                  onChange={(e) => setFormData({...formData, intensity: e.target.value})}
                />
                <span>Low</span>
              </label>
              <label className="intensity-option">
                <input
                  type="radio"
                  name="intensity"
                  value="moderate"
                  checked={formData.intensity === 'moderate'}
                  onChange={(e) => setFormData({...formData, intensity: e.target.value})}
                />
                <span>Moderate</span>
              </label>
              <label className="intensity-option">
                <input
                  type="radio"
                  name="intensity"
                  value="high"
                  checked={formData.intensity === 'high'}
                  onChange={(e) => setFormData({...formData, intensity: e.target.value})}
                />
                <span>High</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label>Notes (optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="How did you feel? Any observations..."
              rows="2"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Save Exercise</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="exercise-stats">
        <div className="stat-card">
          <Clock size={24} />
          <div>
            <span className="stat-value">{totalDuration}</span>
            <span className="stat-label">Minutes Today</span>
          </div>
        </div>
        <div className="stat-card">
          <Flame size={24} />
          <div>
            <span className="stat-value">{totalCalories}</span>
            <span className="stat-label">Calories Burned</span>
          </div>
        </div>
        <div className="stat-card">
          <Activity size={24} />
          <div>
            <span className="stat-value">{exercises.length}</span>
            <span className="stat-label">Activities</span>
          </div>
        </div>
      </div>

      {exercises.length === 0 ? (
        <div className="empty-state">
          <Activity size={48} color="#ccc" />
          <p>No exercises logged today</p>
          <p className="empty-subtitle">Start tracking your physical activity</p>
        </div>
      ) : (
        <div className="exercise-list">
          {exercises.map(exercise => {
            const type = exerciseTypes.find(t => t.value === exercise.type);
            return (
              <div key={exercise.id} className="exercise-item">
                <div className="exercise-icon">
                  <Activity size={24} />
                </div>
                <div className="exercise-details">
                  <h4>{type?.label || exercise.type}</h4>
                  <div className="exercise-meta">
                    <span className="duration-badge">
                      <Clock size={14} />
                      {exercise.duration} min
                    </span>
                    <span className="intensity-badge" data-intensity={exercise.intensity}>
                      {exercise.intensity}
                    </span>
                    <span className="calories-badge">
                      <Flame size={14} />
                      {exercise.calories} cal
                    </span>
                  </div>
                  {exercise.notes && (
                    <p className="exercise-notes">{exercise.notes}</p>
                  )}
                </div>
                <button onClick={() => handleDelete(exercise.id)} className="delete-btn">
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="exercise-tips">
        <h4>💪 Exercise Tips</h4>
        <ul>
          <li>Aim for 150 minutes of moderate activity per week</li>
          <li>Exercise can help reduce menstrual cramps</li>
          <li>Listen to your body during your period</li>
          <li>Stay hydrated before, during, and after exercise</li>
        </ul>
      </div>
    </div>
  );
}

export default ExerciseLogger;
