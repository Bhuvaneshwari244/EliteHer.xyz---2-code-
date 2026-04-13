from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

auth_bp = Blueprint('auth', __name__)

# In-memory user storage (replace with database in production)
users_db = {}

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    age = data.get('age')
    
    if not email or not password or not name:
        return jsonify({'error': 'Missing required fields'}), 400
    
    if email in users_db:
        return jsonify({'error': 'User already exists'}), 409
    
    users_db[email] = {
        'email': email,
        'password': generate_password_hash(password),
        'name': name,
        'age': age,
        'created_at': datetime.utcnow().isoformat(),
        'cycles': [],
        'symptoms': []
    }
    
    access_token = create_access_token(identity=email)
    
    return jsonify({
        'message': 'User registered successfully',
        'access_token': access_token,
        'user': {
            'email': email,
            'name': name,
            'age': age
        }
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'error': 'Missing email or password'}), 400
    
    user = users_db.get(email)
    
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid credentials'}), 401
    
    access_token = create_access_token(identity=email)
    
    return jsonify({
        'message': 'Login successful',
        'access_token': access_token,
        'user': {
            'email': user['email'],
            'name': user['name'],
            'age': user.get('age')
        }
    }), 200

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_email = get_jwt_identity()
    user = users_db.get(current_user_email)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'email': user['email'],
        'name': user['name'],
        'age': user.get('age'),
        'created_at': user['created_at']
    }), 200
