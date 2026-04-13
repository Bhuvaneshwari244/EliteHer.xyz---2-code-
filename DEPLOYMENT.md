# 🚀 Aura - Deployment Guide

Complete guide for deploying Aura to production.

---

## 📋 Pre-Deployment Checklist

### Security
- [ ] Change JWT_SECRET_KEY to strong random string
- [ ] Update CORS origins to production domains
- [ ] Enable HTTPS/SSL certificates
- [ ] Review and update all environment variables
- [ ] Remove debug mode from Flask
- [ ] Add rate limiting
- [ ] Implement input validation
- [ ] Set up logging and monitoring

### Code
- [ ] Run tests
- [ ] Check for console.log statements
- [ ] Optimize images and assets
- [ ] Minify CSS/JS
- [ ] Update API URLs
- [ ] Review error handling

### Database
- [ ] Set up PostgreSQL
- [ ] Create database schema
- [ ] Plan backup strategy
- [ ] Set up migrations

---

## 🌐 Option 1: Deploy to Heroku + Vercel

### Backend on Heroku

#### Step 1: Prepare Backend
```bash
cd backend

# Create Procfile
echo "web: gunicorn app:app" > Procfile

# Add gunicorn to requirements.txt
echo "gunicorn==21.2.0" >> requirements.txt

# Create runtime.txt (optional)
echo "python-3.11.0" > runtime.txt
```

#### Step 2: Initialize Git (if not already)
```bash
git init
git add .
git commit -m "Initial commit"
```

#### Step 3: Create Heroku App
```bash
# Install Heroku CLI first: https://devcenter.heroku.com/articles/heroku-cli

heroku login
heroku create aura-backend-api

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set JWT_SECRET_KEY="your-super-secret-production-key"
heroku config:set FLASK_ENV="production"
```

#### Step 4: Deploy
```bash
git push heroku main

# Check logs
heroku logs --tail

# Open app
heroku open
```

#### Step 5: Test Backend
```bash
curl https://aura-backend-api.herokuapp.com/api/health
```

### Frontend on Vercel

#### Step 1: Prepare Frontend
```bash
cd frontend

# Update .env for production
echo "REACT_APP_API_URL=https://aura-backend-api.herokuapp.com/api" > .env.production
```

#### Step 2: Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Follow prompts:
# - Set up and deploy: Yes
# - Which scope: Your account
# - Link to existing project: No
# - Project name: aura-frontend
# - Directory: ./
# - Override settings: No
```

#### Step 3: Configure Environment Variables
```bash
# In Vercel dashboard or CLI
vercel env add REACT_APP_API_URL production
# Enter: https://aura-backend-api.herokuapp.com/api
```

#### Step 4: Test Frontend
Visit your Vercel URL (e.g., https://aura-frontend.vercel.app)

---

## 🔷 Option 2: Deploy to AWS

### Backend on AWS Elastic Beanstalk

#### Step 1: Install EB CLI
```bash
pip install awsebcli
```

#### Step 2: Initialize EB
```bash
cd backend
eb init -p python-3.11 aura-backend --region us-east-1
```

#### Step 3: Create Environment
```bash
eb create aura-production

# Set environment variables
eb setenv JWT_SECRET_KEY="your-secret-key"
eb setenv FLASK_ENV="production"
```

#### Step 4: Deploy
```bash
eb deploy
eb open
```

### Frontend on AWS S3 + CloudFront

#### Step 1: Build Frontend
```bash
cd frontend
npm run build
```

#### Step 2: Create S3 Bucket
```bash
aws s3 mb s3://aura-frontend
aws s3 website s3://aura-frontend --index-document index.html
```

#### Step 3: Upload Build
```bash
aws s3 sync build/ s3://aura-frontend --acl public-read
```

#### Step 4: Set Up CloudFront (Optional)
- Create CloudFront distribution
- Point to S3 bucket
- Configure SSL certificate
- Set up custom domain

---

## 🐳 Option 3: Docker Deployment

### Create Dockerfiles

#### Backend Dockerfile
```dockerfile
# backend/Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
```

#### Frontend Dockerfile
```dockerfile
# frontend/Dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - JWT_SECRET_KEY=${JWT_SECRET_KEY}
      - DATABASE_URL=${DATABASE_URL}
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=aura
      - POSTGRES_USER=aura
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### Deploy with Docker
```bash
# Build and run
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## 🗄️ Database Setup

### PostgreSQL Migration

#### Step 1: Install PostgreSQL Adapter
```bash
pip install psycopg2-binary
```

#### Step 2: Create Database Models
```python
# backend/models/database.py
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    cycles = db.relationship('Cycle', backref='user', lazy=True)
    symptoms = db.relationship('Symptom', backref='user', lazy=True)

class Cycle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date)
    flow_intensity = db.Column(db.String(20))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Symptom(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    mood = db.Column(db.String(20))
    pain_level = db.Column(db.Integer)
    cramps = db.Column(db.Boolean, default=False)
    headache = db.Column(db.Boolean, default=False)
    fatigue = db.Column(db.Integer)
    acne = db.Column(db.Boolean, default=False)
    bloating = db.Column(db.Boolean, default=False)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
```

#### Step 3: Update app.py
```python
from models.database import db

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

with app.app_context():
    db.create_all()
```

#### Step 4: Run Migrations
```bash
# Create database
createdb aura_db

# Run app to create tables
python app.py
```

---

## 🔒 Security Hardening

### Backend Security

#### 1. Add Rate Limiting
```bash
pip install Flask-Limiter
```

```python
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"]
)

@app.route('/api/auth/login', methods=['POST'])
@limiter.limit("5 per minute")
def login():
    # ...
```

#### 2. Add Input Validation
```bash
pip install marshmallow
```

```python
from marshmallow import Schema, fields, validate

class UserSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=6))
    name = fields.Str(required=True)
    age = fields.Int(validate=validate.Range(min=10, max=100))
```

#### 3. Add HTTPS Redirect
```python
from flask_talisman import Talisman

Talisman(app, force_https=True)
```

#### 4. Update CORS for Production
```python
CORS(app, origins=[
    "https://aura-frontend.vercel.app",
    "https://yourdomain.com"
])
```

### Frontend Security

#### 1. Add Content Security Policy
```html
<!-- public/index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline';">
```

#### 2. Sanitize User Input
```bash
npm install dompurify
```

```javascript
import DOMPurify from 'dompurify';

const cleanNotes = DOMPurify.sanitize(userInput);
```

---

## 📊 Monitoring & Logging

### Backend Logging

```python
import logging
from logging.handlers import RotatingFileHandler

if not app.debug:
    file_handler = RotatingFileHandler('logs/aura.log', maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'
    ))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)
    app.logger.info('Aura startup')
```

### Error Tracking

#### Sentry Integration
```bash
pip install sentry-sdk[flask]
```

```python
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration

sentry_sdk.init(
    dsn="your-sentry-dsn",
    integrations=[FlaskIntegration()],
    traces_sample_rate=1.0
)
```

### Performance Monitoring

#### New Relic
```bash
pip install newrelic
newrelic-admin generate-config YOUR_LICENSE_KEY newrelic.ini
```

```bash
# Run with New Relic
NEW_RELIC_CONFIG_FILE=newrelic.ini newrelic-admin run-program gunicorn app:app
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.11
      
      - name: Install dependencies
        run: |
          cd backend
          pip install -r requirements.txt
      
      - name: Run tests
        run: |
          cd backend
          pytest

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "aura-backend-api"
          heroku_email: ${{secrets.HEROKU_EMAIL}}

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{secrets.VERCEL_TOKEN}}
          vercel-org-id: ${{secrets.ORG_ID}}
          vercel-project-id: ${{secrets.PROJECT_ID}}
          vercel-args: '--prod'
```

---

## 🧪 Testing Before Production

### Backend Tests
```bash
cd backend
pip install pytest pytest-flask

# Run tests
pytest tests/
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Load Testing
```bash
# Install Apache Bench
apt-get install apache2-utils

# Test API
ab -n 1000 -c 10 https://your-api.com/api/health
```

---

## 📈 Performance Optimization

### Backend
- Enable gzip compression
- Add Redis caching
- Use connection pooling
- Optimize database queries
- Add CDN for static files

### Frontend
- Enable code splitting
- Lazy load components
- Optimize images (WebP)
- Add service worker
- Enable browser caching

---

## 🔧 Troubleshooting

### Common Issues

**Issue: CORS errors in production**
```python
# Update CORS origins
CORS(app, origins=["https://yourdomain.com"])
```

**Issue: Database connection fails**
```python
# Check DATABASE_URL format
# PostgreSQL: postgresql://user:pass@host:port/db
```

**Issue: JWT token expires too quickly**
```python
# Increase token expiry
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30)
```

**Issue: Frontend can't reach backend**
```javascript
// Check API URL in .env.production
REACT_APP_API_URL=https://your-backend.com/api
```

---

## 📞 Post-Deployment

### Monitoring Checklist
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Configure error alerts (Sentry)
- [ ] Set up performance monitoring (New Relic)
- [ ] Enable database backups
- [ ] Set up SSL certificate auto-renewal
- [ ] Configure log rotation
- [ ] Set up analytics (Google Analytics)

### Maintenance
- Regular security updates
- Database backups (daily)
- Monitor error logs
- Review performance metrics
- Update dependencies monthly

---

## 🎉 Success!

Your Aura application is now live in production!

**Next Steps:**
1. Share the URL with users
2. Monitor performance and errors
3. Gather user feedback
4. Plan feature updates
5. Scale as needed

---

**Need help? Contact the team!**
