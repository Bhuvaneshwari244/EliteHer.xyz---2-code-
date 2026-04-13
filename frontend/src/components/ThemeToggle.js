import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

export default ThemeToggle;
