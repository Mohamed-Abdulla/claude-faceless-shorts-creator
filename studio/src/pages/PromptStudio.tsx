import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Terminal,
  FileText,
  Volume2,
  Brain,
  Zap,
  Globe
} from 'lucide-react';
import { PromptTemplate } from '../lib/types';
import { api } from '../lib/api';

export const PromptStudio: React.FC = () => {
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [topic, setTopic] = useState('Secret Animal Language: What Dogs and Cats Actually Say to Each Other');
  const [voiceTone, setVoiceTone] = useState('en-US-AvaMultilingualNeural');
  const [durationSec, setDurationSec] = useState(35);
  const [customInstructions, setCustomInstructions] = useState(
    'Warm earthy colors (golden sun #FDE047, emerald meadow #10B981, warm amber #F59E0B) with NO purplish hues. Chunky Fredoka captions at y=1420 with zero overlap.'
  );

  // Active prompt mode tab on the right
  const [promptMode, setPromptMode] = useState<'antigravity' | 'chatgpt' | 'cli'>('antigravity');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  useEffect(() => {
    api.getTemplates().then((tpls) => {
      setTemplates(tpls);
    });
  }, []);

  const handleApplyPreset = (tpl: PromptTemplate) => {
    setTopic(tpl.defaultTopic);
    setVoiceTone(tpl.suggestedVoice.split(' ')[0]);
  };

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // 1. Direct Antigravity Prompt
  const antigravityPrompt = `Create a new 100% TSX Remotion short (/make-short):
Topic: "${topic}"
Duration: ~${durationSec} seconds
Voice Engine: Free Edge-TTS (${voiceTone}) with word-level boundaries
Style & Color Palette:
- ${customInstructions}
- Warm, rich, pleasing colors (warm amber, gold, emerald green) — absolutely NO purplish or neon hues
- Rhythmic background music with soft ducking under speech
- Safe zones: Captions strictly at y=1420-1620, zero text overlap with background elements
- End with seamless frame-0 infinite loop and no CTA outro.`;

  // 2. Meta-Prompt Template for ChatGPT / Claude AI
  const chatGptMetaPrompt = `You are an elite video director and scriptwriter for viral vertical YouTube Shorts & Instagram Reels (1080x1920, 30fps).
I produce videos using an autonomous code-based Remotion TSX pipeline powered by Google Antigravity.

MY TOPIC: "${topic}"
TARGET DURATION: ~${durationSec} seconds (approximately ${Math.round(durationSec * 2.7)} words of speech)
VOICE ENGINE: Microsoft Edge-TTS (${voiceTone})

Please generate an ultra-detailed, cinema-grade video production plan that I can feed directly into Antigravity. Structure your response with these exact sections:

1. VIRAL TITLE & HOOK:
- A high-converting curiosity title (under 50 characters)
- The opening 3-second hook that stops the scroll immediately.

2. SIX-BEAT TIMED SCENE BREAKDOWN (Exact word-for-word voiceover script):
- Beat 1 (0s–4s): HOOK — Immediate visual surprise & curiosity statement
- Beat 2 (4s–10s): SETUP — Introduce the subject or problem clearly
- Beat 3 (10s–18s): CORE INSIGHT — The visual demonstration / main story twist
- Beat 4 (18s–24s): ACTION / CLIMAX — Key reaction, turning point, or challenge
- Beat 5 (24s–28s): TAKEAWAY — Satisfying conclusion / revelation
- Beat 6 (28s–${durationSec}s): SEAMLESS LOOP — Final frame visually and vocally loops back into Beat 1 with NO call-to-action outro.

3. COLOR PALETTE & VISUAL ASSETS (Zero purplish/bluish tones):
- Warm earthy background palette (Golden Sun, Emerald Meadows, Warm Amber, or Deep Obsidian)
- Describe 2D/2.5D SVG animated characters or interactive props (bounce, blink, wag/wiggle, facial visemes)
- Subtitle zone: Strictly at safe zone y = 1420px to 1620px (leaving the middle stage clear with zero text overlap).

4. AUDIO SPECIFICATION:
- Voice ID: ${voiceTone}
- Background Music style: (e.g. playful acoustic plucked strings, warm lo-fi beat, cinematic soft pad)

5. FINAL SYNTHESIZED ANTIGRAVITY PROMPT:
Wrap everything into a single clean copy-paste prompt formatted for Antigravity.`;

  // 3. CLI Command
  const shortSlug = topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 24);

  const cliCommand = `# 1. Generate Voice with Free Edge-TTS (${voiceTone})
python tools/gen_voice.py shorts/${shortSlug}/script.md shorts/${shortSlug}/voice/ --engine edge --voice ${voiceTone}

# 2. Synchronize Beat Transients
python tools/beat_sync.py shorts/${shortSlug}/voice/voice.wav shorts/${shortSlug}/beats.json

# 3. Preview Frame in Remotion
cd remotion && npx remotion still ${shortSlug.replace(/-/g, '')} ../shorts/${shortSlug}/output/preview.png --frame=60`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Prompt & Workflow Studio</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Custom Prompt Generator
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Craft tailored prompts directly for Antigravity, or generate ultra-detailed video specifications via ChatGPT / Claude AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Preset Buttons */}
          <div className="bg-[#0d1117] border border-slate-800 p-5 rounded-3xl shadow-xl">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Quick Topic Presets
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => handleApplyPreset(tpl)}
                  className="text-left p-3 rounded-2xl bg-[#090c10] hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 transition-all text-xs"
                >
                  <span className="font-bold text-white block">{tpl.name}</span>
                  <span className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {tpl.defaultTopic}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Settings */}
          <div className="bg-[#0d1117] border border-slate-800 p-6 rounded-3xl shadow-xl space-y-5">
            {/* Topic Input */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Video Topic & Story
              </label>
              <textarea
                rows={3}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Secret Animal Language: What Dogs and Cats Actually Say to Each Other..."
                className="w-full px-4 py-3 bg-[#090c10] border border-slate-800 focus:border-emerald-500 rounded-2xl text-xs text-white focus:outline-none leading-relaxed"
              />
            </div>

            {/* Voice Model with Tamil, Indian Regional & Global Voices */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Free Neural Voice</span>
                </label>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Tamil & Global Ready
                </span>
              </div>

              <select
                value={voiceTone}
                onChange={(e) => setVoiceTone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#090c10] border border-slate-800 focus:border-emerald-500 rounded-xl text-xs text-white focus:outline-none"
              >
                <optgroup label="🇮🇳 Tamil (தமிழ்) & Regional Indian">
                  <option value="ta-IN-PallaviNeural">ta-IN-PallaviNeural (Tamil - India Female, Friendly)</option>
                  <option value="ta-IN-ValluvarNeural">ta-IN-ValluvarNeural (Tamil - India Male, Clear & Positive)</option>
                  <option value="ta-LK-SaranyaNeural">ta-LK-SaranyaNeural (Tamil - Sri Lanka Female)</option>
                  <option value="ta-LK-KumarNeural">ta-LK-KumarNeural (Tamil - Sri Lanka Male)</option>
                  <option value="hi-IN-SwaraNeural">hi-IN-SwaraNeural (Hindi Female, Natural)</option>
                  <option value="hi-IN-MadhurNeural">hi-IN-MadhurNeural (Hindi Male, Confident)</option>
                  <option value="te-IN-ShrutiNeural">te-IN-ShrutiNeural (Telugu Female)</option>
                  <option value="te-IN-MohanNeural">te-IN-MohanNeural (Telugu Male)</option>
                  <option value="ml-IN-SobhanaNeural">ml-IN-SobhanaNeural (Malayalam Female)</option>
                  <option value="ml-IN-MidhunNeural">ml-IN-MidhunNeural (Malayalam Male)</option>
                  <option value="kn-IN-SapnaNeural">kn-IN-SapnaNeural (Kannada Female)</option>
                  <option value="kn-IN-GaganNeural">kn-IN-GaganNeural (Kannada Male)</option>
                  <option value="en-IN-NeerjaNeural">en-IN-NeerjaNeural (Indian English Female)</option>
                  <option value="en-IN-PrabhatNeural">en-IN-PrabhatNeural (Indian English Male)</option>
                </optgroup>

                <optgroup label="🎙️ English Narrators & Documentaries">
                  <option value="en-US-ChristopherNeural">en-US-ChristopherNeural (Deep Documentary Narrator - Default)</option>
                  <option value="en-US-EricNeural">en-US-EricNeural (Warm Male Storyteller)</option>
                  <option value="en-GB-RyanNeural">en-GB-RyanNeural (BBC Documentary British Male)</option>
                  <option value="en-GB-ThomasNeural">en-GB-ThomasNeural (Sophisticated UK Narrator)</option>
                </optgroup>

                <optgroup label="⚡ Tech & Fast Pace">
                  <option value="en-US-GuyNeural">en-US-GuyNeural (Casual Tech / Developer Male)</option>
                  <option value="en-US-SteffanNeural">en-US-SteffanNeural (Energetic & Dynamic)</option>
                  <option value="en-CA-LiamNeural">en-CA-LiamNeural (Canadian Modern Conversational)</option>
                </optgroup>

                <optgroup label="🧸 Kids, Rhymes & Cartoon Characters">
                  <option value="en-US-AnaNeural">en-US-AnaNeural (Cute Playful Child - Singing Rhymes)</option>
                  <option value="en-US-AvaMultilingualNeural">en-US-AvaMultilingualNeural (Expressive & Friendly Female)</option>
                  <option value="en-US-JennyNeural">en-US-JennyNeural (Gentle & Sweet Storybook)</option>
                  <option value="en-GB-SoniaNeural">en-GB-SoniaNeural (UK Expressive Female)</option>
                </optgroup>

                <optgroup label="🌟 Storytellers & Conversational">
                  <option value="en-US-AndrewMultilingualNeural">en-US-AndrewMultilingualNeural (Smooth Natural Male)</option>
                  <option value="en-US-BrianNeural">en-US-BrianNeural (Cinematic Deep Voice)</option>
                  <option value="en-US-EmmaMultilingualNeural">en-US-EmmaMultilingualNeural (Warm Professional Female)</option>
                  <option value="en-AU-NatNeural">en-AU-NatNeural (Australian Friendly Narrator)</option>
                  <option value="en-AU-WilliamNeural">en-AU-WilliamNeural (Australian Engaging Male)</option>
                  <option value="en-IE-ConnorNeural">en-IE-ConnorNeural (Irish Melodic Narrator)</option>
                  <option value="en-ZA-LukeNeural">en-ZA-LukeNeural (South African Clear Male)</option>
                </optgroup>
              </select>
              <p className="text-[11px] text-slate-500 mt-1.5">
                All voices stream free via Microsoft Edge Neural network without API keys.
              </p>
            </div>

            {/* Duration Slider */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-bold text-slate-400 uppercase tracking-wider">
                  Target Duration
                </span>
                <span className="text-emerald-400 font-bold">{durationSec} seconds</span>
              </div>
              <input
                type="range"
                min={20}
                max={55}
                step={5}
                value={durationSec}
                onChange={(e) => setDurationSec(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Custom Polish Instructions */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Color Palette & Visual Rules
              </label>
              <textarea
                rows={2}
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#090c10] border border-slate-800 focus:border-emerald-500 rounded-xl text-xs text-slate-300 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Output Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Tab Selector: Antigravity vs ChatGPT / Claude vs CLI */}
          <div className="flex items-center gap-2 p-1.5 bg-[#0d1117] border border-slate-800 rounded-2xl">
            <button
              onClick={() => setPromptMode('antigravity')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                promptMode === 'antigravity'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>⚡ Antigravity Direct Prompt</span>
            </button>
            <button
              onClick={() => setPromptMode('chatgpt')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                promptMode === 'chatgpt'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Brain className="w-3.5 h-3.5 text-emerald-300" />
              <span>🧠 ChatGPT / Claude AI Meta-Prompt</span>
            </button>
            <button
              onClick={() => setPromptMode('cli')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                promptMode === 'cli'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5 text-slate-300" />
              <span>💻 CLI Commands</span>
            </button>
          </div>

          {/* Mode 1: Antigravity Direct Prompt */}
          {promptMode === 'antigravity' && (
            <div className="bg-[#0d1117] border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col animate-in fade-in">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-bold text-white">
                    Direct Antigravity Command Prompt
                  </h3>
                </div>
                <button
                  onClick={() => copyToClipboard(antigravityPrompt, 'antigravity')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/25 transition-all"
                >
                  {copiedSection === 'antigravity' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-400 mb-3">
                Paste this prompt directly into Antigravity to autonomously build, voice, and render your short:
              </p>

              <div className="relative bg-[#090c10] p-4 rounded-2xl border border-slate-800">
                <pre className="text-xs text-emerald-200 whitespace-pre-wrap font-mono leading-relaxed select-all">
                  {antigravityPrompt}
                </pre>
              </div>
            </div>
          )}

          {/* Mode 2: ChatGPT / Claude AI Meta-Prompt Template */}
          {promptMode === 'chatgpt' && (
            <div className="bg-[#0d1117] border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col animate-in fade-in">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Brain className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">
                    Meta-Prompt Template for ChatGPT / Claude
                  </h3>
                </div>
                <button
                  onClick={() => copyToClipboard(chatGptMetaPrompt, 'chatgpt')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/25 transition-all"
                >
                  {copiedSection === 'chatgpt' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Template</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-400 mb-3">
                Paste this template into <strong>ChatGPT</strong> or <strong>Claude AI</strong>. It will research your topic and output an ultra-detailed, timed 6-beat specification ready for Antigravity:
              </p>

              <div className="relative bg-[#090c10] p-4 rounded-2xl border border-slate-800 max-h-[480px] overflow-y-auto">
                <pre className="text-xs text-slate-200 whitespace-pre-wrap font-mono leading-relaxed select-all">
                  {chatGptMetaPrompt}
                </pre>
              </div>
            </div>
          )}

          {/* Mode 3: Terminal CLI Execution Card */}
          {promptMode === 'cli' && (
            <div className="bg-[#0d1117] border border-slate-800 p-6 rounded-3xl shadow-xl animate-in fade-in">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">Manual CLI Workflow Commands</h3>
                </div>
                <button
                  onClick={() => copyToClipboard(cliCommand, 'cli')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 rounded-xl text-xs font-semibold border border-slate-800 transition-all"
                >
                  {copiedSection === 'cli' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Commands</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-400 mb-3">
                Direct terminal commands to generate free voiceover, detect beat transients, and render previews:
              </p>

              <div className="bg-[#090c10] p-4 rounded-2xl border border-slate-800">
                <pre className="text-xs text-emerald-300 whitespace-pre-wrap font-mono leading-relaxed">
                  {cliCommand}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
