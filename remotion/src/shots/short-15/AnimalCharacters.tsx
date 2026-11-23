import React from 'react';
import { useCurrentFrame } from 'remotion';

// =============================================================================
// SHIBA INU DOG (MILO)
// Warm golden-tan tones (#F59E0B, #D97706, #FFFBEB), wagging tail, talking mouth
// =============================================================================
export const ShibaDog: React.FC<{
  x: number;
  y: number;
  size?: number;
  isTalking?: boolean;
  isWaggingFast?: boolean;
}> = ({ x, y, size = 380, isTalking = false, isWaggingFast = false }) => {
  const frame = useCurrentFrame();

  // Gentle breathing / bobbing
  const bounceY = Math.sin(frame * 0.12) * 8;
  const isBlinking = frame % 75 < 4;

  // Tail wagging animation
  const wagSpeed = isWaggingFast ? 0.35 : 0.2;
  const tailAngle = Math.sin(frame * wagSpeed) * (isWaggingFast ? 28 : 16);

  // Talking mouth cycle
  const mouthOpen = isTalking ? (Math.floor(frame / 4) % 2 === 0 ? 12 : 2) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) translateY(${bounceY}px)`,
        filter: 'drop-shadow(0 20px 35px rgba(0, 0, 0, 0.35))',
      }}
    >
      <svg width={size} height={size * 1.1} viewBox="0 0 240 260">
        <defs>
          {/* Shiba Coat Radial 3D Gradient */}
          <radialGradient id="shibaGold" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="40%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </radialGradient>

          {/* White Snout & Cheek Cream */}
          <radialGradient id="shibaCream" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#FFFBEB" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </radialGradient>

          {/* Rosy Cheek */}
          <radialGradient id="shibaCheek" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F87171" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#F87171" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Tail (Curled Shiba Tail behind body) */}
        <g transform={`translate(195, 175) rotate(${tailAngle})`}>
          <path
            d="M0,0 C20,-30 45,-25 40,-5 C35,15 15,10 0,0"
            fill="url(#shibaGold)"
            stroke="#B45309"
            strokeWidth="3.5"
          />
          <path d="M28,-18 C32,-10 30,-5 20,-3" fill="#FFFBEB" />
        </g>

        {/* Body */}
        <ellipse cx="120" cy="185" rx="72" ry="55" fill="url(#shibaGold)" stroke="#B45309" strokeWidth="4" />
        {/* Cream Chest / Belly */}
        <ellipse cx="120" cy="192" rx="42" ry="38" fill="url(#shibaCream)" />

        {/* Paws */}
        <ellipse cx="85" cy="225" rx="18" ry="12" fill="url(#shibaCream)" stroke="#B45309" strokeWidth="3" />
        <ellipse cx="155" cy="225" rx="18" ry="12" fill="url(#shibaCream)" stroke="#B45309" strokeWidth="3" />

        {/* Head */}
        <g transform="translate(0, 5)">
          {/* Left Ear */}
          <polygon
            points="65,30 40,85 85,80"
            fill="url(#shibaGold)"
            stroke="#B45309"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <polygon points="63,40 48,80 78,76" fill="#FEF3C7" />

          {/* Right Ear */}
          <polygon
            points="175,30 155,80 200,85"
            fill="url(#shibaGold)"
            stroke="#B45309"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <polygon points="177,40 162,76 192,80" fill="#FEF3C7" />

          {/* Face Base */}
          <ellipse cx="120" cy="95" rx="65" ry="55" fill="url(#shibaGold)" stroke="#B45309" strokeWidth="4" />

          {/* Cream Cheek Patches */}
          <ellipse cx="82" cy="105" rx="28" ry="24" fill="url(#shibaCream)" />
          <ellipse cx="158" cy="105" rx="28" ry="24" fill="url(#shibaCream)" />

          {/* Eyebrow dots (Signature Shiba Tan Marks) */}
          <ellipse cx="92" cy="72" rx="6.5" ry="4.5" fill="#FFFBEB" />
          <ellipse cx="148" cy="72" rx="6.5" ry="4.5" fill="#FFFBEB" />

          {/* Cheerful Blush */}
          <circle cx="75" cy="112" r="14" fill="url(#shibaCheek)" />
          <circle cx="165" cy="112" r="14" fill="url(#shibaCheek)" />

          {/* Eyes */}
          {isBlinking ? (
            <g stroke="#1F2937" strokeWidth="4" strokeLinecap="round">
              <path d="M 84 94 Q 94 99 104 94" />
              <path d="M 136 94 Q 146 99 156 94" />
            </g>
          ) : (
            <g>
              <ellipse cx="94" cy="94" rx="9" ry="11" fill="#1F2937" />
              <circle cx="91" cy="90" r="3.5" fill="#FFFFFF" />
              <ellipse cx="146" cy="94" rx="9" ry="11" fill="#1F2937" />
              <circle cx="143" cy="90" r="3.5" fill="#FFFFFF" />
            </g>
          )}

          {/* Snout Cream */}
          <ellipse cx="120" cy="115" rx="24" ry="18" fill="url(#shibaCream)" stroke="#D97706" strokeWidth="2" />

          {/* Nose */}
          <polygon points="120,114 112,106 128,106" fill="#1F2937" />

          {/* Mouth / Smile / Talking */}
          {mouthOpen > 0 ? (
            <ellipse cx="120" cy={122 + mouthOpen / 2} rx={mouthOpen} ry={mouthOpen * 0.9} fill="#E11D48" stroke="#1F2937" strokeWidth="3" />
          ) : (
            <path d="M 112 118 Q 120 125 120 120 Q 120 125 128 118" fill="none" stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round" />
          )}
        </g>
      </svg>
    </div>
  );
};

// =============================================================================
// TABBY CAT (LUNA)
// Warm terracotta orange tones (#EA580C, #F97316), twitching ears, sinuous tail
// =============================================================================
export const TabbyCat: React.FC<{
  x: number;
  y: number;
  size?: number;
  isTalking?: boolean;
  isTailFlicking?: boolean;
}> = ({ x, y, size = 360, isTalking = false, isTailFlicking = false }) => {
  const frame = useCurrentFrame();

  const bounceY = Math.sin(frame * 0.14 + 1) * 7;
  const isBlinking = frame % 80 < 5;

  // Tail animation
  const flickSpeed = isTailFlicking ? 0.32 : 0.16;
  const tailAngle = Math.sin(frame * flickSpeed) * (isTailFlicking ? 32 : 14);

  // Talking mouth
  const mouthOpen = isTalking ? (Math.floor(frame / 4) % 2 === 0 ? 10 : 2) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) translateY(${bounceY}px)`,
        filter: 'drop-shadow(0 20px 35px rgba(0, 0, 0, 0.35))',
      }}
    >
      <svg width={size} height={size * 1.1} viewBox="0 0 240 260">
        <defs>
          {/* Orange Tabby Radial Gradient */}
          <radialGradient id="catOrange" cx="42%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FDBA74" />
            <stop offset="45%" stopColor="#FB923C" />
            <stop offset="85%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </radialGradient>

          {/* Soft Cream Muzzle */}
          <radialGradient id="catCream" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="80%" stopColor="#FFF7ED" />
            <stop offset="100%" stopColor="#FED7AA" />
          </radialGradient>

          <radialGradient id="catCheek" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FB7185" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Tail (Long graceful cat tail) */}
        <g transform={`translate(45, 185) rotate(${tailAngle})`}>
          <path
            d="M0,0 C-25,10 -45,-15 -35,-45 C-30,-60 -15,-55 -22,-35 C-28,-15 5,-5 0,0"
            fill="url(#catOrange)"
            stroke="#9A3412"
            strokeWidth="3.5"
          />
        </g>

        {/* Body */}
        <ellipse cx="120" cy="185" rx="64" ry="52" fill="url(#catOrange)" stroke="#9A3412" strokeWidth="4" />
        <ellipse cx="120" cy="190" rx="34" ry="36" fill="url(#catCream)" />

        {/* Paws */}
        <ellipse cx="90" cy="222" rx="16" ry="11" fill="url(#catCream)" stroke="#9A3412" strokeWidth="3" />
        <ellipse cx="150" cy="222" rx="16" ry="11" fill="url(#catCream)" stroke="#9A3412" strokeWidth="3" />

        {/* Head */}
        <g transform="translate(0, 10)">
          {/* Left Ear */}
          <polygon
            points="62,25 42,75 82,70"
            fill="url(#catOrange)"
            stroke="#9A3412"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <polygon points="60,34 48,70 76,66" fill="#FECDD3" />

          {/* Right Ear */}
          <polygon
            points="178,25 158,70 198,75"
            fill="url(#catOrange)"
            stroke="#9A3412"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <polygon points="180,34 164,66 192,70" fill="#FECDD3" />

          {/* Face Base */}
          <ellipse cx="120" cy="90" rx="60" ry="50" fill="url(#catOrange)" stroke="#9A3412" strokeWidth="4" />

          {/* Tabby Forehead Stripes */}
          <path d="M 120 54 L 120 68" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" />
          <path d="M 112 56 L 114 66" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" />
          <path d="M 128 56 L 126 66" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" />

          {/* Cheeks */}
          <circle cx="78" cy="104" r="13" fill="url(#catCheek)" />
          <circle cx="162" cy="104" r="13" fill="url(#catCheek)" />

          {/* Eyes (Almond Cat Eyes) */}
          {isBlinking ? (
            <g stroke="#1F2937" strokeWidth="3.5" strokeLinecap="round">
              <path d="M 85 88 Q 95 93 105 88" />
              <path d="M 135 88 Q 145 93 155 88" />
            </g>
          ) : (
            <g>
              <ellipse cx="95" cy="88" rx="10" ry="12" fill="#10B981" stroke="#047857" strokeWidth="2" />
              <ellipse cx="95" cy="88" rx="4" ry="10" fill="#064E3B" />
              <circle cx="92" cy="84" r="3.5" fill="#FFFFFF" />

              <ellipse cx="145" cy="88" rx="10" ry="12" fill="#10B981" stroke="#047857" strokeWidth="2" />
              <ellipse cx="145" cy="88" rx="4" ry="10" fill="#064E3B" />
              <circle cx="142" cy="84" r="3.5" fill="#FFFFFF" />
            </g>
          )}

          {/* Muzzle */}
          <ellipse cx="112" cy="108" rx="14" ry="11" fill="url(#catCream)" />
          <ellipse cx="128" cy="108" rx="14" ry="11" fill="url(#catCream)" />

          {/* Pink Nose */}
          <polygon points="120,105 115,99 125,99" fill="#F43F5E" />

          {/* Whiskers */}
          <g stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round">
            <line x1="60" y1="102" x2="25" y2="98" />
            <line x1="60" y1="108" x2="25" y2="112" />
            <line x1="180" y1="102" x2="215" y2="98" />
            <line x1="180" y1="108" x2="215" y2="112" />
          </g>

          {/* Mouth */}
          {mouthOpen > 0 ? (
            <ellipse cx="120" cy={114 + mouthOpen / 2} rx={mouthOpen} ry={mouthOpen * 0.8} fill="#E11D48" stroke="#1F2937" strokeWidth="2.5" />
          ) : (
            <path d="M 112 110 Q 120 115 120 112 Q 120 115 128 110" fill="none" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
          )}
        </g>
      </svg>
    </div>
  );
};
