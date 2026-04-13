# 🚀 Aura - Complete Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn
- Git

## Backend Setup

### Step 1: Navigate to Backend Directory
```bash
cd backend
```

### Step 2: Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Set Up Environment Variables
```bash
# Copy the example env file
cp .env.example .env

# Edit .env and update values
# JWT_SECRET_KEY=your-super-secret-key-change-this
# DATABASE_URL=sqlite:///aura.db
# FLASK_ENV=development
```

### Step 5: Run the Backend Server
```bash
python app.py
```

The backend API will be running at `http://localhost:5000`

### Test the API
```bash
# Test health endpoint
curl http://localhost:5000/api/health
```

---

## Frontend Setup

### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Set Up Environment Variables
```bash
# Copy the example env file
cp .env.example .env

# The default should work for local development
# REACT_APP_API_URL=http://localhost:5000/api
```

### Step 4: Run the Frontend
```bash
npm start
# or
yarn start
```

The frontend will be running at `http://localhost:3000`

---

## Testing the Application

### 1. Register a New User
- Open `http://localhost:3000`
- Click "Register here"
- Fill in the form:
  - Name: Test User
  - Email: test@example.com
  - Age: 25
  - Password: password123
- Click "Register"

### 2. Add Cycle Data
- Navigate to "Cycle Tracker"
- Click "Add Cycle"
- Enter start date (e.g., 2026-03-01)
- Select flow intensity
- Click "Save Cycle"
- Add 2-3 more cycles with different dates

### 3. Log Symptoms
- Navigate to "Symptom Logger"
- Click "Log Symptoms"
- Fill in the form:
  - Select mood
  - Adjust pain level slider
  - Check relevant symptoms
  - Add notes
- Click "Save Symptoms"

### 4. Get PCOD Assessment
- Navigate to "PCOD Risk Assessment"
- Click "Auto Assess from My Data" (if you have enough data)
- OR fill in the manual assessment form
- View your risk level and recommendations

---

## API Endpoints Reference

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)

### Cycles
- `POST /api/cycles` - Add new cycle
- `GET /api/cycles` - Get all cycles
- `GET /api/cycles/stats` - Get cycle statistics
- `GET /api/cycles/predict-next` - Predict next period

### Symptoms
- `POST /api/symptoms` - Log symptom
- `GET /api/symptoms` - Get all symptoms
- `GET /api/symptoms/analysis` - Get symptom analysis

### Predictions
- `POST /api/predictions/pcod-risk` - Manual PCOD assessment
- `GET /api/predictions/pcod-risk/auto` - Auto PCOD assessment

---

## Troubleshooting

### Backend Issues

**Problem: ModuleNotFoundError**
```bash
# Make sure virtual environment is activated
# Reinstall dependencies
pip install -r requirements.txt
```

**Problem: Port 5000 already in use**
```bash
# Change port in app.py
app.run(debug=True, host='0.0.0.0', port=5001)
```

**Problem: CORS errors**
```bash
# Make sure Flask-CORS is installed
pip install Flask-CORS
```

### Frontend Issues

**Problem: npm install fails**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json
# Reinstall
npm install
```

**Problem: Cannot connect to backend**
```bash
# Check .env file has correct API URL
# Make sure backend is running
# Check browser console for errors
```

**Problem: React scripts not found**
```bash
# Install react-scripts
npm install react-scripts --save
```

---

## Production Deployment

### Backend (Heroku Example)

1. Create `Procfile`:
```
web: gunicorn app:app
```

2. Add `gunicorn` to requirements.txt:
```bash
echo "gunicorn==21.2.0" >> requirements.txt
```

3. Deploy:
```bash
heroku create aura-backend
git push heroku main
heroku config:set JWT_SECRET_KEY=your-production-secret
```

### Frontend (Vercel Example)

1. Build the app:
```bash
npm run build
```

2. Deploy:
```bash
npm install -g vercel
vercel --prod
```

3. Set environment variable:
```bash
vercel env add REACT_APP_API_URL
# Enter your production API URL
```

---

## Database Migration (SQLite to PostgreSQL)

### Step 1: Install PostgreSQL adapter
```bash
pip install psycopg2-binary
```

### Step 2: Update .env
```
DATABASE_URL=postgresql://user:password@localhost/aura_db
```

### Step 3: Create database models
```bash
# Add SQLAlchemy models in backend/models/database.py
# Run migrations
```

---

## ML Model Training (Optional)

If you want to train the model with real data:

### Step 1: Prepare training data
```python
# Create training_data.csv with columns:
# age, cycle_irregularity_score, avg_cycle_length, weight_gain,
# acne_severity, hair_growth_score, hair_loss, mood_swings,
# fatigue_level, sleep_quality, stress_level, has_pcod
```

### Step 2: Train the model
```python
from models.pcod_predictor import PCODPredictor
import pandas as pd

# Load data
data = pd.read_csv('training_data.csv')
X = data.drop('has_pcod', axis=1)
y = data['has_pcod']

# Train
predictor = PCODPredictor()
predictor.train_model(X, y)
predictor.save_model()
```

---

## Security Checklist

Before deploying to production:

- [ ] Change JWT_SECRET_KEY to a strong random string
- [ ] Enable HTTPS
- [ ] Set up proper CORS origins
- [ ] Add rate limiting
- [ ] Implement input validation
- [ ] Set up database backups
- [ ] Add logging and monitoring
- [ ] Review and update dependencies
- [ ] Add password strength requirements
- [ ] Implement email verification

---

## Performance Optimization

### Backend
- Add Redis for caching
- Use connection pooling for database
- Implement pagination for large datasets
- Add API rate limiting

### Frontend
- Enable code splitting
- Optimize images
- Add service worker for offline support
- Implement lazy loading

---

## Support

For issues or questions:
- Check the GitHub Issues
- Review the documentation
- Contact: [your-email]

---

## License

MIT License - See LICENSE file for details
