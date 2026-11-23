import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import { VO } from './vo.gen';
import { ShibaDog, TabbyCat } from './AnimalCharacters';
import { FONT_KIDS } from '../../fonts';

export const compositionConfig = {
  id: 'Short15Animals',
  durationInSeconds: 30,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// WARM NATURE STICKER CAPTIONS (Safe zone: y = 1420px, zero overlap)
// =============================================================================
const NatureCaptions: React.FC<{ lines: typeof VO }> = ({ lines }) => {
  const frame = useCurrentFrame();
  const t = frame / 30;

  let activeLine: (typeof lines)[0] | null = null;
  for (const line of lines) {
    if (t >= line.start - 0.05 && t <= line.end + 0.15) {
      activeLine = line;
      break;
    }
  }

  if (!activeLine) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: 60,
        right: 60,
        top: 1420,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px 16px',
        padding: '24px 32px',
        borderRadius: 36,
        background: 'rgba(26, 18, 11, 0.75)',
        backdropFilter: 'blur(16px)',
        border: '3px solid rgba(245, 158, 11, 0.4)',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.45)',
        fontFamily: FONT_KIDS,
      }}
    >
      {activeLine.words && activeLine.words.length > 0 ? (
        activeLine.words.map((w, i) => {
          const isSpoken = t >= w.start && t <= w.end + 0.1;
          return (
            <span
              key={i}
              style={{
                fontSize: 52,
                fontWeight: 700,
                color: isSpoken ? '#FBBF24' : '#FFFFFF',
                WebkitTextStroke: '3.5px #27180A',
                textShadow: isSpoken
                  ? '0 4px 16px rgba(251, 191, 36, 0.65)'
                  : '0 4px 10px rgba(0, 0, 0, 0.6)',
                transform: isSpoken ? 'scale(1.14)' : 'scale(1)',
                transition: 'transform 0.08s ease, color 0.08s ease',
                display: 'inline-block',
              }}
            >
              {w.w}
            </span>
          );
        })
      ) : (
        <span
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: '#FFFFFF',
            WebkitTextStroke: '3.5px #27180A',
          }}
        >
          {activeLine.text}
        </span>
      )}
    </div>
  );
};

// =============================================================================
// MAIN COMPOSITION: THE SECRET LANGUAGE OF CATS AND DOGS
// Warm Golden Sun, Emerald Meadow, Milo (Dog) & Luna (Cat)
// =============================================================================
export const Short15Animals: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;

  // Determine who is talking based on active beat
  const isDogTalking = (t >= 5.4 && t <= 11.2) || (t >= 17.9 && t <= 20.8);
  const isCatTalking = (t >= 11.6 && t <= 17.5) || (t >= 20.8 && t <= 23.8);

  // Soft floating hearts on final beat
  const showHearts = t >= 24.0;

  // Camera floating bob
  const cameraDriftY = Math.sin(frame * 0.04) * 6;

  // Seamless loop crossfade
  const loopFade = frame > 880 ? (frame - 880) / 20 : 0;

  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: '#FEF3C7' }}>
      {/* =====================================================================
          NATURAL ENVIRONMENT: WARM SUNNY MEADOW (Zero Purple/Blue)
          ===================================================================== */}
      {/* Golden Sunny Sky Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #FEF08A 0%, #FDE047 30%, #F59E0B 75%, #D97706 100%)',
        }}
      />

      {/* Gentle Warm Sun in Top-Right */}
      <div
        style={{
          position: 'absolute',
          right: 80,
          top: 140,
          width: 280,
          height: 280,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #FFFFFF 0%, #FEF08A 55%, rgba(245, 158, 11, 0) 80%)',
          boxShadow: '0 0 100px rgba(254, 240, 138, 0.75)',
        }}
      />

      {/* Distant Golden Rolling Hill */}
      <div
        style={{
          position: 'absolute',
          left: -200,
          top: 720,
          width: 1480,
          height: 800,
          borderRadius: '50%',
          background: 'linear-gradient(180deg, #34D399 0%, #059669 45%, #047857 100%)',
          boxShadow: '0 -15px 40px rgba(5, 150, 105, 0.35)',
        }}
      />

      {/* Foreground Lush Emerald Hill */}
      <div
        style={{
          position: 'absolute',
          left: -150,
          top: 880,
          width: 1380,
          height: 1100,
          borderRadius: '50%',
          background: 'linear-gradient(180deg, #10B981 0%, #047857 60%, #064E3B 100%)',
          boxShadow: '0 -20px 50px rgba(4, 120, 87, 0.4)',
        }}
      />

      {/* Floating Warm Firefly Moters / Pollen (Warm Golden Flecks) */}
      {[...Array(16)].map((_, i) => {
        const x = (i * 73 + frame * 0.8) % 1080;
        const y = 300 + ((i * 89 + frame * 0.5) % 950);
        const float = Math.sin((frame + i * 25) * 0.08) * 12;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: x,
              top: y + float,
              width: 8 + (i % 3) * 4,
              height: 8 + (i % 3) * 4,
              borderRadius: '50%',
              background: '#FFFBEB',
              boxShadow: '0 0 16px rgba(254, 240, 138, 0.95)',
              opacity: 0.75,
              pointerEvents: 'none',
            }}
          />
        );
      })}

      {/* =====================================================================
          TOP TITLE ZONE (y: 120 - 260px)
          ===================================================================== */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 130,
          textAlign: 'center',
          fontFamily: FONT_KIDS,
          padding: '0 40px',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            fontSize: 26,
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#B45309',
            background: 'rgba(255, 251, 235, 0.9)',
            padding: '8px 24px',
            borderRadius: 9999,
            border: '2px solid rgba(217, 119, 6, 0.35)',
            boxShadow: '0 8px 20px rgba(180, 83, 9, 0.25)',
            marginBottom: 12,
          }}
        >
          ANIMAL SECRETS
        </span>

        <h1
          style={{
            fontSize: 54,
            fontWeight: 800,
            color: '#FFFFFF',
            WebkitTextStroke: '4px #3D220A',
            textShadow: '0 6px 18px rgba(61, 34, 10, 0.65)',
            lineHeight: 1.15,
            margin: 0,
          }}
        >
          What Dogs & Cats Say!
        </h1>
      </div>

      {/* =====================================================================
          MAIN CHARACTER STAGE (y: 650 - 1300px)
          Zero overlap guarantee: Captions begin well below at y = 1420px!
          ===================================================================== */}
      <div style={{ transform: `translateY(${cameraDriftY}px)` }}>
        {/* Milo the Shiba Dog */}
        <ShibaDog
          x={340}
          y={1020}
          size={430}
          isTalking={isDogTalking}
          isWaggingFast={isDogTalking || t >= 24}
        />

        {/* Luna the Tabby Cat */}
        <TabbyCat
          x={750}
          y={1040}
          size={410}
          isTalking={isCatTalking}
          isTailFlicking={isCatTalking}
        />

        {/* Floating Hearts during the Best Friends Scene */}
        {showHearts &&
          [...Array(6)].map((_, i) => {
            const progress = (frame - 720 + i * 25) % 180;
            const heartY = 880 - progress * 2.5;
            const heartX = 540 + Math.sin(progress * 0.1) * 60;
            const heartScale = 0.6 + (progress / 180) * 0.5;
            const heartOpacity = Math.max(0, 1 - progress / 160);

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: heartX,
                  top: heartY,
                  transform: `translate(-50%, -50%) scale(${heartScale})`,
                  opacity: heartOpacity,
                  fontSize: 54,
                  filter: 'drop-shadow(0 8px 16px rgba(225, 29, 72, 0.45))',
                }}
              >
                ❤️
              </div>
            );
          })}
      </div>

      {/* =====================================================================
          BOTTOM CAPTIONS ZONE (y: 1420 - 1620px)
          Strictly bounded, chunky readable text on translucent wooden plate
          ===================================================================== */}
      <NatureCaptions lines={VO} />

      {/* Frame-0 Seamless Crossfade */}
      {loopFade > 0 && (
        <AbsoluteFill
          style={{
            opacity: loopFade,
            background: 'linear-gradient(180deg, #FEF08A 0%, #FDE047 30%, #F59E0B 75%, #D97706 100%)',
          }}
        />
      )}
    </AbsoluteFill>
  );
};

export default Short15Animals;
