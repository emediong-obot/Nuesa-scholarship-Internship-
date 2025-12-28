
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  variant?: 'full' | 'icon';
  id?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "", size = 40, variant = 'icon', id = 'main' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`} style={{ height: size }}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md transition-transform hover:scale-105 duration-300"
      >
        <defs>
          {/* Main Logo Colors */}
          <linearGradient id={`grad-${id}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FFA500" />
          </linearGradient>
          <linearGradient id={`grad-${id}-orange`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#C2410C" />
          </linearGradient>
          
          {/* Text Path for Circular Text */}
          <path id={`textPath-${id}`} d="M 20, 50 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" />
        </defs>

        {/* Outer Gear Teeth */}
        <g stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round">
          {[...Array(14)].map((_, i) => (
            <line 
              key={i} 
              x1="50" y1="5" x2="50" y2="12" 
              transform={`rotate(${i * (360 / 14)}, 50, 50)`} 
            />
          ))}
        </g>

        {/* Main Crest Circle */}
        <circle cx="50" cy="50" r="40" fill={`url(#grad-${id}-gold)`} stroke="#C2410C" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="34" stroke="#C2410C" strokeWidth="1" fill="transparent" />

        {/* Circular Association Text (Simulated) */}
        <text fontSize="4.5" fontWeight="900" fill="#C2410C" letterSpacing="0.2">
          <textPath href={`#textPath-${id}`} startOffset="50%" textAnchor="middle">
            NIGERIAN UNIVERSITIES ENGINEERING STUDENTS' ASSOCIATION
          </textPath>
        </text>

        {/* Engineering Equipment Symbol (Stylized Crane/Lift) */}
        <g transform="translate(28, 38) scale(0.45)">
          <rect x="0" y="45" width="100" height="12" rx="2" fill="#C2410C" />
          <rect x="15" y="5" width="12" height="50" fill="#C2410C" />
          <rect x="75" y="0" width="18" height="60" rx="3" fill="#C2410C" />
          <path d="M15 15 L75 10 L75 25 L15 30 Z" fill="#C2410C" opacity="0.9" />
          <circle cx="20" cy="72" r="10" fill="#C2410C" stroke="white" strokeWidth="2" />
          <circle cx="80" cy="72" r="10" fill="#C2410C" stroke="white" strokeWidth="2" />
          {/* Ladder detail */}
          {[...Array(5)].map((_, i) => (
            <rect key={i} x="78" y={10 + i * 8} width="12" height="3" fill="white" opacity="0.5" />
          ))}
        </g>

        {/* UNIUYO Chapter Text */}
        <text 
          x="50" 
          y="76" 
          textAnchor="middle" 
          fill="#065f46" 
          fontSize="4.5" 
          fontWeight="900"
          fontFamily="Inter, Arial"
        >
          UNIUYO CHAPTER
        </text>

        {/* Bottom Banner/Ribbon */}
        <path 
          d="M15 82 Q50 92 85 82 L88 95 Q50 105 12 95 Z" 
          fill="#FFD700" 
          stroke="#065f46" 
          strokeWidth="1"
        />
        
        {/* NUESA Text on Banner */}
        <text 
          x="50" 
          y="93" 
          textAnchor="middle" 
          fill="#065f46" 
          fontSize="10" 
          fontWeight="1000"
          fontFamily="Inter, Arial"
        >
          NUESA
        </text>
      </svg>
      
      {variant === 'full' && (
        <div className="flex flex-col leading-none">
          <span className="text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase">
            NUESA <span className="text-orange-500">SCHOLAS</span>
          </span>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 tracking-[0.2em] uppercase">
            UNIUYO CHAPTER Portal
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
