from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.pcod_predictor import PCODPredictor
from routes.auth import users_db

predictions_bp = Blueprint('predictions', __name__)
predictor = PCODPredictor()

@predictions_bp.route('/pcod-risk', methods=['POST'])
@jwt_required()
def assess_pcod_risk():
    current_user_email = get_jwt_identity()
    user = users_db.get(current_user_email)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    data = request.get_json()
    
    # Extract features for prediction
    features = [
        user.get('age', 25),
        data.get('cycle_irregularity_score', 5),
        data.get('avg_cycle_length', 28),
        data.get('weight_gain', 0),
        data.get('acne_severity', 0),
        data.get('hair_growth_score', 0),
        data.get('hair_loss', 0),
        data.get('mood_swings', 0),
        data.get('fatigue_level', 0),
        data.get('sleep_quality', 7),
        data.get('stress_level', 5)
    ]
    
    result = predictor.predict_risk(features)
    
    return jsonify({
        'risk_assessment': result,
        'disclaimer': 'This is not a medical diagnosis. Please consult a healthcare professional for proper evaluation.'
    }), 200

@predictions_bp.route('/pcod-risk/auto', methods=['GET'])
@jwt_required()
def auto_assess_pcod_risk():
    """Automatically assess PCOD risk based on user's tracked data"""
    current_user_email = get_jwt_identity()
    user = users_db.get(current_user_email)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    cycles = user.get('cycles', [])
    symptoms = user.get('symptoms', [])
    
    if len(cycles) < 3:
        return jsonify({
            'message': 'Need at least 3 cycles for automatic assessment',
            'cycles_count': len(cycles)
        }), 200
    
    # Calculate cycle irregularity
    from datetime import datetime
    cycle_lengths = []
    for i in range(len(cycles) - 1):
        start1 = datetime.fromisoformat(cycles[i]['start_date'])
        start2 = datetime.fromisoformat(cycles[i + 1]['start_date'])
        cycle_lengths.append((start2 - start1).days)
    
    avg_cycle_length = sum(cycle_lengths) / len(cycle_lengths)
    irregularity = max(cycle_lengths) - min(cycle_lengths) if len(cycle_lengths) > 1 else 0
    irregularity_score = min(irregularity / 2, 10)
    
    # Analyze symptoms
    avg_pain = sum(s.get('pain_level', 0) for s in symptoms) / len(symptoms) if symptoms else 0
    avg_fatigue = sum(s.get('fatigue', 0) for s in symptoms) / len(symptoms) if symptoms else 0
    acne_count = sum(1 for s in symptoms if s.get('acne'))
    
    features = [
        user.get('age', 25),
        irregularity_score,
        avg_cycle_length,
        0,  # weight_gain (user input needed)
        min(acne_count / max(len(symptoms), 1) * 10, 10),
        0,  # hair_growth (user input needed)
        0,  # hair_loss (user input needed)
        avg_pain,
        avg_fatigue,
        7,  # sleep_quality (default)
        5   # stress_level (default)
    ]
    
    result = predictor.predict_risk(features)
    
    return jsonify({
        'risk_assessment': result,
        'data_quality': {
            'cycles_tracked': len(cycles),
            'symptoms_logged': len(symptoms),
            'completeness': 'partial'
        },
        'disclaimer': 'This is not a medical diagnosis. Please consult a healthcare professional.'
    }), 200
