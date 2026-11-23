import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
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
  let activeWord = '';
  for (const line of voLines) {
    if (line.words) {
      for (const w of line.words) {
        if (t >= w.start && t <= w.end + 0.08) {
          isSinging = true;
          activeWord = w.w.toLowerCase();
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

  // Mouth viseme selection based on active singing rhythm
  const mouthCycle = Math.floor(frame / 4) % 3;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) translateY(${bounceY}px)`,
        filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.45))',
      }}
    >
      <svg width={size} height={size * 1.15} viewBox="0 0 240 280">
        <defs>
          <linearGradient id="skinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF2E2" />
            <stop offset="70%" stopColor="#FED7B2" />
            <stop offset="100%" stopColor="#F8C498" />
          </linearGradient>
          <radialGradient id="babyCheek" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF708F" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF708F" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="pajamaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#70A1FF" />
            <stop offset="100%" stopColor="#1E90FF" />
          </linearGradient>
          <linearGradient id="nightcapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF9FF3" />
            <stop offset="100%" stopColor="#F368E0" />
          </linearGradient>
        </defs>

        {/* ===================================================================
            BABY BODY & PAJAMAS
            =================================================================== */}
        <g id="body">
          {/* Onesie / Body */}
          <path
            d="M 65 170 C 50 200 45 250 85 260 C 115 265 125 265 155 260 C 195 250 190 200 175 170 Z"
            fill="url(#pajamaGrad)"
            stroke="#1B4F72"
            strokeWidth="3.5"
          />

          {/* Little Yellow Star Badge on Pajamas */}
          <polygon
            points="120,195 124,207 137,208 127,216 130,229 120,222 110,229 113,216 103,208 116,207"
            fill="#FFE066"
            stroke="#F1C40F"
            strokeWidth="1.5"
          />

          {/* White Pajama Polka Dots */}
          <circle cx="85" cy="210" r="5" fill="#FFFFFF" opacity="0.75" />
          <circle cx="155" cy="215" r="5" fill="#FFFFFF" opacity="0.75" />
          <circle cx="100" cy="245" r="5.5" fill="#FFFFFF" opacity="0.75" />
          <circle cx="140" cy="245" r="5.5" fill="#FFFFFF" opacity="0.75" />

          {/* Cute Little Feet */}
          <ellipse cx="90" cy="265" rx="16" ry="11" fill="#FFFFFF" stroke="#D5DBDB" strokeWidth="2.5" />
          <ellipse cx="150" cy="265" rx="16" ry="11" fill="#FFFFFF" stroke="#D5DBDB" strokeWidth="2.5" />

          {/* Left Dancing Arm & Hand */}
          <g transform={`rotate(${-handSway}, 65, 180)`}>
            <path d="M 65 180 Q 30 170 32 150" fill="none" stroke="url(#pajamaGrad)" strokeWidth="18" strokeLinecap="round" />
            <circle cx="32" cy="146" r="13" fill="url(#skinGrad)" stroke="#E59866" strokeWidth="2" />
          </g>

          {/* Right Waving Arm & Hand */}
          <g transform={`rotate(${handSway}, 175, 180)`}>
            <path d="M 175 180 Q 210 170 208 150" fill="none" stroke="url(#pajamaGrad)" strokeWidth="18" strokeLinecap="round" />
            <circle cx="208" cy="146" r="13" fill="url(#skinGrad)" stroke="#E59866" strokeWidth="2" />
          </g>
        </g>

        {/* ===================================================================
            HEAD (Rotates slightly with headBob)
            =================================================================== */}
        <g id="head" transform={`rotate(${headBob}, 120, 115)`}>
          {/* Baby Ears */}
          <ellipse cx="44" cy="115" rx="10" ry="13" fill="url(#skinGrad)" stroke="#E59866" strokeWidth="2" />
          <ellipse cx="196" cy="115" rx="10" ry="13" fill="url(#skinGrad)" stroke="#E59866" strokeWidth="2" />

          {/* Big Chubby Baby Head */}
          <circle cx="120" cy="115" r="76" fill="url(#skinGrad)" stroke="#E59866" strokeWidth="3.5" />

          {/* Cute Rosy Cheeks */}
          <ellipse cx="74" cy="132" rx="16" ry="11" fill="url(#babyCheek)" />
          <ellipse cx="166" cy="132" rx="16" ry="11" fill="url(#babyCheek)" />

          {/* Eyebrows */}
          <path d="M 72 88 Q 88 80 100 88" fill="none" stroke="#7E5109" strokeWidth="3" strokeLinecap="round" />
          <path d="M 140 88 Q 152 80 168 88" fill="none" stroke="#7E5109" strokeWidth="3" strokeLinecap="round" />

          {/* Big Sparkling Baby Eyes */}
          {isBlinking ? (
            <>
              {/* Happy Blinking Curved Eyes */}
              <path d="M 72 106 Q 86 116 100 106" fill="none" stroke="#3D2904" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M 140 106 Q 154 116 168 106" fill="none" stroke="#3D2904" strokeWidth="4.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Left Eye */}
              <circle cx="86" cy="106" r="14" fill="#2C1B05" />
              <circle cx="82" cy="101" r="5" fill="#FFFFFF" />
              <circle cx="89" cy="109" r="2.5" fill="#FFFFFF" />

              {/* Right Eye */}
              <circle cx="154" cy="106" r="14" fill="#2C1B05" />
              <circle cx="150" cy="101" r="5" fill="#FFFFFF" />
              <circle cx="157" cy="109" r="2.5" fill="#FFFFFF" />
            </>
          )}

          {/* Cute Button Nose */}
          <ellipse cx="120" cy="120" rx="4" ry="3" fill="#D35400" opacity="0.6" />

          {/* =================================================================
              ANIMATED SINGING MOUTH (Visemes synced to speech)
              ================================================================= */}
          {isSinging ? (
            mouthCycle === 0 ? (
              /* Wide Open Singing Mouth (Vowel "AH") */
              <g>
                <path d="M 104 134 Q 120 164 136 134 Z" fill="#800020" stroke="#4A0E17" strokeWidth="3" />
                <path d="M 112 153 Q 120 144 128 153 Q 120 162 112 153 Z" fill="#FF7675" />
                <rect x="110" y="134" width="20" height="4" rx="2" fill="#FFFFFF" />
              </g>
            ) : mouthCycle === 1 ? (
              /* Round Open Singing Mouth ("O" / "OO" / "OH") */
              <g>
                <ellipse cx="120" cy="144" rx="12" ry="14" fill="#800020" stroke="#4A0E17" strokeWidth="3" />
                <ellipse cx="120" cy="151" rx="7" ry="5" fill="#FF7675" />
                <ellipse cx="120" cy="135" rx="8" ry="2.5" fill="#FFFFFF" />
              </g>
            ) : (
              /* Playful Happy Open Grin */
              <g>
                <path d="M 102 136 Q 120 156 138 136 Z" fill="#800020" stroke="#4A0E17" strokeWidth="3" />
                <ellipse cx="120" cy="148" rx="8" ry="4" fill="#FF7675" />
              </g>
            )
          ) : (
            /* Gentle Closed Resting Smile */
            <path d="M 106 136 Q 120 148 134 136" fill="none" stroke="#641E16" strokeWidth="4" strokeLinecap="round" />
          )}

          {/* =================================================================
              CUTE NIGHTCAP / BEDTIME BONNET
              ================================================================= */}
          <path
            d="M 50 95 C 45 40 100 25 150 35 C 195 45 200 90 190 95 C 170 82 70 82 50 95 Z"
            fill="url(#nightcapGrad)"
            stroke="#B53471"
            strokeWidth="3.5"
          />
          {/* Drooping Nightcap Tail with Star Pom-Pom */}
          <path
            d="M 175 50 Q 220 70 215 110 Q 210 130 195 140"
            fill="none"
            stroke="url(#nightcapGrad)"
            strokeWidth="22"
            strokeLinecap="round"
          />
          {/* Golden Pom-Pom Star */}
          <circle cx="195" cy="144" r="14" fill="#FFE066" stroke="#F1C40F" strokeWidth="2.5" />

          {/* Fluffy White Nightcap Brim */}
          <path
            d="M 45 92 Q 120 80 195 92"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="13"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
};

export default BabyCharacter;
