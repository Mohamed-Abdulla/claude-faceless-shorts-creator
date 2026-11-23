import React from 'react';
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { Captions, ProgressBar } from '../../lib/shorts';
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
// KAWAII CHARACTERS & GRAPHICS
// =============================================================================

// Cute Kawaii Star with Blinking Eyes, Rosy Cheeks, and Gentle Bounce
const KawaiiStar: React.FC<{ size?: number; x?: number; y?: number; rotate?: number }> = ({
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
        filter: 'drop-shadow(0 16px 36px rgba(255, 215, 0, 0.45))',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 200 200">
        <defs>
          <linearGradient id="starGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF77D" />
            <stop offset="60%" stopColor="#FFD13B" />
            <stop offset="100%" stopColor="#FFA62B" />
          </linearGradient>
          <radialGradient id="cheekGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF6B8B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FF6B8B" stopOpacity="0" />
          </radialGradient>
        </defs>

        <polygon
          points="100,10 126,68 190,75 142,118 156,182 100,148 44,182 58,118 10,75 74,68"
          fill="url(#starGrad)"
          stroke="#FFEAA7"
          strokeWidth="6"
          strokeLinejoin="round"
        />

        <circle cx="68" cy="116" r="14" fill="url(#cheekGlow)" />
        <circle cx="132" cy="116" r="14" fill="url(#cheekGlow)" />

        {isBlinking ? (
          <>
            <path d="M 66 102 Q 74 108 82 102" fill="none" stroke="#4A3408" strokeWidth="4" strokeLinecap="round" />
            <path d="M 118 102 Q 126 108 134 102" fill="none" stroke="#4A3408" strokeWidth="4" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="74" cy="102" r="9" fill="#3D2904" />
            <circle cx="71" cy="99" r="3.5" fill="#FFFFFF" />
            <circle cx="76" cy="104" r="1.8" fill="#FFFFFF" />

            <circle cx="126" cy="102" r="9" fill="#3D2904" />
            <circle cx="123" cy="99" r="3.5" fill="#FFFFFF" />
            <circle cx="128" cy="104" r="1.8" fill="#FFFFFF" />
          </>
        )}

        <path d="M 88 116 Q 100 130 112 116" fill="#A83232" stroke="#3D2904" strokeWidth="3.5" strokeLinecap="round" />
        <ellipse cx="100" cy="122" rx="6" ry="4" fill="#FF8484" />
      </svg>
    </div>
  );
};

// Cute Crescent Moon with Gentle Rocking
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
        filter: 'drop-shadow(0 12px 28px rgba(255, 240, 150, 0.35))',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 120 120">
        <defs>
          <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9A6" />
            <stop offset="100%" stopColor="#FFDE59" />
          </linearGradient>
        </defs>
        <path
          d="M 60 10 A 45 45 0 1 0 105 85 A 38 38 0 1 1 60 10 Z"
          fill="url(#moonGrad)"
          stroke="#FFF275"
          strokeWidth="3"
        />
        <path d="M 52 56 Q 60 62 68 56" fill="none" stroke="#664C00" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="58" cy="68" rx="7" ry="5" fill="#FF8CA3" opacity="0.65" />
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
        filter: 'drop-shadow(0 16px 40px rgba(0, 242, 254, 0.45))',
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
            <stop offset="100%" stopColor="#3877FF" />
          </linearGradient>
        </defs>
        <polygon points="40,30 100,30 130,60 10,60" fill="url(#diaTop)" stroke="#FFFFFF" strokeWidth="3" />
        <polygon points="10,60 130,60 70,120" fill="url(#diaBot)" stroke="#FFFFFF" strokeWidth="3" />
        <polygon points="40,30 70,60 100,30" fill="#E0F7FF" opacity="0.75" />
        <polygon points="40,30 10,60 70,60" fill="#99E5FF" opacity="0.6" />
        <polygon points="100,30 70,60 130,60" fill="#99E5FF" opacity="0.6" />
        <polygon points="10,60 70,120 70,60" fill="#1A8CFF" opacity="0.4" />
        <polygon points="130,60 70,120 70,60" fill="#66B3FF" opacity="0.4" />
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
      filter: 'blur(1px)',
    }}
  >
    <svg width="220" height="110" viewBox="0 0 220 110">
      <path
        d="M 40 80 Q 20 80 20 60 Q 20 40 45 40 Q 55 15 85 20 Q 110 5 140 22 Q 165 15 180 35 Q 205 38 200 65 Q 205 80 180 80 Z"
        fill="#FFFFFF"
      />
    </svg>
  </div>
);

// Star Sparkle
const Sparkle: React.FC<{ x: number; y: number; delay?: number; size?: number; color?: string }> = ({
  x,
  y,
  delay = 0,
  size = 32,
  color = '#FFE875',
}) => {
  const frame = useCurrentFrame();
  const scale = Math.max(0, Math.sin((frame + delay * 12) * 0.15));

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        pointerEvents: 'none',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40">
        <path
          d="M 20 0 Q 20 20 40 20 Q 20 20 20 40 Q 20 20 0 20 Q 20 20 20 0 Z"
          fill={color}
          filter="drop-shadow(0 0 6px rgba(255, 235, 120, 0.8))"
        />
      </svg>
    </div>
  );
};

// Floating Musical Notes
const MusicNote: React.FC<{ x: number; startY: number; delay: number; symbol: string; color: string }> = ({
  x,
  startY,
  delay,
  symbol,
  color,
}) => {
  const frame = useCurrentFrame();
  const t = (frame + delay) % 70;
  const floatUp = t * 2.8;
  const sway = Math.sin(t * 0.15) * 18;
  const opacity = interpolate(t, [0, 15, 55, 70], [0, 0.9, 0.9, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        left: x + sway,
        top: startY - floatUp,
        fontSize: 48,
        color,
        opacity,
        fontWeight: 'bold',
        textShadow: `0 0 16px ${color}88`,
        pointerEvents: 'none',
      }}
    >
      {symbol}
    </div>
  );
};

// =============================================================================
// MAIN COMPOSITION
// =============================================================================
export const Short14Twinkle: React.FC = () => {
  const frame = useCurrentFrame();

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
          : `linear-gradient(180deg, #0B0E28 0%, #171B46 45%, #251B4E 75%, #181135 100%)`,
        overflow: 'hidden',
      }}
    >
      <ProgressBar color="#FFE066" />

      {/* 36 Sparkling Background Star Dots */}
      {Array.from({ length: 36 }).map((_, i) => {
        const posX = (i * 83) % 1020 + 30;
        const posY = ((i * 127 + 60) % 1150) + 160;
        const twinkle = 0.25 + 0.75 * Math.sin(frame * 0.12 + i * 1.8);
        const starSize = 4 + (i % 3) * 3;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: posX,
              top: posY,
              width: starSize,
              height: starSize,
              borderRadius: '50%',
              backgroundColor: i % 4 === 0 ? '#FFE066' : i % 3 === 0 ? '#99E5FF' : '#FFFFFF',
              opacity: twinkle,
              boxShadow: `0 0 10px rgba(255, 255, 255, 0.7)`,
            }}
          />
        );
      })}

      {/* Soft Floating Parallax Clouds */}
      <FluffyCloud x={((frame * 0.8) % 1400) - 250} y={320} scale={1.4} opacity={0.22} />
      <FluffyCloud x={1100 - ((frame * 0.6) % 1400)} y={480} scale={1.1} opacity={0.18} />
      <FluffyCloud x={((frame * 1.1 + 400) % 1500) - 300} y={1180} scale={1.6} opacity={0.24} />

      {/* =====================================================================
          TOP HEADER ZONE (y: 120 - 270)
          Zero overlap guarantee: Visuals stay strictly below y: 320!
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
            background: 'linear-gradient(90deg, #FF6B8B 0%, #FF8E53 100%)',
            padding: '12px 34px',
            borderRadius: 999,
            color: '#FFFFFF',
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: 2.5,
            boxShadow: '0 8px 24px rgba(255, 107, 139, 0.4)',
            textTransform: 'uppercase',
          }}
        >
          ⭐ Nursery Rhymes ⭐
        </div>

        <div
          style={{
            marginTop: 18,
            fontSize: 54,
            fontWeight: 900,
            color: '#FFE066',
            letterSpacing: 1.5,
            textShadow: '0 4px 20px rgba(255, 224, 102, 0.5), 0 2px 4px rgba(0, 0, 0, 0.6)',
            textAlign: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          TWINKLE TWINKLE
        </div>
      </div>

      {/* =====================================================================
          MIDDLE PLAYGROUND STAGE (y: 320 - 1360)
          Cute Baby Singer + Smiling Star Companion!
          ===================================================================== */}

      {/* PERSISTENT SINGING BABY CHARACTER (Sings all lyrics with dynamic mouth visemes) */}
      <BabyCharacter x={360} y={850} size={410} voLines={VO} />

      {/* Scene 1: Happy Star Bouncing Beside Baby (0 - 145 frames | 0.0s - 4.8s) */}
      <Sequence from={0} durationInFrames={145}>
        <KawaiiStar size={360} x={750} y={730} />
        <CrescentMoon x={880} y={440} size={170} />
        <Sparkle x={560} y={640} delay={0} size={44} />
        <Sparkle x={860} y={660} delay={1} size={38} color="#FF9FF3" />
        <MusicNote x={200} startY={880} delay={0} symbol="♪" color="#FFE066" />
        <MusicNote x={880} startY={860} delay={25} symbol="♫" color="#FF8CA3" />
      </Sequence>

      {/* Scene 2: Wondering Star Tilts with Curiosity (145 - 285 frames | 4.8s - 9.5s) */}
      <Sequence from={145} durationInFrames={140}>
        <KawaiiStar size={350} x={740} y={720} rotate={15} />
        <CrescentMoon x={840} y={460} size={200} />
        <Sparkle x={580} y={700} delay={1} size={40} color="#54A0FF" />
        <Sparkle x={820} y={800} delay={2} size={36} color="#FFE066" />
        <MusicNote x={220} startY={850} delay={10} symbol="♩" color="#54A0FF" />
        <MusicNote x={840} startY={840} delay={35} symbol="♫" color="#FFE066" />
      </Sequence>

      {/* Scene 3: Floating High Into the Deep Sky (285 - 430 frames | 9.5s - 14.3s) */}
      <Sequence from={285} durationInFrames={145}>
        <div
          style={{
            position: 'absolute',
            left: -200,
            bottom: 480,
            width: 1480,
            height: 400,
            borderRadius: '50%',
            background: 'linear-gradient(180deg, #1DD1A1 0%, #10AC84 40%, #0652DD 100%)',
            boxShadow: '0 -10px 40px rgba(29, 209, 161, 0.4)',
          }}
        />
        <KawaiiStar size={340} x={740} y={640} />
        <CrescentMoon x={180} y={480} size={160} />
        <Sparkle x={620} y={540} delay={0} size={48} color="#FFE066" />
        <MusicNote x={580} startY={780} delay={0} symbol="♪" color="#1DD1A1" />
      </Sequence>

      {/* Scene 4: Like a Diamond in the Sky (430 - 580 frames | 14.3s - 19.3s) */}
      <Sequence from={430} durationInFrames={150}>
        <SparklingDiamond x={560} y={620} size={280} />
        <KawaiiStar size={300} x={800} y={740} rotate={15} />
        <Sparkle x={560} y={480} delay={0} size={54} color="#00F2FE" />
        <Sparkle x={740} y={580} delay={1} size={50} color="#FF9FF3" />
        <MusicNote x={200} startY={820} delay={15} symbol="✨" color="#00F2FE" />
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
            boxShadow: '0 0 80px rgba(255, 159, 67, 0.8)',
          }}
        />
        <KawaiiStar size={330} x={740} y={680} />
        <Sparkle x={580} y={620} delay={1} size={42} color="#FFE066" />
      </Sequence>

      {/* Scene 6: Now You Show Your Little Light (730 - 880 frames | 24.3s - 29.3s) */}
      <Sequence from={730} durationInFrames={150}>
        <div
          style={{
            position: 'absolute',
            left: 740,
            top: 720,
            width: 520,
            height: 520,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 234, 115, 0.38) 0%, rgba(255, 234, 115, 0) 70%)',
          }}
        />
        <KawaiiStar size={380} x={740} y={720} />
        <CrescentMoon x={180} y={480} size={170} />
        <Sparkle x={580} y={680} delay={0} size={50} color="#FFE066" />
        <MusicNote x={840} startY={800} delay={20} symbol="♫" color="#FFE066" />
      </Sequence>

      {/* Scene 7: Twinkle Twinkle Through the Night (880 - 1020 frames | 29.3s - 34.0s) */}
      <Sequence from={880} durationInFrames={140}>
        <KawaiiStar size={360} x={750} y={730} />
        <CrescentMoon x={880} y={440} size={170} />
        <Sparkle x={560} y={640} delay={0} size={46} color="#FFE066" />
        <MusicNote x={200} startY={880} delay={5} symbol="♪" color="#FFE066" />
        <MusicNote x={860} startY={860} delay={30} symbol="♫" color="#54A0FF" />
      </Sequence>

      {/* Dissolve overlay for frame-0 seamless infinite loop */}
      {loopFade > 0 && (
        <AbsoluteFill style={{ opacity: loopFade, background: 'linear-gradient(180deg, #0B0E28 0%, #171B46 45%, #251B4E 75%, #181135 100%)' }} />
      )}

      {/* =====================================================================
          BOTTOM CAPTIONS ZONE (y: 1420 - 1620)
          Zero overlap guarantee: 100px buffer below the characters!
          ===================================================================== */}
      <Captions lines={VO} accent="#FFE066" y={1420} size={52} plate />
    </AbsoluteFill>
  );
};

export default Short14Twinkle;
