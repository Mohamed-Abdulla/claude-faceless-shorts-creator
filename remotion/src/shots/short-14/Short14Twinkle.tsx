import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { ProgressBar } from '../../lib/shorts';
import { FONT_KIDS } from '../../fonts';
import { VO } from './vo.gen';
import { BabyCharacter } from './BabyCharacter';

// =============================================================================
// COMPOSITION CONFIG
// =============================================================================
export const compositionConfig = {
  id: 'Short14Twinkle',
  durationInSeconds: 34,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// 2.5D SHADED GRAPHICS & CHARACTERS
// =============================================================================

// Rich 2.5D Golden Star with Shading, Gloss & Ambient Radiance
const KawaiiStar3D: React.FC<{ size?: number; x?: number; y?: number; rotate?: number }> = ({
  size = 380,
  x = 0,
  y = 0,
  rotate = 0,
}) => {
  const frame = useCurrentFrame();

  const bounceY = Math.sin(frame * 0.12) * 20;
  const squishY = 1 + 0.04 * Math.sin(frame * 0.24);
  const squishX = 1 - 0.04 * Math.sin(frame * 0.24);
  const tilt = rotate + Math.sin(frame * 0.08) * 6;
  const isBlinking = frame % 75 < 4;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) translateY(${bounceY}px) scale(${squishX}, ${squishY}) rotate(${tilt}deg)`,
        filter: 'drop-shadow(0 20px 45px rgba(255, 190, 0, 0.55)) drop-shadow(0 0 15px rgba(255, 240, 120, 0.4))',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 200 200">
        <defs>
          <radialGradient id="star3D" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFFB3" />
            <stop offset="35%" stopColor="#FFEA3D" />
            <stop offset="75%" stopColor="#FFAA00" />
            <stop offset="100%" stopColor="#E67E00" />
          </radialGradient>
          <radialGradient id="cheekGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF477E" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FF477E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 3D Shaded Star Body */}
        <polygon
          points="100,10 126,68 190,75 142,118 156,182 100,148 44,182 58,118 10,75 74,68"
          fill="url(#star3D)"
          stroke="#FFF9C4"
          strokeWidth="6"
          strokeLinejoin="round"
        />

        {/* Cheek Blushes */}
        <circle cx="68" cy="116" r="15" fill="url(#cheekGlow)" />
        <circle cx="132" cy="116" r="15" fill="url(#cheekGlow)" />

        {/* Blinking Anime Eyes */}
        {isBlinking ? (
          <>
            <path d="M 66 102 Q 74 108 82 102" fill="none" stroke="#3E2723" strokeWidth="4.5" strokeLinecap="round" />
            <path d="M 118 102 Q 126 108 134 102" fill="none" stroke="#3E2723" strokeWidth="4.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="74" cy="102" r="9.5" fill="#2E1C0C" />
            <circle cx="71" cy="99" r="4" fill="#FFFFFF" />
            <circle cx="77" cy="105" r="2" fill="#FFFFFF" />

            <circle cx="126" cy="102" r="9.5" fill="#2E1C0C" />
            <circle cx="123" cy="99" r="4" fill="#FFFFFF" />
            <circle cx="129" cy="105" r="2" fill="#FFFFFF" />
          </>
        )}

        {/* Happy Smile with Tongue */}
        <path d="M 88 116 Q 100 132 112 116" fill="#880E4F" stroke="#3E2723" strokeWidth="3.5" strokeLinecap="round" />
        <ellipse cx="100" cy="123" rx="6.5" ry="4" fill="#FF80AB" />
      </svg>
    </div>
  );
};

// Shimmering Prism Diamond
const SparklingDiamond: React.FC<{ x: number; y: number; size?: number }> = ({ x, y, size = 260 }) => {
  const frame = useCurrentFrame();
  const pulse = 1 + 0.08 * Math.sin(frame * 0.18);
  const spin = Math.sin(frame * 0.09) * 12;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${pulse}) rotate(${spin}deg)`,
        filter: 'drop-shadow(0 16px 45px rgba(0, 242, 254, 0.65)) drop-shadow(0 0 25px rgba(255, 255, 255, 0.8))',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 140 140">
        <defs>
          <linearGradient id="diaTop" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4FACFE" />
            <stop offset="50%" stopColor="#00F2FE" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
          <linearGradient id="diaBot" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00F2FE" />
            <stop offset="100%" stopColor="#2979FF" />
          </linearGradient>
        </defs>
        <polygon points="40,30 100,30 130,60 10,60" fill="url(#diaTop)" stroke="#FFFFFF" strokeWidth="3.5" />
        <polygon points="10,60 130,60 70,120" fill="url(#diaBot)" stroke="#FFFFFF" strokeWidth="3.5" />
        <polygon points="40,30 70,60 100,30" fill="#E0F7FF" opacity="0.85" />
        <polygon points="40,30 10,60 70,60" fill="#99E5FF" opacity="0.7" />
        <polygon points="100,30 70,60 130,60" fill="#99E5FF" opacity="0.7" />
      </svg>
    </div>
  );
};

// Cute Crescent Moon
const CrescentMoon: React.FC<{ x: number; y: number; size?: number }> = ({ x, y, size = 180 }) => {
  const frame = useCurrentFrame();
  const rock = Math.sin(frame * 0.08) * 8;
  const floatY = Math.sin(frame * 0.1 + 1) * 10;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) translateY(${floatY}px) rotate(${rock}deg)`,
        filter: 'drop-shadow(0 16px 36px rgba(255, 238, 88, 0.45))',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 120 120">
        <defs>
          <radialGradient id="moon3D" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFD4" />
            <stop offset="45%" stopColor="#FFEE58" />
            <stop offset="90%" stopColor="#FBC02D" />
            <stop offset="100%" stopColor="#F57F17" />
          </radialGradient>
        </defs>
        <path
          d="M 60 10 A 45 45 0 1 0 105 85 A 38 38 0 1 1 60 10 Z"
          fill="url(#moon3D)"
          stroke="#FFF59D"
          strokeWidth="3.5"
        />
        <path d="M 52 56 Q 60 62 68 56" fill="none" stroke="#5D4037" strokeWidth="3.5" strokeLinecap="round" />
        <ellipse cx="58" cy="68" rx="7" ry="5" fill="#FF8A80" opacity="0.75" />
      </svg>
    </div>
  );
};

// Soft Fluffy Cartoon Cloud
const FluffyCloud: React.FC<{ x: number; y: number; scale?: number; opacity?: number }> = ({
  x,
  y,
  scale = 1,
  opacity = 0.28,
}) => (
  <div
    style={{
      position: 'absolute',
      left: x,
      top: y,
      transform: `scale(${scale})`,
      opacity,
      filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.15))',
    }}
  >
    <svg width="220" height="110" viewBox="0 0 220 110">
      <defs>
        <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E3F2FD" />
        </linearGradient>
      </defs>
      <path
        d="M 40 80 Q 20 80 20 60 Q 20 40 45 40 Q 55 15 85 20 Q 110 5 140 22 Q 165 15 180 35 Q 205 38 200 65 Q 205 80 180 80 Z"
        fill="url(#cloudGrad)"
      />
    </svg>
  </div>
);

// Floating Fairy Dust / Stardust Motes
const FairyDust: React.FC<{ count?: number }> = ({ count = 30 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {Array.from({ length: count }).map((_, i) => {
        const baseX = (i * 97) % 1020 + 30;
        const baseY = (i * 163 + 80) % 1800;
        const speed = 0.8 + (i % 4) * 0.4;
        const currentY = (baseY - frame * speed + 1920) % 1920;
        const sway = Math.sin(frame * 0.05 + i * 1.5) * 20;
        const pulse = 0.3 + 0.7 * Math.sin(frame * 0.1 + i);
        const size = 6 + (i % 3) * 4;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: baseX + sway,
              top: currentY,
              width: size,
              height: size,
              borderRadius: '50%',
              backgroundColor: i % 3 === 0 ? '#FFE57F' : i % 2 === 0 ? '#80D8FF' : '#FFFFFF',
              opacity: pulse,
              boxShadow: `0 0 14px ${i % 3 === 0 ? '#FFE57F' : '#80D8FF'}`,
              filter: i % 2 === 0 ? 'blur(0.5px)' : 'none',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// =============================================================================
// CHUNKY 3D STICKER CAPTIONS COMPONENT
// =============================================================================
const StickerCaptions: React.FC<{ lines: typeof VO }> = ({ lines }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;

  // Find active line
  const activeLine = lines.find((l) => t >= l.start - 0.1 && t <= l.end + 0.3);
  if (!activeLine || !activeLine.words) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 1420,
        left: 50,
        right: 50,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: 18,
          rowGap: 12,
          padding: '24px 40px',
          background: 'rgba(15, 23, 42, 0.88)',
          borderRadius: 32,
          border: '3px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 24px rgba(255, 224, 102, 0.15)',
        }}
      >
        {activeLine.words.map((word, i) => {
          const isActive = t >= word.start && t < word.end + 0.08;
          return (
            <span
              key={i}
              style={{
                fontFamily: FONT_KIDS,
                fontWeight: 700,
                fontSize: 56,
                letterSpacing: 1.5,
                color: isActive ? '#FFE066' : '#FFFFFF',
                WebkitTextStroke: isActive ? '3px #9A6700' : '2px #1E293B',
                transform: isActive ? 'scale(1.16) translateY(-4px)' : 'scale(1.0)',
                textShadow: isActive
                  ? '0 6px 20px rgba(255, 224, 102, 0.8), 0 2px 4px rgba(0, 0, 0, 0.8)'
                  : '0 4px 10px rgba(0, 0, 0, 0.6)',
                transition: 'all 0.08s ease-out',
                display: 'inline-block',
              }}
            >
              {word.w}
            </span>
          );
        })}
      </div>
    </div>
  );
};

// =============================================================================
// MAIN COMPOSITION
// =============================================================================
export const Short14Twinkle: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtle organic camera sway
  const camZoom = 1 + 0.015 * Math.sin(frame * 0.02);
  const camX = Math.sin(frame * 0.03) * 8;
  const camY = Math.cos(frame * 0.025) * 6;

  const loopFade = interpolate(frame, [980, 1019], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const isSunset = frame >= 570 && frame < 720;

  return (
    <AbsoluteFill
      style={{
        background: isSunset
          ? `linear-gradient(180deg, #1A1235 0%, #7B2869 45%, #C85C5C 75%, #F99B7D 100%)`
          : `linear-gradient(180deg, #090B24 0%, #12163E 40%, #1F1745 75%, #150F30 100%)`,
        overflow: 'hidden',
      }}
    >
      {/* Cinematic Handheld Camera Wrapper */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          transform: `scale(${camZoom}) translate(${camX}px, ${camY}px)`,
        }}
      >
        <ProgressBar color="#FFE066" />

        {/* 30 Floating Fairy Dust Motes with Depth of Field */}
        <FairyDust count={32} />

        {/* Soft Drifting Parallax Clouds */}
        <FluffyCloud x={((frame * 0.8) % 1400) - 250} y={310} scale={1.4} opacity={0.24} />
        <FluffyCloud x={1100 - ((frame * 0.6) % 1400)} y={480} scale={1.1} opacity={0.2} />
        <FluffyCloud x={((frame * 1.1 + 400) % 1500) - 300} y={1180} scale={1.6} opacity={0.25} />

        {/* =====================================================================
            TOP HEADER ZONE (y: 120 - 270)
            Fredoka 3D Sticker Typography
            ===================================================================== */}
        <div
          style={{
            position: 'absolute',
            top: 130,
            left: 60,
            right: 60,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              background: 'linear-gradient(90deg, #FF5252 0%, #FF7A00 100%)',
              padding: '12px 36px',
              borderRadius: 999,
              color: '#FFFFFF',
              fontFamily: FONT_KIDS,
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 2.5,
              boxShadow: '0 10px 28px rgba(255, 82, 82, 0.45)',
              border: '3px solid #FFFFFF',
              textTransform: 'uppercase',
            }}
          >
            ⭐ Nursery Rhymes ⭐
          </div>

          <div
            style={{
              marginTop: 18,
              fontFamily: FONT_KIDS,
              fontSize: 60,
              fontWeight: 700,
              color: '#FFE066',
              letterSpacing: 2,
              WebkitTextStroke: '4px #8B6200',
              textShadow: '0 6px 24px rgba(255, 224, 102, 0.7), 0 2px 4px rgba(0, 0, 0, 0.8)',
              textAlign: 'center',
            }}
          >
            TWINKLE TWINKLE
          </div>
        </div>

        {/* =====================================================================
            MIDDLE PLAYGROUND STAGE (y: 320 - 1360)
            Singing Baby + 3D Shaded Kawaii Star Companion!
            ===================================================================== */}

        {/* Persistent Singing Baby Character */}
        <BabyCharacter x={360} y={850} size={420} voLines={VO} />

        {/* Scene 1: Bouncing Star Beside Baby (0 - 145 frames | 0.0s - 4.8s) */}
        <Sequence from={0} durationInFrames={145}>
          <KawaiiStar3D size={370} x={750} y={730} />
          <CrescentMoon x={880} y={440} size={170} />
        </Sequence>

        {/* Scene 2: Wondering Star Tilts (145 - 285 frames | 4.8s - 9.5s) */}
        <Sequence from={145} durationInFrames={140}>
          <KawaiiStar3D size={360} x={740} y={720} rotate={15} />
          <CrescentMoon x={840} y={460} size={200} />
        </Sequence>

        {/* Scene 3: Floating High Into the Sky (285 - 430 frames | 9.5s - 14.3s) */}
        <Sequence from={285} durationInFrames={145}>
          <div
            style={{
              position: 'absolute',
              left: -200,
              bottom: 480,
              width: 1480,
              height: 400,
              borderRadius: '50%',
              background: 'linear-gradient(180deg, #10AC84 0%, #006266 50%, #0652DD 100%)',
              boxShadow: '0 -15px 50px rgba(16, 172, 132, 0.45)',
            }}
          />
          <KawaiiStar3D size={350} x={740} y={640} />
          <CrescentMoon x={180} y={480} size={160} />
        </Sequence>

        {/* Scene 4: Like a Diamond in the Sky (430 - 580 frames | 14.3s - 19.3s) */}
        <Sequence from={430} durationInFrames={150}>
          <SparklingDiamond x={560} y={620} size={290} />
          <KawaiiStar3D size={310} x={800} y={740} rotate={15} />
        </Sequence>

        {/* Scene 5: When the Blazing Sun is Gone (580 - 730 frames | 19.3s - 24.3s) */}
        <Sequence from={580} durationInFrames={150}>
          <div
            style={{
              position: 'absolute',
              left: 540,
              top: 1050 + Math.sin((frame - 580) * 0.04) * 60,
              width: 380,
              height: 380,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FFEAA7 0%, #FF9F43 70%, #EE5253 100%)',
              boxShadow: '0 0 90px rgba(255, 159, 67, 0.85)',
            }}
          />
          <KawaiiStar3D size={340} x={740} y={680} />
        </Sequence>

        {/* Scene 6: Now You Show Your Little Light (730 - 880 frames | 24.3s - 29.3s) */}
        <Sequence from={730} durationInFrames={150}>
          <div
            style={{
              position: 'absolute',
              left: 740,
              top: 720,
              width: 540,
              height: 540,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 234, 115, 0.45) 0%, rgba(255, 234, 115, 0) 70%)',
            }}
          />
          <KawaiiStar3D size={390} x={740} y={720} />
          <CrescentMoon x={180} y={480} size={170} />
        </Sequence>

        {/* Scene 7: Twinkle Twinkle Through the Night (880 - 1020 frames | 29.3s - 34.0s) */}
        <Sequence from={880} durationInFrames={140}>
          <KawaiiStar3D size={370} x={750} y={730} />
          <CrescentMoon x={880} y={440} size={170} />
        </Sequence>

        {/* Dissolve overlay for frame-0 seamless loop */}
        {loopFade > 0 && (
          <AbsoluteFill style={{ opacity: loopFade, background: 'linear-gradient(180deg, #090B24 0%, #12163E 40%, #1F1745 75%, #150F30 100%)' }} />
        )}

        {/* =====================================================================
            BOTTOM ZONE: CHUNKY 3D STICKER CAPTIONS (y: 1420 - 1620)
            ===================================================================== */}
        <StickerCaptions lines={VO} />
      </div>

      {/* Cinematic Edge Vignette to focus eyes on the center */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse at center, transparent 65%, rgba(5, 7, 20, 0.65) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};

export default Short14Twinkle;
