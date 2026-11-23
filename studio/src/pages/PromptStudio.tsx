import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Terminal,
  FileText,
  Music,
  Sliders,
  Send,
  Volume2
} from 'lucide-react';
import { PromptTemplate } from '../lib/types';
import { api } from '../lib/api';

export const PromptStudio: React.FC = () => {
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [topic, setTopic] = useState('Secret Animal Language: What Dogs and Cats Actually Say to Each Other');
  const [voiceTone, setVoiceTone] = useState('en-US-GuyNeural');
  const [durationSec, setDurationSec] = useState(35);
  const [customInstructions, setCustomInstructions] = useState(
    'Warm earthy colors (golden sun #FDE047, emerald meadow #10B981, warm amber #F59E0B) with NO purplish hues. Chunky Fredoka captions at y=1420 with zero overlap.'
  );

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

  // Generate the Master Antigravity Prompt
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

  // Generate CLI Command
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
          Craft tailored prompts for Antigravity or execute them via the local CLI pipeline with 100% free neural voices.
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

            {/* Voice Model with 20+ Free Neural Voices */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Free Neural Voice ({voiceTone})</span>
                </label>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Instant Streaming
                </span>
              </div>

              <select
                value={voiceTone}
                onChange={(e) => setVoiceTone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#090c10] border border-slate-800 focus:border-emerald-500 rounded-xl text-xs text-white focus:outline-none"
              >
                <optgroup label="🎙️ Narrators & Documentaries">
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
                </optgroup>

                <optgroup label="🌍 International & Regional Accents">
                  <option value="en-IN-NeerjaNeural">en-IN-NeerjaNeural (Indian Natural Female)</option>
                  <option value="en-IN-PrabhatNeural">en-IN-PrabhatNeural (Indian Confident Male)</option>
                  <option value="en-IE-ConnorNeural">en-IE-ConnorNeural (Irish Melodic Narrator)</option>
                  <option value="en-ZA-LukeNeural">en-ZA-LukeNeural (South African Clear Male)</option>
                </optgroup>
              </select>
              <p className="text-[11px] text-slate-500 mt-1.5">
                All 20+ voices stream free via Microsoft Edge Neural network without API keys.
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
          {/* Main Antigravity Agent Prompt Box */}
          <div className="bg-[#0d1117] border border-slate-800 p-6 rounded-3xl shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  Ready-to-Use Antigravity Agent Prompt
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard(antigravityPrompt, 'prompt')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-emerald-600/25 transition-all"
              >
                {copiedSection === 'prompt' ? (
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
              Paste this prompt directly into your chat with Antigravity to autonomously generate the full video, audio, and beats:
            </p>

            <div className="relative bg-[#090c10] p-4 rounded-2xl border border-slate-800">
              <pre className="text-xs text-emerald-200 whitespace-pre-wrap font-mono leading-relaxed select-all">
                {antigravityPrompt}
              </pre>
            </div>
          </div>

          {/* Terminal CLI Execution Card */}
          <div className="bg-[#0d1117] border border-slate-800 p-6 rounded-3xl shadow-xl">
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
        </div>
      </div>
    </div>
  );
};
