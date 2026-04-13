import React, { useState } from 'react';
import { Apple, Coffee, Utensils, CheckCircle, XCircle } from 'lucide-react';

function PCODDietPlanner() {
  const [selectedMeal, setSelectedMeal] = useState('breakfast');

  const mealPlans = {
    breakfast: {
      icon: Coffee,
      title: 'Breakfast',
      goodFoods: [
        { name: 'Oatmeal with berries', benefit: 'Low GI, high fiber' },
        { name: 'Greek yogurt with nuts', benefit: 'Protein-rich, probiotics' },
        { name: 'Vegetable omelet', benefit: 'High protein, low carb' },
        { name: 'Smoothie with spinach & protein', benefit: 'Nutrient-dense' },
        { name: 'Whole grain toast with avocado', benefit: 'Healthy fats' }
      ],
      avoidFoods: [
        'Sugary cereals',
        'White bread',
        'Pastries & donuts',
        'Fruit juices',
        'Processed breakfast bars'
      ]
    },
    lunch: {
      icon: Utensils,
      title: 'Lunch',
      goodFoods: [
        { name: 'Grilled chicken salad', benefit: 'Lean protein, fiber' },
        { name: 'Quinoa bowl with vegetables', benefit: 'Complete protein' },
        { name: 'Lentil soup', benefit: 'Plant protein, low GI' },
        { name: 'Brown rice with fish', benefit: 'Omega-3, complex carbs' },
        { name: 'Chickpea curry', benefit: 'Fiber, plant protein' }
      ],
      avoidFoods: [
        'White rice',
        'Fried foods',
        'Fast food burgers',
        'Creamy pasta',
        'Sugary sauces'
      ]
    },
    dinner: {
      icon: Utensils,
      title: 'Dinner',
      goodFoods: [
        { name: 'Grilled salmon with vegetables', benefit: 'Omega-3, anti-inflammatory' },
        { name: 'Stir-fried tofu with broccoli', benefit: 'Plant protein, fiber' },
        { name: 'Turkey breast with sweet potato', benefit: 'Lean protein, complex carbs' },
        { name: 'Vegetable soup with beans', benefit: 'Low calorie, filling' },
        { name: 'Grilled chicken with cauliflower rice', benefit: 'Low carb, high protein' }
      ],
      avoidFoods: [
        'Pizza',
        'Pasta with cream sauce',
        'Fried chicken',
        'White potatoes',
        'Desserts'
      ]
    },
    snacks: {
      icon: Apple,
      title: 'Snacks',
      goodFoods: [
        { name: 'Handful of almonds', benefit: 'Healthy fats, protein' },
        { name: 'Apple with peanut butter', benefit: 'Fiber, protein' },
        { name: 'Carrot sticks with hummus', benefit: 'Low calorie, fiber' },
        { name: 'Hard-boiled eggs', benefit: 'Protein-rich' },
        { name: 'Greek yogurt', benefit: 'Probiotics, protein' }
      ],
      avoidFoods: [
        'Chips & crackers',
        'Cookies',
        'Candy',
        'Soda',
        'Ice cream'
      ]
    }
  };

  const supplements = [
    { name: 'Inositol', dosage: '2-4g daily', benefit: 'Improves insulin sensitivity' },
    { name: 'Vitamin D', dosage: '1000-2000 IU', benefit: 'Hormone regulation' },
    { name: 'Omega-3', dosage: '1000mg', benefit: 'Reduces inflammation' },
    { name: 'Magnesium', dosage: '300-400mg', benefit: 'Insulin function' },
    { name: 'Chromium', dosage: '200mcg', benefit: 'Blood sugar control' }
  ];

  const currentMeal = mealPlans[selectedMeal];
  const MealIcon = currentMeal.icon;

  return (
    <div className="pcod-diet-planner">
      <div className="diet-header">
        <Apple size={24} />
        <h3>PCOD Diet Planner</h3>
      </div>

      <div className="diet-intro">
        <p>🥗 Proper nutrition is crucial for managing PCOD symptoms</p>
        <p><strong>Focus on:</strong> Low GI foods, lean proteins, healthy fats, and fiber</p>
      </div>

      <div className="meal-selector">
        {Object.entries(mealPlans).map(([key, meal]) => (
          <button
            key={key}
            className={`meal-btn ${selectedMeal === key ? 'active' : ''}`}
            onClick={() => setSelectedMeal(key)}
          >
            <meal.icon size={20} />
            {meal.title}
          </button>
        ))}
      </div>

      <div className="meal-content">
        <div className="meal-header">
          <MealIcon size={24} />
          <h4>{currentMeal.title} Ideas</h4>
        </div>

        <div className="foods-section good">
          <h5>
            <CheckCircle size={18} />
            PCOD-Friendly Foods
          </h5>
          <div className="foods-list">
            {currentMeal.goodFoods.map((food, index) => (
              <div key={index} className="food-item">
                <strong>{food.name}</strong>
                <span>{food.benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="foods-section avoid">
          <h5>
            <XCircle size={18} />
            Foods to Avoid
          </h5>
          <div className="avoid-list">
            {currentMeal.avoidFoods.map((food, index) => (
              <div key={index} className="avoid-item">{food}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="supplements-section">
        <h4>💊 Recommended Supplements</h4>
        <p className="supplements-note">Consult your doctor before starting any supplements</p>
        <div className="supplements-grid">
          {supplements.map((supp, index) => (
            <div key={index} className="supplement-card">
              <strong>{supp.name}</strong>
              <span className="dosage">{supp.dosage}</span>
              <span className="benefit">{supp.benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="diet-tips">
        <h4>🎯 PCOD Diet Tips:</h4>
        <ul>
          <li>Eat small, frequent meals (5-6 times/day)</li>
          <li>Choose low glycemic index (GI) foods</li>
          <li>Include protein with every meal</li>
          <li>Drink 8-10 glasses of water daily</li>
          <li>Limit caffeine and alcohol</li>
          <li>Avoid processed and sugary foods</li>
          <li>Practice portion control</li>
          <li>Don't skip meals</li>
        </ul>
      </div>

      <style jsx>{`
        .pcod-diet-planner {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          margin: 20px 0;
        }

        .diet-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          color: #4caf50;
        }

        .diet-intro {
          background: #e8f5e9;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          border-left: 4px solid #4caf50;
        }

        .diet-intro p {
          margin: 4px 0;
          color: #333;
        }

        .meal-selector {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 12px;
          margin-bottom: 24px;
        }

        .meal-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px;
          background: #f8f9fa;
          border: 2px solid #ddd;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
        }

        .meal-btn.active {
          background: #4caf50;
          color: white;
          border-color: #4caf50;
        }

        .meal-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .meal-content {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .meal-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          color: #4caf50;
        }

        .foods-section {
          margin-bottom: 20px;
        }

        .foods-section h5 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 0 0 12px 0;
        }

        .foods-section.good h5 {
          color: #4caf50;
        }

        .foods-section.avoid h5 {
          color: #f44336;
        }

        .foods-list {
          display: grid;
          gap: 12px;
        }

        .food-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 12px;
          background: white;
          border-radius: 8px;
          border-left: 4px solid #4caf50;
        }

        .food-item strong {
          color: #333;
        }

        .food-item span {
          color: #666;
          font-size: 13px;
        }

        .avoid-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .avoid-item {
          padding: 8px 16px;
          background: #ffebee;
          border: 1px solid #f44336;
          border-radius: 20px;
          color: #c62828;
          font-size: 14px;
        }

        .supplements-section {
          background: #f3e5f5;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 24px;
        }

        .supplements-section h4 {
          margin: 0 0 8px 0;
          color: #9c27b0;
        }

        .supplements-note {
          color: #666;
          font-size: 13px;
          margin-bottom: 16px;
          font-style: italic;
        }

        .supplements-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
        }

        .supplement-card {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 16px;
          background: white;
          border-radius: 8px;
          border: 2px solid #9c27b0;
        }

        .supplement-card strong {
          color: #9c27b0;
          font-size: 16px;
        }

        .dosage {
          color: #666;
          font-size: 13px;
        }

        .benefit {
          color: #333;
          font-size: 12px;
          margin-top: 4px;
        }

        .diet-tips {
          background: #fff5f5;
          padding: 16px;
          border-radius: 8px;
        }

        .diet-tips h4 {
          margin: 0 0 12px 0;
        }

        .diet-tips ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .diet-tips li {
          padding: 6px 0;
          padding-left: 20px;
          position: relative;
          color: #666;
        }

        .diet-tips li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #4caf50;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .meal-selector {
            grid-template-columns: repeat(2, 1fr);
          }

          .supplements-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default PCODDietPlanner;
