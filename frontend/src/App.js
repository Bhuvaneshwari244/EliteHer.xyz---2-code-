import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CycleTracker from './pages/CycleTracker';
import SymptomLogger from './pages/SymptomLogger';
import PCODAssessment from './pages/PCODAssessment';
import HealthInsightsPage from './pages/HealthInsightsPage';
import WellnessHub from './pages/WellnessHub';
import CalendarView from './pages/CalendarView';
import Journal from './pages/Journal';
import DoctorConsultation from './pages/DoctorConsultation';
import Settings from './pages/Settings';
import AdvancedFeatures from './pages/AdvancedFeatures';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
              <Route path="/register" element={<Register setAuth={setIsAuthenticated} />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/cycles" element={
              <ProtectedRoute>
                <CycleTracker />
              </ProtectedRoute>
            } />
            <Route path="/symptoms" element={
              <ProtectedRoute>
                <SymptomLogger />
              </ProtectedRoute>
            } />
            <Route path="/pcod-assessment" element={
              <ProtectedRoute>
                <PCODAssessment />
              </ProtectedRoute>
            } />
            <Route path="/health-insights" element={
              <ProtectedRoute>
                <HealthInsightsPage />
              </ProtectedRoute>
            } />
            <Route path="/wellness-hub" element={
              <ProtectedRoute>
                <WellnessHub />
              </ProtectedRoute>
            } />
            <Route path="/calendar" element={
              <ProtectedRoute>
                <CalendarView />
              </ProtectedRoute>
            } />
            <Route path="/journal" element={
              <ProtectedRoute>
                <Journal />
              </ProtectedRoute>
            } />
            <Route path="/doctor-consultation" element={
              <ProtectedRoute>
                <DoctorConsultation />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/advanced-features" element={
              <ProtectedRoute>
                <AdvancedFeatures />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
