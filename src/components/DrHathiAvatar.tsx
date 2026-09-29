import React from 'react';

interface DrHathiAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  withGlow?: boolean;
}

export const DrHathiAvatar: React.FC<DrHathiAvatarProps> = ({
  size = 'md',
  className = '',
  withGlow = true
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
    hero: 'w-44 h-44 sm:w-56 sm:h-56'
  };

  return (
    <div className={`relative inline-block ${sizeMap[size]} ${className}`}>
      {withGlow && (
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse-glow" />
      )}
      
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full relative z-10 drop-shadow-[0_8px_16px_rgba(16,185,129,0.25)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="hathiSkin" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#F9D7B8" />
            <stop offset="85%" stopColor="#DF9C75" />
            <stop offset="100%" stopColor="#B36A48" />
          </radialGradient>
          <linearGradient id="coatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#17241C" />
            <stop offset="50%" stopColor="#0B130E" />
            <stop offset="100%" stopColor="#050806" />
          </linearGradient>
          <linearGradient id="stethoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <radialGradient id="lensReflect" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#67E8F9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Aura Ring */}
        <circle cx="100" cy="100" r="92" stroke="#10B981" strokeWidth="2" strokeDasharray="6 4" opacity="0.4" />
        <circle cx="100" cy="100" r="96" stroke="#06B6D4" strokeWidth="1" opacity="0.25" />

        {/* Doctor Coat (Broad, reassuring shoulders) */}
        <path
          d="M32 195 C32 145 60 130 100 130 C140 130 168 145 168 195 Z"
          fill="url(#coatGrad)"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeOpacity="0.4"
        />

        {/* Coat Lapels & Golden Trim */}
        <path d="M78 132 L96 175 L82 195" stroke="#34D399" strokeWidth="1.5" opacity="0.6" />
        <path d="M122 132 L104 175 L118 195" stroke="#34D399" strokeWidth="1.5" opacity="0.6" />
        
        {/* Medical Shirt & Suspender hint */}
        <polygon points="90,132 110,132 105,170 95,170" fill="#E2E8F0" opacity="0.85" />
        <line x1="72" y1="140" x2="72" y2="195" stroke="#F59E0B" strokeWidth="3" opacity="0.75" />
        <line x1="128" y1="140" x2="128" y2="195" stroke="#F59E0B" strokeWidth="3" opacity="0.75" />

        {/* Head / Face (Round, jovial, trustworthy) */}
        <ellipse cx="100" cy="85" rx="46" ry="48" fill="url(#hathiSkin)" />

        {/* Neck */}
        <rect x="88" y="120" width="24" height="16" rx="4" fill="#DF9C75" />

        {/* Classic Hairline */}
        <path
          d="M56 75 C56 46 80 34 100 34 C120 34 144 46 144 75 C144 82 140 88 138 78 C128 54 116 52 100 52 C84 52 72 54 62 78 C60 88 56 82 56 75 Z"
          fill="#1C1917"
        />

        {/* Round Spectacles (Dr. Hathi's iconic look) */}
        {/* Left lens */}
        <circle cx="80" cy="84" r="15" stroke="#F59E0B" strokeWidth="2.5" fill="url(#lensReflect)" />
        {/* Right lens */}
        <circle cx="120" cy="84" r="15" stroke="#F59E0B" strokeWidth="2.5" fill="url(#lensReflect)" />
        {/* Bridge */}
        <path d="M95 84 Q100 81 105 84" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
        {/* Temple arms */}
        <line x1="65" y1="84" x2="55" y2="82" stroke="#F59E0B" strokeWidth="2" />
        <line x1="135" y1="84" x2="145" y2="82" stroke="#F59E0B" strokeWidth="2" />

        {/* Eyes inside lenses */}
        <ellipse cx="80" cy="84" rx="4.5" ry="5.5" fill="#1E293B" />
        <ellipse cx="120" cy="84" rx="4.5" ry="5.5" fill="#1E293B" />
        <circle cx="78.5" cy="82.5" r="1.5" fill="#FFFFFF" />
        <circle cx="118.5" cy="82.5" r="1.5" fill="#FFFFFF" />

        {/* Friendly Eyebrows */}
        <path d="M68 68 Q80 63 90 68" stroke="#292524" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M110 68 Q120 63 132 68" stroke="#292524" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* Nose */}
        <path d="M98 86 Q100 95 96 98 Q100 101 104 98" stroke="#B36A48" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Warm Smiling Mouth with Moustache */}
        <path
          d="M84 102 Q100 99 116 102 Q110 108 100 107 Q90 108 84 102 Z"
          fill="#292524"
        />
        <path d="M88 111 Q100 119 112 111" stroke="#881337" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Stethoscope */}
        <path
          d="M66 142 C66 175 88 185 100 185 C112 185 134 175 134 142"
          stroke="url(#stethoGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Chestpiece with Glowing Supernatural Resonator */}
        <circle cx="100" cy="186" r="8" fill="#10B981" stroke="#D1FAE5" strokeWidth="2" />
        <circle cx="100" cy="186" r="3" fill="#FFFFFF" />

        {/* Floating Ethereal Particles */}
        <circle cx="38" cy="70" r="2" fill="#34D399" opacity="0.8">
          <animate attributeName="cy" values="70;64;70" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="165" cy="90" r="2.5" fill="#06B6D4" opacity="0.7">
          <animate attributeName="cy" values="90;82;90" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.2;0.7" dur="4s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};
