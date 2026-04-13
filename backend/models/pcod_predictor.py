import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
import os

class PCODPredictor:
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.feature_names = [
            'age', 'cycle_irregularity_score', 'avg_cycle_length',
            'weight_gain', 'acne_severity', 'hair_growth_score',
            'hair_loss', 'mood_swings', 'fatigue_level',
            'sleep_quality', 'stress_level'
        ]
        
    def train_model(self, X, y):
        """Train the PCOD prediction model"""
        X_scaled = self.scaler.fit_transform(X)
        self.model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            random_state=42,
            class_weight='balanced'
        )
        self.model.fit(X_scaled, y)
        
    def predict_risk(self, features):
        """
        Predict PCOD risk based on user features
        Returns: (risk_level, probability, recommendations)
        """
        if self.model is None:
            # Use rule-based system if model not trained
            return self._rule_based_prediction(features)
        
        features_array = np.array([features])
        features_scaled = self.scaler.transform(features_array)
        
        probability = self.model.predict_proba(features_scaled)[0][1]
        
        if probability < 0.3:
            risk_level = 'Low'
        elif probability < 0.6:
            risk_level = 'Moderate'
        else:
            risk_level = 'High'
            
        recommendations = self._generate_recommendations(risk_level, features)
        
        return {
            'risk_level': risk_level,
            'probability': float(probability),
            'recommendations': recommendations
        }
    
    def _rule_based_prediction(self, features):
        """Rule-based PCOD risk assessment when ML model unavailable"""
        score = 0
        
        # Cycle irregularity (0-10 scale)
        if features[1] > 7:
            score += 3
        elif features[1] > 4:
            score += 2
            
        # Cycle length
        if features[2] > 35 or features[2] < 21:
            score += 2
            
        # Weight gain
        if features[3] > 5:
            score += 2
            
        # Acne severity (0-10)
        if features[4] > 6:
            score += 1
            
        # Excessive hair growth
        if features[5] > 5:
            score += 2
            
        # Hair loss
        if features[6] > 5:
            score += 1
            
        # Mood swings
        if features[7] > 6:
            score += 1
            
        probability = min(score / 12, 1.0)
        
        if probability < 0.3:
            risk_level = 'Low'
        elif probability < 0.6:
            risk_level = 'Moderate'
        else:
            risk_level = 'High'
            
        recommendations = self._generate_recommendations(risk_level, features)
        
        return {
            'risk_level': risk_level,
            'probability': float(probability),
            'recommendations': recommendations
        }
    
    def _generate_recommendations(self, risk_level, features):
        """Generate personalized health recommendations"""
        recommendations = []
        
        if risk_level == 'High':
            recommendations.append({
                'category': 'Medical',
                'priority': 'high',
                'text': 'Consult a gynecologist for proper evaluation and hormonal tests'
            })
        
        if features[1] > 5:  # Irregular cycles
            recommendations.append({
                'category': 'Lifestyle',
                'priority': 'medium',
                'text': 'Maintain a regular sleep schedule and track your cycles consistently'
            })
        
        if features[3] > 3:  # Weight gain
            recommendations.append({
                'category': 'Diet',
                'priority': 'medium',
                'text': 'Focus on balanced diet with low glycemic index foods and regular exercise'
            })
        
        if features[10] > 6:  # High stress
            recommendations.append({
                'category': 'Mental Health',
                'priority': 'medium',
                'text': 'Practice stress management techniques like yoga, meditation, or deep breathing'
            })
        
        recommendations.append({
            'category': 'General',
            'priority': 'low',
            'text': 'Stay hydrated and maintain a food diary to identify trigger foods'
        })
        
        return recommendations
    
    def save_model(self, path='models/saved/'):
        """Save trained model and scaler"""
        os.makedirs(path, exist_ok=True)
        if self.model:
            joblib.dump(self.model, os.path.join(path, 'pcod_model.pkl'))
            joblib.dump(self.scaler, os.path.join(path, 'scaler.pkl'))
    
    def load_model(self, path='models/saved/'):
        """Load trained model and scaler"""
        try:
            self.model = joblib.load(os.path.join(path, 'pcod_model.pkl'))
            self.scaler = joblib.load(os.path.join(path, 'scaler.pkl'))
            return True
        except:
            return False
