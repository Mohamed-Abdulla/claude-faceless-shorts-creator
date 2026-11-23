import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
} from 'remotion';
import { VO } from './vo.gen';
import { SheruBhaiCharacter } from './SheruBhaiCharacter';

export const compositionConfig = {
  id: 'Short16SheruBhai',
  durationInSeconds: 32,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// TAMIL WORD-BY-WORD SYNCED CAPTIONS
// Gold and White typography inside safe zone (y = 1440px)
// =============================================================================
const TamilCaptions: React.FC<{ lines: typeof VO }> = ({ lines }) => {
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
        left: 50,
        right: 50,
        top: 1440,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px 14px',
        padding: '24px 30px',
        borderRadius: 30,
        background: 'rgba(9, 12, 16, 0.88)',
        backdropFilter: 'blur(20px)',
        border: '2px solid rgba(245, 158, 11, 0.55)',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.8), 0 0 25px rgba(245, 158, 11, 0.25)',
        fontFamily: "'Mukta Malar', 'Catamaran', 'Noto Sans Tamil', -apple-system, sans-serif",
        zIndex: 50,
      }}
    >
      {activeLine.words && activeLine.words.length > 0 ? (
        activeLine.words.map((w, i) => {
          const isSpoken = t >= w.start && t <= w.end + 0.1;
          return (
            <span
              key={i}
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: isSpoken ? '#FBBF24' : '#F1F5F9',
                WebkitTextStroke: isSpoken ? '1.5px #B45309' : '1px #0F172A',
                textShadow: isSpoken
                  ? '0 0 20px rgba(245, 158, 11, 0.9), 0 4px 10px rgba(0,0,0,0.8)'
                  : '0 4px 8px rgba(0, 0, 0, 0.6)',
                transform: isSpoken ? 'scale(1.18)' : 'scale(1)',
                transition: 'transform 0.08s ease, color 0.08s ease',
                display: 'inline-block',
                letterSpacing: '0.5px',
              }}
            >
              {w.w}
            </span>
          );
        })
      ) : (
        <span
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: '#FBBF24',
            textShadow: '0 4px 12px rgba(0,0,0,0.8)',
          }}
        >
          {activeLine.text}
        </span>
      )}
    </div>
  );
};

// =============================================================================
// FLOATING GOLD PARTICLES
// =============================================================================
const GoldEmbers: React.FC = () => {
  const frame = useCurrentFrame();
  const particles = Array.from({ length: 24 }).map((_, i) => {
    const speed = 1.2 + (i % 5) * 0.4;
    const y = 1920 - ((frame * speed * 3 + i * 90) % 2000);
    const x = (i * 47 + Math.sin((frame + i * 10) * 0.05) * 60) % 1080;
    const size = 4 + (i % 4) * 3;
    const opacity = 0.3 + 0.5 * Math.sin((frame + i * 15) * 0.08);
    return { x, y, size, opacity };
  });

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
      {particles.map((p, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #FDE68A 0%, #F59E0B 70%, transparent 100%)',
            opacity: p.opacity,
            boxShadow: '0 0 10px #F59E0B',
          }}
        />
      ))}
    </div>
  );
};

// =============================================================================
// SCENE 0: HOOK - THE VIRAL ENTRANCE (0s - 5.2s / Frame 0 - 156)
// =============================================================================
const SceneHook: React.FC = () => {
  const frame = useCurrentFrame();

  const entrance = spring({
    frame,
    fps: 30,
    config: { damping: 14, stiffness: 90 },
  });
  const charScale = interpolate(entrance, [0, 1], [0.8, 1.05]);
  const charY = interpolate(entrance, [0, 1], [200, 0]);

  // Spotlight angle sway
  const spotAngle = Math.sin(frame * 0.05) * 12;

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Volumetric Spotlights */}
      <div
        style={{
          position: 'absolute',
          top: -200,
          left: 100,
          width: 250,
          height: 1800,
          background: 'linear-gradient(to bottom, rgba(245, 158, 11, 0.22), transparent)',
          transform: `rotate(${20 + spotAngle}deg)`,
          transformOrigin: 'top center',
          filter: 'blur(40px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: -200,
          right: 100,
          width: 250,
          height: 1800,
          background: 'linear-gradient(to bottom, rgba(245, 158, 11, 0.22), transparent)',
          transform: `rotate(${-20 - spotAngle}deg)`,
          transformOrigin: 'top center',
          filter: 'blur(40px)',
        }}
      />

      {/* Top Trending Badge */}
      <div
        style={{
          position: 'absolute',
          top: 130,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            padding: '12px 32px',
            borderRadius: 999,
            background: 'linear-gradient(90deg, #B45309, #F59E0B, #B45309)',
            border: '2px solid #FDE68A',
            boxShadow: '0 0 30px rgba(245, 158, 11, 0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 26 }}>🔥</span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: '#090C10',
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontFamily: 'Arial Black, sans-serif',
            }}
          >
            INTERNET SENSATION
          </span>
          <span style={{ fontSize: 26 }}>🔥</span>
        </div>
      </div>

      {/* Main Hook Question */}
      <div
        style={{
          position: 'absolute',
          top: 220,
          left: 40,
          right: 40,
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#FFFFFF',
            margin: 0,
            textShadow: '0 8px 30px rgba(0,0,0,0.9), 0 0 30px rgba(245, 158, 11, 0.5)',
            fontFamily: "'Mukta Malar', 'Catamaran', sans-serif",
          }}
        >
          யார் இந்த <span style={{ color: '#FBBF24' }}>ஷேரு பாய்?</span>
        </h1>
        <p
          style={{
            fontSize: 28,
            color: '#94A3B8',
            marginTop: 10,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          THE DESI BILLIONAIRE LION
        </p>
      </div>

      {/* Sheru Bhai Character Center */}
      <div
        style={{
          position: 'absolute',
          top: 500,
          left: '50%',
          transform: `translateX(-50%) translateY(${charY}px)`,
        }}
      >
        <SheruBhaiCharacter scale={charScale} glassesDown={frame >= 18} />
      </div>
    </AbsoluteFill>
  );
};

// =============================================================================
// SCENE 1: THE BOSS DRIP SHOWCASE (5.2s - 11.2s / Frame 156 - 336)
// =============================================================================
const SceneBossDrip: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 156;

  const card1Spring = spring({ frame: relFrame - 10, fps: 30, config: { damping: 12 } });
  const card2Spring = spring({ frame: relFrame - 45, fps: 30, config: { damping: 12 } });
  const card3Spring = spring({ frame: relFrame - 80, fps: 30, config: { damping: 12 } });

  return (
    <AbsoluteFill>
      {/* Title */}
      <div style={{ position: 'absolute', top: 140, left: 60, right: 60, textAlign: 'center' }}>
        <h2
          style={{
            fontSize: 58,
            fontWeight: 900,
            color: '#FBBF24',
            margin: 0,
            textShadow: '0 6px 25px rgba(0,0,0,0.8)',
            fontFamily: "'Mukta Malar', 'Catamaran', sans-serif",
          }}
        >
          அல்டிமேட் கெத்து & ஆரா! 👑
        </h2>
      </div>

      {/* Sheru Bhai Left/Center */}
      <div
        style={{
          position: 'absolute',
          top: 480,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <SheruBhaiCharacter scale={1.0} glassesDown={true} />
      </div>

      {/* Floating Trait Badges */}
      {/* Trait 1: Golden Lion Head */}
      <div
        style={{
          position: 'absolute',
          top: 340,
          left: 60,
          opacity: interpolate(card1Spring, [0, 1], [0, 1]),
          transform: `translateX(${interpolate(card1Spring, [0, 1], [-80, 0])}px)`,
          padding: '16px 26px',
          borderRadius: 22,
          background: 'rgba(19, 26, 34, 0.92)',
          border: '2px solid #F59E0B',
          boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span style={{ fontSize: 40 }}>🦁</span>
        <div>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#FDE68A' }}>கோல்டன் சிங்கம் தலை</div>
          <div style={{ fontSize: 18, color: '#94A3B8' }}>Unmatched Royal Aura</div>
        </div>
      </div>

      {/* Trait 2: White 3-Piece Tuxedo */}
      <div
        style={{
          position: 'absolute',
          top: 600,
          right: 50,
          opacity: interpolate(card2Spring, [0, 1], [0, 1]),
          transform: `translateX(${interpolate(card2Spring, [0, 1], [80, 0])}px)`,
          padding: '16px 26px',
          borderRadius: 22,
          background: 'rgba(19, 26, 34, 0.92)',
          border: '2px solid #FFFFFF',
          boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span style={{ fontSize: 40 }}>👔</span>
        <div>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#FFFFFF' }}>வெள்ள த்ரீ-பீஸ் சூட்</div>
          <div style={{ fontSize: 18, color: '#94A3B8' }}>Pristine Billionaire Fit</div>
        </div>
      </div>

      {/* Trait 3: Gold Chain & Black Shades */}
      <div
        style={{
          position: 'absolute',
          top: 920,
          left: 60,
          opacity: interpolate(card3Spring, [0, 1], [0, 1]),
          transform: `translateX(${interpolate(card3Spring, [0, 1], [-80, 0])}px)`,
          padding: '16px 26px',
          borderRadius: 22,
          background: 'rgba(19, 26, 34, 0.92)',
          border: '2px solid #10B981',
          boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span style={{ fontSize: 40 }}>⛓️</span>
        <div>
          <div style={{ fontSize: 26, fontWeight: 800, color: '#10B981' }}>தங்க செயின் & கூலிங் கிளாஸ்</div>
          <div style={{ fontSize: 18, color: '#94A3B8' }}>Cuban Gold & Aviators</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =============================================================================
// SCENE 2: THE AUCTION FLEX & CHEQUE BOOK (11.2s - 17.2s / Frame 336 - 516)
// =============================================================================
const SceneAuctionFlex: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 336;

  // Gavel slam
  const gavelAngle = interpolate(relFrame, [0, 20, 26, 35], [-45, 0, -8, 0], {
    extrapolateRight: 'clamp',
  });

  // Stamp impact spring
  const stampSpring = spring({ frame: relFrame - 40, fps: 30, config: { damping: 10, stiffness: 120 } });
  const stampScale = interpolate(stampSpring, [0, 1], [2.2, 1]);

  // Currency notes falling
  const notes = Array.from({ length: 12 }).map((_, i) => {
    const y = ((relFrame * 12 + i * 160) % 1800) - 200;
    const x = 80 + (i * 90) % 920;
    const rot = Math.sin((relFrame + i * 20) * 0.1) * 35;
    return { x, y, rot };
  });

  return (
    <AbsoluteFill>
      {/* Falling Gold Banknotes */}
      {notes.map((n, idx) => (
        <div
          key={idx}
          style={{
            position: 'absolute',
            left: n.x,
            top: n.y,
            width: 140,
            height: 70,
            background: 'linear-gradient(135deg, #10B981, #064E3B)',
            border: '2px solid #34D399',
            borderRadius: 8,
            boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
            transform: `rotate(${n.rot}deg)`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#FFFFFF',
            fontWeight: 900,
            fontSize: 22,
            opacity: 0.65,
            pointerEvents: 'none',
          }}
        >
          ₹ 2000
        </div>
      ))}

      {/* Header */}
      <div style={{ position: 'absolute', top: 130, left: 40, right: 40, textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '8px 24px',
            background: '#EF4444',
            color: '#FFFFFF',
            fontWeight: 900,
            fontSize: 22,
            borderRadius: 999,
            marginBottom: 12,
          }}
        >
          💥 LUXURY AUCTION HOUSE
        </div>
        <h2
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: '#FFFFFF',
            margin: 0,
            fontFamily: "'Mukta Malar', 'Catamaran', sans-serif",
          }}
        >
          ஹாலையே விலைக்கு வாங்குனார்! 🏛️
        </h2>
      </div>

      {/* Auction Podium & Gavel */}
      <div style={{ position: 'absolute', top: 380, left: 100, display: 'flex', alignItems: 'center', gap: 30 }}>
        {/* Gavel */}
        <div
          style={{
            transform: `rotate(${gavelAngle}deg)`,
            transformOrigin: 'bottom right',
          }}
        >
          <div style={{ width: 45, height: 110, background: '#78350F', borderRadius: 8, margin: '0 auto' }} />
          <div
            style={{
              width: 130,
              height: 55,
              background: 'linear-gradient(90deg, #F59E0B, #B45309)',
              borderRadius: 12,
              border: '3px solid #FEF08A',
              boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
              marginTop: -10,
            }}
          />
        </div>
        <div>
          <div style={{ fontSize: 24, color: '#EF4444', fontWeight: 900 }}>AUCTION STATUS:</div>
          <div style={{ fontSize: 38, color: '#FBBF24', fontWeight: 900 }}>SOLD OUT TO SHERU!</div>
        </div>
      </div>

      {/* Giant Golden VIP Cheque */}
      <div
        style={{
          position: 'absolute',
          top: 620,
          left: 50,
          right: 50,
          background: 'linear-gradient(135deg, #1E293B, #0F172A)',
          border: '3px solid #F59E0B',
          borderRadius: 24,
          padding: '30px 40px',
          boxShadow: '0 25px 60px rgba(0,0,0,0.85), 0 0 40px rgba(245, 158, 11, 0.3)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: '#F59E0B', letterSpacing: 2 }}>
            👑 ROYAL DESI BANK
          </div>
          <div style={{ fontSize: 20, color: '#94A3B8' }}>PAY CHEQUE</div>
        </div>

        <div style={{ marginTop: 24, borderBottom: '2px dashed #475569', paddingBottom: 14 }}>
          <span style={{ color: '#94A3B8', fontSize: 20 }}>PAY TO: </span>
          <span style={{ fontSize: 32, fontWeight: 900, color: '#FFFFFF' }}>THE ENTIRE AUCTION HALL</span>
        </div>

        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#94A3B8', fontSize: 18 }}>AMOUNT IN FIGURES:</div>
            <div style={{ fontSize: 44, fontWeight: 900, color: '#10B981', fontFamily: 'monospace' }}>
              ₹ 999,999,999,999
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ color: '#94A3B8', fontSize: 16 }}>AUTHORIZED SIGNATURE:</div>
            <div style={{ fontSize: 34, fontFamily: 'cursive', color: '#F59E0B', fontWeight: 'bold' }}>
              Sheru Bhai ✍️
            </div>
          </div>
        </div>

        {/* Slammed RED "SOLD OUT" STAMP */}
        {relFrame >= 40 && (
          <div
            style={{
              position: 'absolute',
              top: '30%',
              left: '20%',
              transform: `scale(${stampScale}) rotate(-14deg)`,
              padding: '16px 40px',
              border: '6px solid #EF4444',
              borderRadius: 16,
              color: '#EF4444',
              fontWeight: 900,
              fontSize: 42,
              letterSpacing: 4,
              textTransform: 'uppercase',
              background: 'rgba(239, 68, 68, 0.15)',
              boxShadow: '0 0 40px rgba(239, 68, 68, 0.6)',
            }}
          >
            PAID IN FULL - SOLD!
          </div>
        )}
      </div>

      {/* Mini Sheru Bhai in corner flexing */}
      <div style={{ position: 'absolute', top: 980, right: 60 }}>
        <SheruBhaiCharacter scale={0.7} glassesDown={true} />
      </div>
    </AbsoluteFill>
  );
};

// =============================================================================
// SCENE 3: THE ATM SYSTEM CRASH GLITCH (17.2s - 23.2s / Frame 516 - 696)
// =============================================================================
const SceneAtmGlitch: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 516;

  // Balance spinning up rapidly
  const digits = Math.min(relFrame * 987654321, 999999999999999);
  const isCrashed = relFrame >= 45;
  const glitchOffset = isCrashed ? (Math.sin(relFrame * 1.5) * 8) : 0;

  return (
    <AbsoluteFill>
      {/* Header */}
      <div style={{ position: 'absolute', top: 130, left: 40, right: 40, textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-block',
            padding: '8px 24px',
            background: '#047857',
            color: '#FFFFFF',
            fontWeight: 900,
            fontSize: 22,
            borderRadius: 999,
            marginBottom: 12,
          }}
        >
          🏧 24/7 ATM TERMINAL
        </div>
        <h2
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: '#FFFFFF',
            margin: 0,
            fontFamily: "'Mukta Malar', 'Catamaran', sans-serif",
          }}
        >
          மிஷினே ஹேங் ஆயிடுச்சு! 💥
        </h2>
      </div>

      {/* ATM Machine Screen Container */}
      <div
        style={{
          position: 'absolute',
          top: 340,
          left: 60,
          right: 60,
          background: isCrashed ? '#1E1B4B' : '#0F172A',
          border: isCrashed ? '4px solid #EF4444' : '3px solid #10B981',
          borderRadius: 28,
          padding: '36px',
          boxShadow: isCrashed
            ? '0 0 60px rgba(239, 68, 68, 0.7)'
            : '0 25px 60px rgba(0,0,0,0.85)',
          transform: `translateX(${glitchOffset}px)`,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 900, color: '#10B981' }}>
            💳 TITANIUM BLACK VIP CARD
          </div>
          <div style={{ fontSize: 20, color: '#94A3B8' }}>CARD ACCEPTED</div>
        </div>

        <div style={{ marginTop: 30, background: '#020617', padding: '24px', borderRadius: 16 }}>
          <div style={{ fontSize: 20, color: '#94A3B8' }}>ACCOUNT HOLDER:</div>
          <div style={{ fontSize: 34, fontWeight: 900, color: '#FDE68A', marginTop: 4 }}>
            SHERU BHAI (BOSS) 🦁
          </div>

          <div style={{ fontSize: 20, color: '#94A3B8', marginTop: 24 }}>ACCOUNT BALANCE:</div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 900,
              color: isCrashed ? '#EF4444' : '#10B981',
              fontFamily: 'monospace',
              letterSpacing: 2,
              marginTop: 6,
            }}
          >
            {isCrashed ? '₹ ∞,∞∞∞,∞∞∞,∞∞∞' : `₹ ${digits.toLocaleString()}`}
          </div>
        </div>

        {/* Glitch Crash Alert Box */}
        {isCrashed && (
          <div
            style={{
              marginTop: 24,
              padding: '20px',
              borderRadius: 16,
              background: '#7F1D1D',
              border: '2px solid #F87171',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 28, fontWeight: 900, color: '#FFFFFF' }}>
              ⚠️ FATAL SYSTEM OVERFLOW!
            </div>
            <div style={{ fontSize: 22, color: '#FCA5A5', marginTop: 8 }}>
              ERROR 404: TOO MUCH MONEY FOR BANK CPU!
            </div>
          </div>
        )}
      </div>

      {/* Sheru Bhai Smirking Under ATM */}
      <div style={{ position: 'absolute', top: 960, left: '50%', transform: 'translateX(-50%)' }}>
        <SheruBhaiCharacter scale={0.85} glassesDown={true} mouthOpen={isCrashed} />
      </div>
    </AbsoluteFill>
  );
};

// =============================================================================
// SCENE 4: ROYAL THRONE & POWER FLEX (23.2s - 28.0s / Frame 696 - 840)
// =============================================================================
const SceneThronePower: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 696;

  // Floating Crown bob
  const crownBob = Math.sin(relFrame * 0.15) * 10;

  return (
    <AbsoluteFill>
      {/* Header */}
      <div style={{ position: 'absolute', top: 130, left: 40, right: 40, textAlign: 'center' }}>
        <h2
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: '#FBBF24',
            margin: 0,
            fontFamily: "'Mukta Malar', 'Catamaran', sans-serif",
            textShadow: '0 8px 30px rgba(0,0,0,0.9)',
          }}
        >
          சோஷியல் மீடியாவுக்கே பாஸ்! 🦁
        </h2>
      </div>

      {/* Royal Throne Background */}
      <div
        style={{
          position: 'absolute',
          top: 380,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 580,
          height: 680,
          background: 'linear-gradient(180deg, #78350F 0%, #451A03 100%)',
          borderRadius: '260px 260px 40px 40px',
          border: '6px solid #F59E0B',
          boxShadow: '0 30px 80px rgba(0,0,0,0.95), 0 0 60px rgba(245, 158, 11, 0.4)',
        }}
      >
        {/* Gold Throne Accents */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #FEF08A, #F59E0B)',
            boxShadow: '0 0 30px #F59E0B',
          }}
        />
      </div>

      {/* Floating Crown above head */}
      <div
        style={{
          position: 'absolute',
          top: 310 + crownBob,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 84,
          filter: 'drop-shadow(0 0 25px #F59E0B)',
          zIndex: 20,
        }}
      >
        👑
      </div>

      {/* Sheru Bhai Sitting Regal */}
      <div style={{ position: 'absolute', top: 480, left: '50%', transform: 'translateX(-50%)' }}>
        <SheruBhaiCharacter scale={1.05} glassesDown={true} />
      </div>

      {/* Viral Stats Badges */}
      <div
        style={{
          position: 'absolute',
          top: 1040,
          left: 60,
          right: 60,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div
          style={{
            flex: 1,
            padding: '16px',
            background: 'rgba(19, 26, 34, 0.95)',
            border: '2px solid #F59E0B',
            borderRadius: 20,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 900, color: '#FBBF24' }}>100M+</div>
          <div style={{ fontSize: 16, color: '#94A3B8' }}>REELS VIEWS</div>
        </div>
        <div
          style={{
            flex: 1,
            padding: '16px',
            background: 'rgba(19, 26, 34, 0.95)',
            border: '2px solid #10B981',
            borderRadius: 20,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 900, color: '#10B981' }}>999,999+</div>
          <div style={{ fontSize: 16, color: '#94A3B8' }}>AURA POINTS</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// =============================================================================
// SCENE 5: SEAMLESS LOOP TRANSITION (28.0s - 32.0s / Frame 840 - 960)
// Matches Scene 0 perfectly for infinite loop replay
// =============================================================================
const SceneLoopOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const relFrame = frame - 840;

  // Camera Flash Pulses
  const flash = relFrame % 14 < 3 ? 0.35 : 0;

  return (
    <AbsoluteFill>
      {/* Paparazzi Flash Overlay */}
      {flash > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#FFFFFF',
            opacity: flash,
            pointerEvents: 'none',
            zIndex: 40,
          }}
        />
      )}

      {/* Outro Prompt */}
      <div style={{ position: 'absolute', top: 220, left: 40, right: 40, textAlign: 'center' }}>
        <p
          style={{
            fontSize: 32,
            color: '#94A3B8',
            margin: 0,
            fontWeight: 700,
            fontFamily: "'Mukta Malar', 'Catamaran', sans-serif",
          }}
        >
          அதனால தான் மறுபடியும் கேக்குறாங்க...
        </p>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: '#FFFFFF',
            marginTop: 16,
            textShadow: '0 8px 30px rgba(0,0,0,0.9), 0 0 30px rgba(245, 158, 11, 0.6)',
            fontFamily: "'Mukta Malar', 'Catamaran', sans-serif",
          }}
        >
          யார் இந்த <span style={{ color: '#FBBF24' }}>ஷேரு பாய்?</span>
        </h1>
      </div>

      {/* Sheru Bhai Center matching frame 0 zoom */}
      <div style={{ position: 'absolute', top: 500, left: '50%', transform: 'translateX(-50%)' }}>
        <SheruBhaiCharacter scale={1.05} glassesDown={true} />
      </div>
    </AbsoluteFill>
  );
};

// =============================================================================
// MAIN COMPOSITION: SHORT 16 - SHERU BHAI (TAMIL VIRAL SHORT)
// =============================================================================
export const Short16SheruBhai: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#090C10',
        fontFamily: "'Mukta Malar', 'Catamaran', -apple-system, sans-serif",
      }}
    >
      {/* Dynamic Background Mesh */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 35%, #1A1308 0%, #090C10 75%)',
        }}
      />

      {/* Gold Floating Embers */}
      <GoldEmbers />

      {/* Beat Scenes (Sequential) */}
      {frame < 156 && <SceneHook />}
      {frame >= 156 && frame < 336 && <SceneBossDrip />}
      {frame >= 336 && frame < 516 && <SceneAuctionFlex />}
      {frame >= 516 && frame < 696 && <SceneAtmGlitch />}
      {frame >= 696 && frame < 840 && <SceneThronePower />}
      {frame >= 840 && <SceneLoopOutro />}

      {/* Tamil Word-By-Word Synced Captions */}
      <TamilCaptions lines={VO} />
    </AbsoluteFill>
  );
};

export default Short16SheruBhai;

