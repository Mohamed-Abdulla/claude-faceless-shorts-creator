import React from 'react';
import { AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame } from 'remotion';
import { BigTitle, Captions, Kicker, ProgressBar, ShortsBackdrop, Stamp, prog } from '../../lib/shorts';
import { TerminalWindow } from '../../lib/terminal';
import { VO } from './vo.gen';

// =============================================================================
// COMPOSITION CONFIG
// =============================================================================
export const compositionConfig = {
  id: 'Short13CodeVideo',
  durationInSeconds: 36,
  fps: 30,
  width: 1080,
  height: 1920,
};

// =============================================================================
// STYLE & PALETTE
// =============================================================================
const ACCENT = '#f5d76e'; // Gold accent for captions and highlights
const GREEN = '#54c982';  // Free / Success green
const BLUE = '#58a6ff';   // Tech blue
const PURPLE = '#bc8cff'; // AI purple
const RED = '#ff7b72';    // Warning red

export const Short13CodeVideo: React.FC = () => {
  const frame = useCurrentFrame();

  // Seamless loop fade: at the very end (frame 1040-1080), blend back to frame 0
  const loopDissolve = interpolate(frame, [1040, 1079], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0d1117', color: '#ffffff', overflow: 'hidden' }}>
      <ShortsBackdrop />

      {/* Progress bar at the top safe area */}
      <ProgressBar color={ACCENT} />

      {/* =====================================================================
          SCENE 1: HOOK (Frames 0 - 110 | 0.0s - 3.7s)
          Payoff on screen at Frame 0: Subscriptions vs $0 Code
          ===================================================================== */}
      <Sequence from={0} durationInFrames={115}>
        <div style={{ position: 'absolute', top: 180, left: 60, right: 60, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Kicker text="STOP PAYING SUBSCRIPTIONS" color={RED} />
          <div style={{ height: 16 }} />
          <BigTitle lines={[{ text: 'AI VIDEO FOR $0.00', color: '#ffffff' }]} warm />
          
          <div style={{ marginTop: 50, width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* The Expensive Trap Card */}
            <div
              style={{
                background: 'rgba(255, 123, 114, 0.1)',
                border: '2px solid rgba(255, 123, 114, 0.3)',
                borderRadius: 24,
                padding: '36px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
              }}
            >
              <div>
                <div style={{ fontSize: 26, color: '#8b949e', textDecoration: 'line-through' }}>Video Editor + AI Voice</div>
                <div style={{ fontSize: 38, fontWeight: 800, color: RED, marginTop: 4 }}>$80 / month</div>
              </div>
              <Stamp text="WASTE" color={RED} at={15} x={780} y={65} rotate={-10} size={50} />
            </div>

            {/* The Code-Driven $0 Card */}
            <div
              style={{
                background: 'rgba(84, 201, 130, 0.12)',
                border: `2px solid ${GREEN}`,
                borderRadius: 24,
                padding: '36px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 8px 32px rgba(84, 201, 130, 0.2)',
              }}
            >
              <div>
                <div style={{ fontSize: 26, color: GREEN, fontWeight: 600 }}>Remotion + Neural TTS</div>
                <div style={{ fontSize: 44, fontWeight: 900, color: '#ffffff', marginTop: 4 }}>$0.00 FOREVER</div>
              </div>
              <div style={{ background: GREEN, color: '#000000', padding: '10px 24px', borderRadius: 999, fontWeight: 800, fontSize: 22 }}>
                100% FREE
              </div>
            </div>
          </div>
        </div>
      </Sequence>

      {/* =====================================================================
          SCENE 2: SETUP — THE TERMINAL (Frames 110 - 255 | 3.7s - 8.5s)
          "Built with pure code"
          ===================================================================== */}
      <Sequence from={110} durationInFrames={150}>
        <div style={{ position: 'absolute', top: 180, left: 60, right: 60, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Kicker text="VIDEO-AS-CODE" color={BLUE} />
          <div style={{ height: 16 }} />
          <BigTitle lines={[{ text: '100% REACT & TSX', color: '#ffffff' }]} />
        </div>

        <TerminalWindow
          box={{ x: 60, y: 360, w: 960, h: 720 }}
          title="faceless-shorts — zsh"
          promptPath="faceless"
          fontSize={26}
          lineH={44}
          appearAt={115}
          lines={[
            { kind: 'cmd', text: 'npx remotion studio', type: true, at: 120 },
            { kind: 'ok', text: '✔ Bundler ready in 1.4s', at: 155 },
            { kind: 'out', text: '  - 15 compositions registered', at: 170 },
            { kind: 'out', text: '  - Frame rate: 60 FPS vector canvas', at: 185 },
            { kind: 'cmd', text: 'python tools/gen_voice.py --engine edge', type: true, at: 205 },
            { kind: 'ok', text: '✔ Voice: en-US-ChristopherNeural ($0.00)', at: 235 },
          ]}
        />
      </Sequence>

      {/* =====================================================================
          SCENE 3: STEP 1 — REMOTION (Frames 255 - 445 | 8.5s - 14.8s)
          "Instead of dragging timelines in Premiere..."
          ===================================================================== */}
      <Sequence from={255} durationInFrames={195}>
        <div style={{ position: 'absolute', top: 180, left: 60, right: 60, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Kicker text="STEP 1 : THE ENGINE" color={GREEN} />
          <div style={{ height: 16 }} />
          <BigTitle lines={[{ text: 'REMOTION (REACT)', color: '#ffffff' }]} />

          <div style={{ marginTop: 50, width: '100%', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 20, padding: '30px', display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ fontSize: 44 }}>⚡</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#ffffff' }}>60 FPS Vector Graphics</div>
                <div style={{ fontSize: 22, color: '#8b949e', marginTop: 4 }}>No blurry pixels or low-res stock footage</div>
              </div>
            </div>

            <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 20, padding: '30px', display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ fontSize: 44 }}>📐</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: '#ffffff' }}>Programmatic Animations</div>
                <div style={{ fontSize: 22, color: '#8b949e', marginTop: 4 }}>useCurrentFrame() & interpolate() in pure TSX</div>
              </div>
            </div>

            <div style={{ background: '#161b22', border: `1px solid ${GREEN}`, borderRadius: 20, padding: '30px', display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ fontSize: 44 }}>🚀</div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 700, color: GREEN }}>Zero Render Lag</div>
                <div style={{ fontSize: 22, color: '#8b949e', marginTop: 4 }}>Headless Chrome + FFmpeg local encoding</div>
              </div>
            </div>
          </div>
        </div>
      </Sequence>

      {/* =====================================================================
          SCENE 4: STEP 2 — FREE NEURAL VOICE (Frames 445 - 635 | 14.8s - 21.2s)
          "Drop expensive ElevenLabs fees..."
          ===================================================================== */}
      <Sequence from={445} durationInFrames={195}>
        <div style={{ position: 'absolute', top: 180, left: 60, right: 60, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Kicker text="STEP 2 : AUDIO PIPELINE" color={ACCENT} />
          <div style={{ height: 16 }} />
          <BigTitle lines={[{ text: 'FREE NEURAL TTS', color: '#ffffff' }]} />

          {/* Animated Waveform Simulation */}
          <div style={{ marginTop: 60, height: 120, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            {[40, 80, 110, 60, 95, 120, 75, 110, 50, 90, 115, 65, 85, 45].map((h, i) => {
              const pulse = Math.sin(frame * 0.25 + i * 0.4) * 0.5 + 0.5;
              return (
                <div
                  key={i}
                  style={{
                    width: 14,
                    height: 20 + h * pulse,
                    background: i % 2 === 0 ? ACCENT : GREEN,
                    borderRadius: 999,
                    boxShadow: `0 0 16px ${ACCENT}40`,
                  }}
                />
              );
            })}
          </div>

          {/* Word Boundary Telemetry Card */}
          <div style={{ marginTop: 50, width: '100%', background: '#161b22', border: '1px solid #30363d', borderRadius: 24, padding: '32px' }}>
            <div style={{ fontSize: 22, color: '#8b949e', fontFamily: 'monospace' }}>WORD_BOUNDARY TELEMETRY:</div>
            <div style={{ marginTop: 14, fontSize: 26, fontFamily: 'monospace', color: GREEN }}>
              {`{ word: "locked", start: 20.73, end: 20.97 }`}
            </div>
            <div style={{ marginTop: 8, fontSize: 22, color: '#8b949e' }}>
              Karaoke subtitles lock to voice automatically with 0ms drift.
            </div>
          </div>
        </div>
      </Sequence>

      {/* =====================================================================
          SCENE 5: STEP 3 — AGENT SKILLS (Frames 635 - 830 | 21.2s - 27.7s)
          "Let an AI coding agent drive it..."
          ===================================================================== */}
      <Sequence from={635} durationInFrames={200}>
        <div style={{ position: 'absolute', top: 180, left: 60, right: 60, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Kicker text="STEP 3 : THE DIRECTOR" color={PURPLE} />
          <div style={{ height: 16 }} />
          <BigTitle lines={[{ text: 'AUTONOMOUS AGENT', color: '#ffffff' }]} />

          {/* Pipeline flow steps */}
          <div style={{ marginTop: 50, width: '100%', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 18, padding: '24px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 24, fontWeight: 600 }}>1. Topic Prompt</span>
              <span style={{ color: PURPLE, fontWeight: 700 }}>"How to code videos"</span>
            </div>
            <div style={{ textAlign: 'center', fontSize: 26, color: '#8b949e' }}>↓</div>
            <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: 18, padding: '24px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 24, fontWeight: 600 }}>2. Agent Skills</span>
              <span style={{ color: BLUE, fontWeight: 700 }}>beats.json + Remotion TSX</span>
            </div>
            <div style={{ textAlign: 'center', fontSize: 26, color: '#8b949e' }}>↓</div>
            <div style={{ background: 'rgba(84, 201, 130, 0.15)', border: `1px solid ${GREEN}`, borderRadius: 18, padding: '24px 30px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 24, fontWeight: 600, color: GREEN }}>3. Render Output</span>
              <span style={{ color: '#ffffff', fontWeight: 800 }}>1080x1920 MP4</span>
            </div>
          </div>
        </div>
      </Sequence>

      {/* =====================================================================
          SCENE 6: TWIST / TALLY (Frames 830 - 985 | 27.7s - 32.8s)
          "Zero stock footage, zero dollars spent..."
          ===================================================================== */}
      <Sequence from={830} durationInFrames={160}>
        <div style={{ position: 'absolute', top: 180, left: 60, right: 60, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Kicker text="TOTAL PRODUCTION COST" color={GREEN} />
          <div style={{ height: 16 }} />
          <BigTitle lines={[{ text: 'THE $0.00 BREAKDOWN', color: '#ffffff' }]} />

          {/* Receipt Card */}
          <div style={{ marginTop: 50, width: '100%', background: '#161b22', border: `2px solid ${GREEN}`, borderRadius: 24, padding: '36px', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #30363d', fontSize: 26 }}>
              <span>Stock Footage Clips</span>
              <span style={{ color: GREEN, fontWeight: 700 }}>$0.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #30363d', fontSize: 26 }}>
              <span>ElevenLabs API Credits</span>
              <span style={{ color: GREEN, fontWeight: 700 }}>$0.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #30363d', fontSize: 26 }}>
              <span>Video Editor Subscription</span>
              <span style={{ color: GREEN, fontWeight: 700 }}>$0.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px', fontSize: 32, fontWeight: 900 }}>
              <span>TOTAL COST</span>
              <span style={{ color: GREEN }}>$0.00</span>
            </div>
          </div>
        </div>
      </Sequence>

      {/* =====================================================================
          SCENE 7: LOOP (Frames 985 - 1080 | 32.8s - 36.0s)
          Seamless transition blending back to Frame 0
          ===================================================================== */}
      <Sequence from={985} durationInFrames={95}>
        <div style={{ position: 'absolute', top: 200, left: 60, right: 60, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Kicker text="INFINITE RETENTION LOOP" color={ACCENT} />
          <div style={{ height: 16 }} />
          <BigTitle lines={[{ text: 'START CODING VIDEOS', color: '#ffffff' }]} />

          <div style={{ marginTop: 80, textAlign: 'center' }}>
            <div style={{ fontSize: 72, color: ACCENT }}>🔁</div>
            <div style={{ fontSize: 32, fontWeight: 700, marginTop: 24 }}>Frame 0 == Last Frame</div>
            <div style={{ fontSize: 24, color: '#8b949e', marginTop: 12 }}>Seamless replay on YouTube & Reels</div>
          </div>
        </div>
      </Sequence>

      {/* Loop dissolve overlay to frame 0 */}
      {loopDissolve > 0 && (
        <AbsoluteFill style={{ opacity: loopDissolve, backgroundColor: '#0d1117' }} />
      )}

      {/* Word-by-word karaoke captions placed safely inside mobile viewports */}
      <Captions lines={VO} accent={ACCENT} y={1420} size={54} plate />
    </AbsoluteFill>
  );
};

export default Short13CodeVideo;
