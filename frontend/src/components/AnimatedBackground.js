import React from 'react';

export function AnimatedBackground() {
  return (
    <div className="animated-background">
      {/* Soft gradient orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      
      {/* Subtle dot grid pattern */}
      <div className="dot-grid"></div>
      
      {/* Flowing wave lines */}
      <svg className="wave-lines" viewBox="0 0 1200 600" preserveAspectRatio="none">
        <path d="M0,300 Q300,200 600,300 T1200,300" className="wave-path wave-1" />
        <path d="M0,350 Q300,250 600,350 T1200,350" className="wave-path wave-2" />
      </svg>
    </div>
  );
}
