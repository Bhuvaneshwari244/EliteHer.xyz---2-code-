# 🔗 Connect Frontend to Backend

## Current Status
✅ Frontend is LIVE
❌ Backend connection issue (credentials invalid)

---

## 🎯 Quick Fix Steps

### Step 1: Find Your Backend URL

Go to your Vercel dashboard and find your backend deployment URL.
It should look like: `https://aura-backend-xxx.vercel.app`

### Step 2: Update Frontend Environment Variable

1. Go to Vercel Dashboard → **aura-frontend** project
2. Click **Settings** → **Environment Variables**
3. Find `REACT_APP_API_URL` variable
4. Update its value to: `https://YOUR-BACKEND-URL.vercel.app/api`
   
   Example: `https://aura-backend-abc123.vercel.app/api`

5. Click **Save**
6. Go to **Deployments** tab
7. Click **Redeploy** on the latest deployment

### Step 3: Verify Backend is Working

Visit your backend URL directly in browser:
- `https://YOUR-BACKEND-URL.vercel.app/`

You should see:
```json
{
  "message": "Aura API - Smart Period Tracking & PCOD Risk Prediction",
  "version": "1.0.0",
  "status": "running"
}
```

### Step 4: Test API Endpoints

Try these URLs in your browser:
- `https://YOUR-BACKEND-URL.vercel.app/api/health`
- `https://YOUR-BACKEND-URL.vercel.app/api`

Both should return JSON responses.

---

## 🐛 Common Issues & Solutions

### Issue 1: "Credentials Invalid" Error

**Cause**: Frontend can't reach backend OR backend URL is wrong

**Solution**:
1. Check browser console (F12) for errors
2. Look for the API URL being called
3. Make sure it matches your backend URL
4. Verify environment variable in Vercel

### Issue 2: CORS Error

**Cause**: Backend not allowing requests from frontend domain

**Solution**: Already fixed in the latest code! Just push to GitHub:
```bash
git add backend/app.py
git commit -m "Fix CORS for Vercel deployment"
git push origin main
```

Backend will auto-redeploy.

### Issue 3: 404 Not Found

**Cause**: API routes not working

**Solution**: Make sure backend environment variable is set:
- Go to Vercel → Backend Project → Settings → Environment Variables
- Add: `JWT_SECRET_KEY` = `your-secret-key-12345`

---

## 📋 Checklist

- [ ] Backend is deployed and accessible
- [ ] Backend URL is copied
- [ ] Frontend environment variable `REACT_APP_API_URL` is set correctly
- [ ] Frontend is redeployed after env variable change
- [ ] Backend CORS is configured (latest code pushed)
- [ ] Can access backend URL in browser
- [ ] Can register/login on frontend

---

## 🔍 How to Debug

### Check Frontend API URL:
1. Open your frontend in browser
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Try to register/login
5. Look at Network tab → See what URL is being called
6. Compare with your backend URL

### Check Backend Logs:
1. Go to Vercel Dashboard → Backend Project
2. Click Deployments → Latest deployment
3. Click "View Function Logs"
4. Look for errors

---

## ✅ Expected URLs

After correct setup:

**Frontend**: `https://aura-frontend-xxx.vercel.app`
- This is what users visit

**Backend**: `https://aura-backend-xxx.vercel.app`
- This is the API

**API Calls**: Frontend calls `https://aura-backend-xxx.vercel.app/api/auth/register`

---

## 🚀 Quick Test

After fixing, test registration:

1. Go to your frontend URL
2. Click "Register"
3. Fill in:
   - Email: test@example.com
   - Password: Test123!
4. Click Register
5. Should see success message and redirect to dashboard

If it works → ✅ Everything is connected!
If not → Check browser console for error messages

---

## 📞 Need Help?

Share these details:
1. Frontend URL
2. Backend URL
3. Error message from browser console (F12)
4. Screenshot of Network tab showing failed request
