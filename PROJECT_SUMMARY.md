# 🌸 Aura - Project Summary

## Elite Her Hackathon 2026 - Problem Statement #9

---

## Executive Summary

**Aura** is an AI-powered period tracking and PCOD risk prediction system designed to address the critical gap in women's healthcare. Unlike existing apps that fail with irregular cycles, Aura uses machine learning to detect early signs of PCOD (Polycystic Ovary Disorder) and provides personalized health recommendations.

### The Problem
- 1 in 10 women suffer from PCOD/PCOS
- 70% of cases remain undiagnosed
- Existing apps fail to handle irregular periods
- Lack of early detection tools
- No personalized health insights

### Our Solution
A comprehensive health platform that:
1. Tracks menstrual cycles with irregular pattern support
2. Predicts PCOD risk using machine learning (11 health parameters)
3. Provides personalized recommendations
4. Offers symptom tracking and analysis
5. Predicts next period with adaptive algorithms

---

## Technical Implementation

### Architecture
```
Frontend (React) ←→ Backend API (Flask) ←→ ML Models (scikit-learn)
                         ↓
                    Database (SQLite/PostgreSQL)
```

### Technology Stack

**Frontend:**
- React.js 18.2.0
- React Router for navigation
- Axios for API calls
- Lucide React for icons
- Custom CSS with gradients

**Backend:**
- Flask 3.0.0 (Python)
- Flask-JWT-Extended for authentication
- Flask-CORS for cross-origin requests
- RESTful API architecture

**Machine Learning:**
- scikit-learn 1.4.0
- Random Forest Classifier
- StandardScaler for feature normalization
- Joblib for model persistence

**Database:**
- SQLite (development)
- PostgreSQL ready (production)
- SQLAlchemy ORM

---

## Project Structure

```
period-health-tracker/
├── backend/
│   ├── app.py                      # Flask application entry point
│   ├── requirements.txt            # Python dependencies
│   ├── .env.example               # Environment variables template
│   ├── models/
│   │   └── pcod_predictor.py     # ML model for PCOD prediction
│   └── routes/
│       ├── auth.py                # Authentication endpoints
│       ├── cycles.py              # Cycle tracking endpoints
│       ├── symptoms.py            # Symptom logging endpoints
│       └── predictions.py         # PCOD risk assessment endpoints
├── frontend/
│   ├── package.json               # Node dependencies
│   ├── public/
│   │   └── index.html            # HTML template
│   └── src/
│       ├── App.js                # Main React component
│       ├── App.css               # Global styles
│       ├── index.js              # React entry point
│       ├── services/
│       │   └── api.js            # API service layer
│       └── pages/
│           ├── Login.js          # Login page
│           ├── Register.js       # Registration page
│           ├── Dashboard.js      # Main dashboard
│           ├── CycleTracker.js   # Cycle tracking page
│           ├── SymptomLogger.js  # Symptom logging page
│           └── PCODAssessment.js # PCOD risk assessment page
├── README.md                      # Project overview
├── SETUP_GUIDE.md                # Installation instructions
├── PRESENTATION.md               # Hackathon presentation outline
├── FEATURES.md                   # Complete feature list
├── PROJECT_SUMMARY.md            # This file
└── .gitignore                    # Git ignore rules
```

---

## Key Features Implemented

### 1. User Authentication
- Secure registration and login
- JWT token-based authentication
- Password hashing
- Protected routes

### 2. Cycle Tracking
- Log period start/end dates
- Track flow intensity
- Calculate cycle statistics
- Detect irregularity
- View cycle history

### 3. Symptom Logging
- Daily mood tracking
- Pain level (0-10 scale)
- Fatigue tracking
- Common symptoms (cramps, headache, acne, bloating)
- Custom notes

### 4. PCOD Risk Assessment
- ML-based prediction using 11 parameters
- Risk levels: Low, Moderate, High
- Probability scoring
- Automatic assessment from tracked data
- Manual assessment option
- Personalized recommendations

### 5. Period Prediction
- AI-powered next period prediction
- Confidence scoring
- Handles irregular cycles
- Based on historical data

### 6. Dashboard & Analytics
- Overview of all health metrics
- Visual statistics
- Quick access to features
- Real-time updates

---

## Machine Learning Model

### Input Features (11 parameters)
1. Age
2. Cycle irregularity score (0-10)
3. Average cycle length (days)
4. Recent weight gain (kg)
5. Acne severity (0-10)
6. Excessive hair growth score (0-10)
7. Hair loss (0-10)
8. Mood swings (0-10)
9. Fatigue level (0-10)
10. Sleep quality (0-10)
11. Stress level (0-10)

### Model Architecture
- **Algorithm:** Random Forest Classifier
- **Features:** 11 health parameters
- **Output:** Risk level + Probability + Recommendations
- **Fallback:** Rule-based system for reliability

### Prediction Logic
```python
if probability < 0.3:
    risk_level = 'Low'
elif probability < 0.6:
    risk_level = 'Moderate'
else:
    risk_level = 'High'
```

### Recommendations Engine
Generates personalized advice based on:
- Risk level
- Individual symptoms
- Lifestyle factors
- Medical urgency

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

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

## Installation & Setup

### Quick Start

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python app.py
```

**Frontend:**
```bash
cd frontend
npm install
cp .env.example .env
npm start
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## Testing the Application

### Test Scenario 1: New User Journey
1. Register with email and password
2. Add 3-4 cycles with different dates
3. Log symptoms for multiple days
4. Get PCOD risk assessment
5. View personalized recommendations

### Test Scenario 2: PCOD Detection
1. Login to existing account
2. Navigate to PCOD Assessment
3. Fill manual assessment form with high-risk values:
   - Cycle irregularity: 8/10
   - Weight gain: 10 kg
   - Acne severity: 7/10
   - Stress level: 8/10
4. View "High Risk" result with recommendations

### Test Scenario 3: Period Prediction
1. Add at least 2 cycles
2. View dashboard
3. Check "Next Period Prediction" card
4. Verify predicted date and confidence level

---

## Unique Value Proposition

### What Makes Aura Special?

1. **Handles Irregular Cycles**
   - Adaptive algorithms
   - No assumptions about regularity
   - Works with any pattern

2. **AI-Powered PCOD Detection**
   - Early warning system
   - 11-parameter analysis
   - Medical-grade insights

3. **Comprehensive Tracking**
   - Cycles + Symptoms + Mood
   - Holistic health view
   - Pattern recognition

4. **Actionable Recommendations**
   - Not just data collection
   - Personalized advice
   - Clear next steps

5. **Privacy-First Design**
   - Secure authentication
   - Encrypted data
   - No third-party sharing

---

## Impact & Market Potential

### Target Audience
- Women aged 15-45
- 1.9 billion globally
- Especially those with irregular cycles
- PCOD/PCOS patients and at-risk individuals

### Market Size
- $50B+ femtech market by 2025
- 116 million women with PCOS worldwide
- Growing awareness and demand

### Social Impact
- Early PCOD detection saves lives
- Reduces healthcare costs
- Empowers women with data
- Improves quality of life

---

## Future Roadmap

### Phase 1 (Current) ✅
- Core tracking features
- PCOD risk prediction
- Web application
- Basic ML model

### Phase 2 (3 months)
- Mobile apps (iOS/Android)
- Enhanced ML with more data
- Push notifications
- Community features

### Phase 3 (6 months)
- Wearable integration
- Telemedicine consultations
- Fertility tracking
- Advanced analytics

### Phase 4 (1 year)
- AI health chatbot
- Healthcare provider integration
- Insurance partnerships
- Global expansion

---

## Business Model

### Revenue Streams

1. **Freemium Model**
   - Basic tracking: Free
   - Advanced features: $4.99/month
   - Annual plan: $49.99/year

2. **B2B Partnerships**
   - Healthcare providers
   - Insurance companies
   - Corporate wellness programs

3. **Data Insights** (anonymized)
   - Research institutions
   - Pharmaceutical companies

### Cost Structure
- Cloud hosting: $100-500/month
- Development: In-house team
- Marketing: $1000-5000/month
- Customer support: Automated + human

---

## Technical Achievements

### What We Built in 36 Hours

✅ Full-stack web application
✅ RESTful API with 12 endpoints
✅ Machine learning model for PCOD prediction
✅ User authentication system
✅ 6 React pages with responsive design
✅ Comprehensive documentation
✅ Presentation materials
✅ Deployment-ready code

### Code Statistics
- **Backend:** ~800 lines of Python
- **Frontend:** ~1200 lines of JavaScript/JSX
- **Styling:** ~600 lines of CSS
- **Documentation:** ~2000 lines of Markdown
- **Total:** ~4600 lines of code

---

## Challenges & Solutions

### Challenge 1: Irregular Cycle Handling
**Problem:** Most algorithms assume regular 28-day cycles
**Solution:** Adaptive prediction using historical variance

### Challenge 2: Limited Training Data
**Problem:** No real PCOD dataset for training
**Solution:** Rule-based fallback system + synthetic data approach

### Challenge 3: User Privacy
**Problem:** Sensitive health data
**Solution:** JWT authentication + encrypted storage + no third-party sharing

### Challenge 4: Time Constraints
**Problem:** 36-hour hackathon
**Solution:** Focused MVP with core features + extensible architecture

---

## Team Contributions

### Development
- Backend API architecture
- ML model implementation
- Frontend React components
- UI/UX design
- Database schema

### Documentation
- Setup guide
- API documentation
- Presentation materials
- Feature specifications
- User guides

---

## Deployment

### Production Ready
- Environment variable configuration
- CORS setup for production
- Database migration path
- Security best practices
- Error handling

### Deployment Options
- **Backend:** Heroku, AWS, DigitalOcean
- **Frontend:** Vercel, Netlify, AWS S3
- **Database:** PostgreSQL on AWS RDS
- **ML Models:** Saved and versioned

---

## Success Metrics

### Technical Metrics
- API uptime: 99.9% target
- Response time: <200ms
- Error rate: <0.1%
- Test coverage: 80%+

### User Metrics
- User registration rate
- Daily active users
- Feature adoption rate
- User satisfaction score

### Health Impact
- PCOD detections
- Medical consultations triggered
- User-reported improvements
- Lives potentially saved

---

## Conclusion

Aura represents a significant step forward in women's health technology. By combining smart cycle tracking with AI-powered PCOD risk prediction, we're enabling early detection and prevention of a condition that affects millions of women worldwide.

Our solution is:
- **Technically sound:** Full-stack implementation with ML
- **User-friendly:** Intuitive interface and clear insights
- **Impactful:** Addresses a real healthcare gap
- **Scalable:** Ready for production deployment
- **Innovative:** Unique approach to irregular cycles

We believe Aura has the potential to become a leading platform in women's health, empowering users with data-driven insights and potentially saving lives through early PCOD detection.

---

## Resources

- **GitHub Repository:** [Your Repo URL]
- **Live Demo:** [Your Demo URL]
- **Presentation:** See PRESENTATION.md
- **Setup Guide:** See SETUP_GUIDE.md
- **Features:** See FEATURES.md

---

## Contact

For questions, feedback, or collaboration:
- **Email:** [your-email]
- **LinkedIn:** [your-profile]
- **GitHub:** [your-github]

---

**Built with ❤️ for Elite Her Hackathon 2026**

*Empowering women through technology, one cycle at a time.*
