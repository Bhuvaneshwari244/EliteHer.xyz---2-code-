import React, { useState, useEffect } from 'react';
import { Apple, Plus, TrendingUp } from 'lucide-react';

function NutritionTracker() {
  const [meals, setMeals] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    mealType: 'breakfast',
    foods: '',
    calories: '',
    notes: ''
  });

  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = () => {
    const today = new Date().toISOString().split('T')[0];
    const saved = localStorage.getItem('nutrition_tracker');
    if (saved) {
      const all = JSON.parse(saved);
      const todayMeals = all.filter(m => m.date === today);
      setMeals(todayMeals);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const today = new Date().toISOString().split('T')[0];
    const newMeal = {
      ...formData,
      id: Date.now(),
      date: today,
      timestamp: new Date().toISOString()
    };

    const saved = localStorage.getItem('nutrition_tracker');
    const all = saved ? JSON.parse(saved) : [];
    const updated = [newMeal, ...all];
    
    localStorage.setItem('nutrition_tracker', JSON.stringify(updated));
    setMeals([newMeal, ...meals]);
    
    setFormData({ mealType: 'breakfast', foods: '', calories: '', notes: '' });
    setShowForm(false);
  };

  const totalCalories = meals.reduce((sum, m) => sum + (parseInt(m.calories) || 0), 0);
  const calorieGoal = 2000;
  const calorieProgress = Math.min(100, (totalCalories / calorieGoal) * 100);

  const getMealEmoji = (type) => {
    const emojis = {
      breakfast: '🌅',
      lunch: '☀️',
      dinner: '🌙',
      snack: '🍎'
    };
    return emojis[type] || '🍽️';
  };

  const nutritionTips = [
    '🥬 Include leafy greens for iron during menstruation',
    '🥜 Nuts and seeds help balance hormones',
    '🐟 Omega-3 fatty acids reduce inflammation',
    '🍊 Vitamin C helps iron absorption',
    '💧 Stay hydrated throughout your cycle'
  ];

  return (
    <div className="nutrition-tracker-card">
      <div className="nutrition-header">
        <div>
          <h3>
            <Apple size={24} />
            Nutrition Tracker
          </h3>
          <p className="nutrition-subtitle">Track your daily meals</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={18} />
          {showForm ? 'Cancel' : 'Log Meal'}
        </button>
      </div>

      <div className="calorie-summary">
        <div className="calorie-info">
          <span className="calorie-value">{totalCalories}</span>
          <span className="calorie-label">/ {calorieGoal} cal</span>
        </div>
        <div className="calorie-progress">
          <div 
            className="calorie-bar"
            style={{ width: `${calorieProgress}%` }}
          />
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="nutrition-form">
          <div className="form-group">
            <label>Meal Type *</label>
            <select
              value={formData.mealType}
              onChange={(e) => setFormData({...formData, mealType: e.target.value})}
              required
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>

          <div className="form-group">
            <label>Foods *</label>
            <input
              type="text"
              value={formData.foods}
              onChange={(e) => setFormData({...formData, foods: e.target.value})}
              placeholder="e.g., Oatmeal with berries, Green tea"
              required
            />
          </div>

          <div className="form-group">
            <label>Estimated Calories</label>
            <input
              type="number"
              value={formData.calories}
              onChange={(e) => setFormData({...formData, calories: e.target.value})}
              placeholder="300"
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="How did you feel after eating?"
              rows="2"
            />
          </div>

          <button type="submit" className="btn-primary">Log Meal</button>
        </form>
      )}

      <div className="meals-list">
        {meals.length === 0 ? (
          <div className="empty-state">
            <Apple size={48} color="#ccc" />
            <p>No meals logged today</p>
          </div>
        ) : (
          meals.map(meal => (
            <div key={meal.id} className="meal-card">
              <div className="meal-icon">{getMealEmoji(meal.mealType)}</div>
              <div className="meal-details">
                <div className="meal-header">
                  <h4>{meal.mealType.charAt(0).toUpperCase() + meal.mealType.slice(1)}</h4>
                  {meal.calories && (
                    <span className="meal-calories">{meal.calories} cal</span>
                  )}
                </div>
                <p className="meal-foods">{meal.foods}</p>
                {meal.notes && (
                  <p className="meal-notes">💭 {meal.notes}</p>
                )}
                <span className="meal-time">
                  {new Date(meal.timestamp).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="nutrition-tips">
        <h4>
          <TrendingUp size={18} />
          Nutrition Tips for Menstrual Health
        </h4>
        <ul>
          {nutritionTips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NutritionTracker;
