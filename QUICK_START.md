# 🚀 Aura - Quick Start Guide

## Current Status: ✅ RUNNING

Both backend and frontend are currently running and functional!

---

## 🌐 Access the Application

### Frontend (React UI)
**URL:** http://localhost:3000

Open your browser and visit the above URL to access the Aura application.

### Backend API
**URL:** http://localhost:5000
**Health Check:** http://localhost:5000/api/health

---

## 🧪 Test the Application

### Option 1: Use the Web Interface
1. Open http://localhost:3000 in your browser
2. Click "Register here" to create an account
3. Fill in your details and register
4. Start tracking cycles and symptoms
5. Get your PCOD risk assessment

### Option 2: Run API Tests
```powershell
.\test_api.ps1
```

This will test all backend endpoints and show you the results.

---

## 📝 Quick Demo Flow

### 1. Register a User
- Name: Sarah Johnson
- Email: sarah@example.com
- Password: secure123
- Age: 26

### 2. Add Cycles
Add 3-4 menstrual cycles with different dates:
- Cycle 1: 2026-01-15 to 2026-01-20 (medium flow)
- Cycle 2: 2026-02-18 to 2026-02-23 (heavy flow)
- Cycle 3: 2026-03-22 to 2026-03-27 (light flow)

### 3. Log Symptoms
Track daily symptoms:
- Mood (happy, sad, anxious, irritable, neutral)
- Pain level (0-10)
- Fatigue (0-10)
- Symptoms (cramps, headache, acne, bloating)
- Notes

### 4. View Statistics
- Average cycle length
- Irregularity score
- Next period prediction

### 5. Get PCOD Assessment
- Auto assessment from your data
- OR manual assessment with health parameters
- View risk level and recommendations

---

## 🛑 Stop the Servers

If you need to stop the servers:

### Stop Backend:
Press `Ctrl+C` in the backend terminal

### Stop Frontend:
Press `Ctrl+C` in the frontend terminal

---

## 🔄 Restart the Servers

### Backend:
```powershell
cd backend
py app.py
```

### Frontend:
```powershell
cd frontend
npm start
```

---

## 🐛 Troubleshooting

### Backend not responding?
1. Check if it's running: http://localhost:5000/api/health
2. Restart: `cd backend && py app.py`

### Frontend not loading?
1. Check if it's running: http://localhost:3000
2. Restart: `cd frontend && npm start`

### Port already in use?
- Backend uses port 5000
- Frontend uses port 3000
- Make sure no other applications are using these ports

---

## 📊 Key Features to Demo

1. **Irregular Cycle Support**
   - Add cycles with varying lengths
   - See how the system adapts

2. **PCOD Risk Prediction**
   - Try manual assessment with high-risk values
   - See personalized recommendations

3. **Period Prediction**
   - Add multiple cycles
   - View predicted next period date

4. **Symptom Tracking**
   - Log daily symptoms
   - View symptom analysis

5. **Dashboard**
   - Overview of all health metrics
   - Quick access to features

---

## 🎯 API Endpoints Reference

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/profile

### Cycles
- POST /api/cycles
- GET /api/cycles
- GET /api/cycles/stats
- GET /api/cycles/predict-next

### Symptoms
- POST /api/symptoms
- GET /api/symptoms
- GET /api/symptoms/analysis

### Predictions
- POST /api/predictions/pcod-risk
- GET /api/predictions/pcod-risk/auto

---

## 📁 Project Structure

```
D:\EliteHer\
├── backend/          # Flask API (Running on port 5000)
│   ├── app.py
│   ├── models/
│   └── routes/
├── frontend/         # React App (Running on port 3000)
│   ├── src/
│   │   ├── pages/
│   │   └── services/
│   └── public/
└── test_api.ps1     # API test script
```

---

## ✅ Everything is Ready!

Your Aura application is fully functional and ready for:
- ✅ Demo presentation
- ✅ User testing
- ✅ Feature showcase
- ✅ Hackathon submission

**Enjoy exploring Aura!** 🌸
