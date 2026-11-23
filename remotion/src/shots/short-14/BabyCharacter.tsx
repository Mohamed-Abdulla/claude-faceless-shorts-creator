import React from 'react';
import { useCurrentFrame } from 'remotion';
import { VoLine } from '../../lib/shorts';

export const BabyCharacter: React.FC<{
  x: number;
  y: number;
  size?: number;
  voLines: VoLine[];
}> = ({ x, y, size = 420, voLines }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;

  // Determine if the baby is actively singing right now based on exact word boundaries
  let isSinging = false;
  for (const line of voLines) {
    if (line.words) {
      for (const w of line.words) {
        if (t >= w.start && t <= w.end + 0.08) {
          isSinging = true;
          break;
        }
      }
    } else if (t >= line.start && t <= line.end) {
      isSinging = true;
      break;
    }
    if (isSinging) break;
  }

  // Rhythmic joyful sway & bounce
  const bounceY = Math.sin(frame * 0.18) * 16;
  const headBob = Math.sin(frame * 0.12) * 5;
  const handSway = Math.sin(frame * 0.22) * 14;

  // Periodic blinking eyes (every ~70 frames)
  const isBlinking = frame % 70 < 4;

  // Mouth viseme cycle for singing
  const mouthCycle = Math.floor(frame / 4) % 3;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) translateY(${bounceY}px)`,
        filter: 'drop-shadow(0 24px 48px rgba(0, 0, 0, 0.45)) drop-shadow(0 4px 12px rgba(255, 175, 120, 0.25))',
      }}
    >
      <svg width={size} height={size * 1.15} viewBox="0 0 240 280">
        <defs>
          {/* Spherical Baby Skin Gradient */}
          <radialGradient id="skin3D" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFF9F2" />
            <stop offset="45%" stopColor="#FFE4CE" />
            <stop offset="85%" stopColor="#F8C79F" />
            <stop offset="100%" stopColor="#ECAE80" />
          </radialGradient>

          {/* Neck Shadow for 3D depth */}
          <linearGradient id="neckShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>

          {/* Chubby Rosy Cheeks */}
          <radialGradient id="babyCheek3D" cx="45%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#FF6584" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#FF7A95" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF7A95" stopOpacity="0" />
          </radialGradient>

          {/* Rich Velvet Blue Onesie */}
          <radialGradient id="onesie3D" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#82B1FF" />
            <stop offset="40%" stopColor="#448AFF" />
            <stop offset="85%" stopColor="#2979FF" />
            <stop offset="100%" stopColor="#1565C0" />
          </radialGradient>

          {/* 3D Nightcap Gradient */}
          <radialGradient id="nightcap3D" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFB2E6" />
            <stop offset="45%" stopColor="#FF70C7" />
            <stop offset="85%" stopColor="#E040A5" />
            <stop offset="100%" stopColor="#A82076" />
          </radialGradient>

          {/* Golden Star Glow */}
          <radialGradient id="goldGlow" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FFFDE7" />
            <stop offset="40%" stopColor="#FFEE58" />
            <stop offset="80%" stopColor="#FDD835" />
            <stop offset="100%" stopColor="#F57F17" />
          </radialGradient>

          {/* Mouth Cavity */}
          <linearGradient id="mouthCavity" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5B1010" />
            <stop offset="100%" stopColor="#8D1C1C" />
          </linearGradient>
        </defs>

        {/* ===================================================================
            BABY BODY & PAJAMAS
            =================================================================== */}
        <g id="body">
          {/* Onesie / Body */}
          <path
            d="M 65 170 C 48 200 45 250 85 260 C 115 265 125 265 155 260 C 195 250 192 200 175 170 Z"
            fill="url(#onesie3D)"
            stroke="#0D47A1"
            strokeWidth="3.5"
          />

          {/* Neck Shadow on Chest */}
          <path d="M 78 174 Q 120 205 162 174 Z" fill="url(#neckShadow)" />

          {/* Golden Star Badge */}
          <polygon
            points="120,195 124,207 137,208 127,216 130,229 120,222 110,229 113,216 103,208 116,207"
            fill="url(#goldGlow)"
            stroke="#FBC02D"
            strokeWidth="2"
            filter="drop-shadow(0 2px 6px rgba(253, 216, 53, 0.6))"
          />

          {/* White Pajama Polka Dots with Highlight */}
          <circle cx="85" cy="215" r="5" fill="#FFFFFF" opacity="0.8" />
          <circle cx="155" cy="220" r="5" fill="#FFFFFF" opacity="0.8" />
          <circle cx="100" cy="245" r="5.5" fill="#FFFFFF" opacity="0.8" />
          <circle cx="140" cy="245" r="5.5" fill="#FFFFFF" opacity="0.8" />

          {/* Cute Little Feet */}
          <ellipse cx="90" cy="265" rx="16" ry="11" fill="#FFFFFF" stroke="#BBDEFB" strokeWidth="2.5" />
          <ellipse cx="150" cy="265" rx="16" ry="11" fill="#FFFFFF" stroke="#BBDEFB" strokeWidth="2.5" />

          {/* Left Dancing Arm & Hand */}
          <g transform={`rotate(${-handSway}, 65, 180)`}>
            <path d="M 65 180 Q 30 170 32 150" fill="none" stroke="url(#onesie3D)" strokeWidth="18" strokeLinecap="round" />
            <circle cx="32" cy="146" r="13" fill="url(#skin3D)" stroke="#D89260" strokeWidth="2" />
          </g>

          {/* Right Waving Arm & Hand */}
          <g transform={`rotate(${handSway}, 175, 180)`}>
            <path d="M 175 180 Q 210 170 208 150" fill="none" stroke="url(#onesie3D)" strokeWidth="18" strokeLinecap="round" />
            <circle cx="208" cy="146" r="13" fill="url(#skin3D)" stroke="#D89260" strokeWidth="2" />
          </g>
        </g>

        {/* ===================================================================
            HEAD (Rotates slightly with headBob)
            =================================================================== */}
        <g id="head" transform={`rotate(${headBob}, 120, 115)`}>
          {/* Ears */}
          <ellipse cx="44" cy="115" rx="10" ry="13" fill="url(#skin3D)" stroke="#D89260" strokeWidth="2" />
          <ellipse cx="196" cy="115" rx="10" ry="13" fill="url(#skin3D)" stroke="#D89260" strokeWidth="2" />

          {/* Big Chubby Baby Head with 3D Depth */}
          <circle cx="120" cy="115" r="76" fill="url(#skin3D)" stroke="#D89260" strokeWidth="3.5" />

          {/* Chubby Rosy Cheeks */}
          <ellipse cx="74" cy="132" rx="18" ry="13" fill="url(#babyCheek3D)" />
          <ellipse cx="166" cy="132" rx="18" ry="13" fill="url(#babyCheek3D)" />

          {/* Eyebrows */}
          <path d="M 72 88 Q 88 80 100 88" fill="none" stroke="#6D4C41" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 140 88 Q 152 80 168 88" fill="none" stroke="#6D4C41" strokeWidth="3.5" strokeLinecap="round" />

          {/* Big Sparkling Anime Eyes */}
          {isBlinking ? (
            <>
              {/* Happy Blinking Curved Arcs */}
              <path d="M 72 106 Q 86 118 100 106" fill="none" stroke="#2D1A05" strokeWidth="5" strokeLinecap="round" />
              <path d="M 140 106 Q 154 118 168 106" fill="none" stroke="#2D1A05" strokeWidth="5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Left Eye: Outer Shadow + Deep Pupil + Dual Catchlights */}
              <circle cx="86" cy="106" r="14.5" fill="#1C1004" />
              <circle cx="86" cy="108" r="13" fill="#3E2723" opacity="0.4" />
              <circle cx="82" cy="101" r="5.5" fill="#FFFFFF" />
              <circle cx="90" cy="109" r="2.5" fill="#FFFFFF" />

              {/* Right Eye: Outer Shadow + Deep Pupil + Dual Catchlights */}
              <circle cx="154" cy="106" r="14.5" fill="#1C1004" />
              <circle cx="154" cy="108" r="13" fill="#3E2723" opacity="0.4" />
              <circle cx="150" cy="101" r="5.5" fill="#FFFFFF" />
              <circle cx="158" cy="109" r="2.5" fill="#FFFFFF" />
            </>
          )}

          {/* Button Nose */}
          <ellipse cx="120" cy="120" rx="4.5" ry="3" fill="#D87A4D" opacity="0.75" />

          {/* =================================================================
              ANIMATED SINGING MOUTH (Visemes synced to speech)
              ================================================================= */}
          {isSinging ? (
            mouthCycle === 0 ? (
              /* Wide Open Singing Mouth ("AH" / "AA") */
              <g>
                <path d="M 104 134 Q 120 166 136 134 Z" fill="url(#mouthCavity)" stroke="#4A0E17" strokeWidth="3" />
                <path d="M 112 154 Q 120 145 128 154 Q 120 164 112 154 Z" fill="#FF7675" />
                <rect x="110" y="134" width="20" height="4" rx="2" fill="#FFFFFF" />
              </g>
            ) : mouthCycle === 1 ? (
              /* Round Open Singing Mouth ("O" / "OO") */
              <g>
                <ellipse cx="120" cy="144" rx="12" ry="14" fill="url(#mouthCavity)" stroke="#4A0E17" strokeWidth="3" />
                <ellipse cx="120" cy="151" rx="7" ry="5" fill="#FF7675" />
                <ellipse cx="120" cy="135" rx="8" ry="2.5" fill="#FFFFFF" />
              </g>
            ) : (
              /* Playful Happy Open Grin */
              <g>
                <path d="M 102 136 Q 120 156 138 136 Z" fill="url(#mouthCavity)" stroke="#4A0E17" strokeWidth="3" />
                <ellipse cx="120" cy="148" rx="8" ry="4" fill="#FF7675" />
              </g>
            )
          ) : (
            /* Gentle Closed Resting Smile */
            <path d="M 106 136 Q 120 148 134 136" fill="none" stroke="#641E16" strokeWidth="4" strokeLinecap="round" />
          )}

          {/* =================================================================
              3D NIGHTCAP / BEDTIME BONNET
              ================================================================= */}
          <path
            d="M 50 95 C 45 35 100 20 150 30 C 198 40 202 90 190 95 C 170 82 70 82 50 95 Z"
            fill="url(#nightcap3D)"
            stroke="#880E4F"
            strokeWidth="3.5"
          />
          {/* Drooping Nightcap Tail with Star Pom-Pom */}
          <path
            d="M 175 48 Q 225 68 218 112 Q 212 134 195 144"
            fill="none"
            stroke="url(#nightcap3D)"
            strokeWidth="24"
            strokeLinecap="round"
          />
          {/* Glowing Golden Star Pom-Pom */}
          <circle
            cx="195"
            cy="148"
            r="15"
            fill="url(#goldGlow)"
            stroke="#F57F17"
            strokeWidth="2.5"
            filter="drop-shadow(0 2px 8px rgba(255, 238, 88, 0.8))"
          />

          {/* Fluffy White Nightcap Brim */}
          <path
            d="M 45 92 Q 120 80 195 92"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="14"
            strokeLinecap="round"
            filter="drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))"
          />
        </g>
      </svg>
    </div>
  );
};

export default BabyCharacter;
