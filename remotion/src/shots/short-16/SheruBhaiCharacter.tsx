import React from 'react';
import { interpolate, spring, useCurrentFrame } from 'remotion';

interface SheruBhaiProps {
  scale?: number;
  glassesDown?: boolean;
  withThrone?: boolean;
  mouthOpen?: boolean;
}

export const SheruBhaiCharacter: React.FC<SheruBhaiProps> = ({
  scale = 1,
  glassesDown = true,
  mouthOpen = false,
}) => {
  const frame = useCurrentFrame();

  // Subtle breathing and swagger sway
  const breathe = Math.sin(frame * 0.12) * 6;
  const sway = Math.sin(frame * 0.08) * 1.5;

  // Sunglasses spring drop
  const glassesProgress = spring({
    frame,
    fps: 30,
    config: { damping: 12, stiffness: 100 },
  });
  const glassesY = glassesDown ? interpolate(glassesProgress, [0, 1], [-180, 0]) : -180;

  // Gold chain sparkle
  const sparklePhase = (frame % 45) / 45;
  const sparkleScale = Math.sin(sparklePhase * Math.PI);

  return (
    <div
      style={{
        width: 600,
        height: 750,
        position: 'relative',
        transform: `scale(${scale}) rotate(${sway}deg) translateY(${breathe}px)`,
        transformOrigin: 'bottom center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <svg
        viewBox="0 0 600 750"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        <defs>
          {/* Gold mane gradients */}
          <radialGradient id="maneGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="60%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#78350F" />
          </radialGradient>
          <linearGradient id="faceGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          {/* White suit gradient */}
          <linearGradient id="suitGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>

          {/* Gold chain gradient */}
          <linearGradient id="chainGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="25%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#D97706" />
            <stop offset="75%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Sunglasses glass gradient */}
          <linearGradient id="lensGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="70%" stopColor="#090C10" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>

          {/* Soft drop shadow */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#000000" floodOpacity="0.55" />
          </filter>
          <filter id="goldGlow">
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#F59E0B" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* 1. LION'S MAJESTIC GOLDEN MANE */}
        <g id="mane" filter="url(#shadow)">
          {/* Main mane volume */}
          <path
            d="M 300 60
               C 180 50, 70 140, 70 270
               C 70 380, 110 470, 190 520
               C 210 535, 250 545, 300 545
               C 350 545, 390 535, 410 520
               C 490 470, 530 380, 530 270
               C 530 140, 420 50, 300 60 Z"
            fill="url(#maneGrad)"
          />
          {/* Outer Mane Tufts for ferocious king aura */}
          <path
            d="M 120 180 L 50 160 L 95 230 L 40 270 L 90 320 L 50 380 L 120 410 L 90 460 L 170 480
               L 160 540 L 230 550 L 260 590 L 300 560 L 340 590 L 370 550 L 440 540 L 430 480
               L 510 460 L 480 410 L 550 380 L 510 320 L 560 270 L 505 230 L 550 160 L 480 180
               L 470 100 L 400 120 L 370 60 L 300 80 L 230 60 L 200 120 L 130 100 Z"
            fill="#B45309"
            opacity="0.85"
          />
          <path
            d="M 140 200 L 80 190 L 120 250 L 70 290 L 115 340 L 80 390 L 140 420 L 120 460 L 190 470
               L 190 520 L 250 530 L 280 560 L 300 535 L 320 560 L 350 530 L 410 520 L 410 470
               L 480 460 L 460 420 L 520 390 L 485 340 L 530 290 L 480 250 L 520 190 L 460 200 Z"
            fill="#D97706"
          />
        </g>

        {/* 2. EARS */}
        <g id="ears">
          {/* Left ear */}
          <path d="M 150 170 C 130 120, 180 80, 220 120 Z" fill="#D97706" />
          <path d="M 160 160 C 150 135, 180 105, 205 130 Z" fill="#78350F" />
          {/* Right ear */}
          <path d="M 450 170 C 470 120, 420 80, 380 120 Z" fill="#D97706" />
          <path d="M 440 160 C 450 135, 420 105, 395 130 Z" fill="#78350F" />
        </g>

        {/* 3. LION HEAD & FACE */}
        <g id="head">
          <ellipse cx="300" cy="300" rx="145" ry="165" fill="url(#faceGrad)" />
          {/* Forehead furrow / regal markings */}
          <path d="M 280 190 L 300 230 L 320 190" stroke="#B45309" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M 270 215 L 300 245 L 330 215" stroke="#B45309" strokeWidth="5" strokeLinecap="round" fill="none" />

          {/* Fierce eyes behind sunglasses */}
          <ellipse cx="235" cy="275" rx="20" ry="14" fill="#FEF08A" />
          <circle cx="235" cy="275" r="8" fill="#1E293B" />
          <ellipse cx="365" cy="275" rx="20" ry="14" fill="#FEF08A" />
          <circle cx="365" cy="275" r="8" fill="#1E293B" />

          {/* Muzzle */}
          <ellipse cx="300" cy="370" rx="65" ry="50" fill="#FEF08A" />
          {/* Nose */}
          <path
            d="M 278 335 C 290 330, 310 330, 322 335 C 328 350, 310 365, 300 368 C 290 365, 272 350, 278 335 Z"
            fill="#451A03"
          />
          {/* Mouth line */}
          <path
            d={mouthOpen ? 'M 285 378 Q 300 410 315 378' : 'M 282 378 Q 300 395 318 378'}
            stroke="#451A03"
            strokeWidth="5"
            fill={mouthOpen ? '#991B1B' : 'none'}
            strokeLinecap="round"
          />

          {/* Whiskers */}
          <line x1="250" y1="365" x2="160" y2="350" stroke="#78350F" strokeWidth="3" opacity="0.6" />
          <line x1="250" y1="375" x2="155" y2="380" stroke="#78350F" strokeWidth="3" opacity="0.6" />
          <line x1="350" y1="365" x2="440" y2="350" stroke="#78350F" strokeWidth="3" opacity="0.6" />
          <line x1="350" y1="375" x2="445" y2="380" stroke="#78350F" strokeWidth="3" opacity="0.6" />
        </g>

        {/* 4. PRISTINE WHITE 3-PIECE TUXEDO / SUIT */}
        <g id="suit" filter="url(#shadow)">
          {/* Torso / Inner Vest */}
          <path d="M 190 490 L 410 490 L 440 750 L 160 750 Z" fill="#F1F5F9" />
          {/* Crisp Black Silk Tie */}
          <path d="M 288 475 L 312 475 L 318 570 L 300 610 L 282 570 Z" fill="#0F172A" />
          {/* Gold Tie Pin */}
          <circle cx="300" cy="520" r="5" fill="#F59E0B" />

          {/* White Suit Jacket Left Lapel */}
          <path
            d="M 170 480 L 265 480 L 295 640 L 190 750 L 130 570 Z"
            fill="url(#suitGrad)"
            stroke="#CBD5E1"
            strokeWidth="3"
          />
          {/* White Suit Jacket Right Lapel */}
          <path
            d="M 430 480 L 335 480 L 305 640 L 410 750 L 470 570 Z"
            fill="url(#suitGrad)"
            stroke="#CBD5E1"
            strokeWidth="3"
          />

          {/* Silk Lapel Trims in Rich Charcoal */}
          <path d="M 205 480 L 275 610" stroke="#090C10" strokeWidth="6" strokeLinecap="round" />
          <path d="M 395 480 L 325 610" stroke="#090C10" strokeWidth="6" strokeLinecap="round" />

          {/* Gold Pocket Square */}
          <polygon points="210,560 230,545 238,565 218,575" fill="#F59E0B" filter="url(#goldGlow)" />

          {/* Gold Suit Buttons */}
          <circle cx="300" cy="650" r="9" fill="url(#chainGrad)" filter="url(#goldGlow)" />
          <circle cx="300" cy="695" r="9" fill="url(#chainGrad)" filter="url(#goldGlow)" />
        </g>

        {/* 5. THICK CHUNKY CUBAN GOLD CHAIN & MEDALLION */}
        <g id="gold-chain" filter="url(#goldGlow)">
          {/* Chain links hanging on the chest */}
          <path
            d="M 215 480 Q 300 580 385 480"
            stroke="url(#chainGrad)"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="16 6"
          />
          {/* Huge Gold Medallion */}
          <circle cx="300" cy="555" r="28" fill="url(#chainGrad)" stroke="#B45309" strokeWidth="4" />
          {/* Lion or Dollar symbol inside medallion */}
          <text
            x="300"
            y="566"
            textAnchor="middle"
            fontSize="26"
            fontWeight="bold"
            fill="#78350F"
            fontFamily="Arial Black, sans-serif"
          >
            ₹
          </text>
          {/* Diamond Sparkle animation */}
          {sparkleScale > 0.1 && (
            <g transform={`translate(${318}, ${540}) scale(${sparkleScale})`}>
              <path d="M 0 -14 L 4 -4 L 14 0 L 4 4 L 0 14 L -4 4 L -14 0 L -4 -4 Z" fill="#FFFFFF" />
            </g>
          )}
        </g>

        {/* 6. ICONIC AVIATOR SUNGLASSES (Spring Drop Down) */}
        <g id="sunglasses" transform={`translate(0, ${glassesY})`} filter="url(#shadow)">
          {/* Bridge */}
          <path d="M 270 270 Q 300 260 330 270" stroke="#F59E0B" strokeWidth="6" fill="none" />
          <line x1="268" y1="262" x2="332" y2="262" stroke="#F59E0B" strokeWidth="5" />

          {/* Left Aviator Lens */}
          <path
            d="M 205 260 C 200 250, 270 250, 275 260 C 280 295, 260 320, 235 320 C 210 320, 200 295, 205 260 Z"
            fill="url(#lensGrad)"
            stroke="#F59E0B"
            strokeWidth="6"
          />
          {/* Left Lens Glass Sheen reflection */}
          <path
            d="M 216 265 L 235 265 L 222 312 L 210 312 Z"
            fill="rgba(255, 255, 255, 0.4)"
          />

          {/* Right Aviator Lens */}
          <path
            d="M 325 260 C 320 250, 390 250, 395 260 C 400 295, 380 320, 355 320 C 330 320, 320 295, 325 260 Z"
            fill="url(#lensGrad)"
            stroke="#F59E0B"
            strokeWidth="6"
          />
          {/* Right Lens Glass Sheen reflection */}
          <path
            d="M 336 265 L 355 265 L 342 312 L 330 312 Z"
            fill="rgba(255, 255, 255, 0.4)"
          />

          {/* Gold frames highlight */}
          <circle cx="205" cy="260" r="4" fill="#FEF08A" />
          <circle cx="395" cy="260" r="4" fill="#FEF08A" />
        </g>
      </svg>
    </div>
  );
};
