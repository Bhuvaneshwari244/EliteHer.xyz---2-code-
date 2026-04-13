import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Calendar, Activity, AlertCircle, TrendingUp, Heart, Menu, X, CalendarDays, BookOpen, Stethoscope, Settings, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { path: '/dashboard', icon: Home, label: t('nav.dashboard') },
    { path: '/calendar', icon: CalendarDays, label: t('nav.calendar') },
    { path: '/cycles', icon: Calendar, label: t('nav.cycles') },
    { path: '/symptoms', icon: Activity, label: t('nav.symptoms') },
    { path: '/journal', icon: BookOpen, label: t('nav.journal') },
    { path: '/doctor-consultation', icon: Stethoscope, label: t('nav.doctors') },
    { path: '/pcod-assessment', icon: AlertCircle, label: t('nav.pcod') },
    { path: '/health-insights', icon: TrendingUp, label: t('nav.insights') },
    { path: '/wellness-hub', icon: Heart, label: t('nav.wellness') },
    { path: '/advanced-features', icon: Sparkles, label: t('nav.advanced') },
    { path: '/settings', icon: Settings, label: t('nav.settings') }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Navigation Bar */}
      <nav className={`navigation-bar ${isOpen ? 'open' : ''}`}>
        <div className="nav-items">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="nav-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

export default Navigation;
