import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Video,
  Bot,
  Layers,
  Terminal,
  FileText,
  Music,
  Sliders,
  Send
} from 'lucide-react';
import { PromptTemplate } from '../lib/types';
import { api } from '../lib/api';

export const PromptStudio: React.FC = () => {
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [selectedTrack, setSelectedTrack] = useState<'tsx' | 'ai' | 'vox'>('tsx');
  const [topic, setTopic] = useState('Old MacDonald Had a Farm with colorful dancing animals');
  const [voiceTone, setVoiceTone] = useState('en-US-AnaNeural (Playful child-friendly)');
  const [durationSec, setDurationSec] = useState(35);
  const [customInstructions, setCustomInstructions] = useState(
    'Ensure 2.5D shaded characters, Fredoka sticker captions at y=1420 with zero overlap, and rhythmic background melody.'
  );

  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  useEffect(() => {
    api.getTemplates().then((tpls) => {
      setTemplates(tpls);
    });
  }, []);

  const handleApplyPreset = (tpl: PromptTemplate) => {
    setSelectedTrack(tpl.track);
    setTopic(tpl.defaultTopic);
    setVoiceTone(tpl.suggestedVoice);
  };

  const copyToClipboard = (text: string, sectionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionId);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  // Generate the Master Antigravity Prompt
  const antigravityPrompt = `Create a new ${
    selectedTrack === 'tsx'
      ? '100% TSX Remotion short (/make-short)'
      : selectedTrack === 'ai'
      ? 'Generative Fal AI short with recurring character (/make-ai-short)'
      : 'Vox-Style layered collage short (/make-vox)'
  }:
Topic: "${topic}"
Duration: ~${durationSec} seconds
Voice Engine: Free Edge-TTS (${voiceTone}) with word-level boundaries
Style & Audio:
- ${customInstructions}
- Rhythmic background music with soft ducking under speech
- Safe zones: Captions strictly at y=1420-1620, zero text overlap with background elements
- End with seamless frame-0 infinite loop and no CTA outro.`;

  // Generate CLI Command
  const shortSlug = topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 24);

  const cliCommand = `# 1. Generate Voice with Free Edge-TTS
python tools/gen_voice.py shorts/${shortSlug}/script.md shorts/${shortSlug}/voice/ --engine edge --voice ${
    voiceTone.split(' ')[0]
  }

# 2. Synchronize Beat Transients
python tools/beat_sync.py shorts/${shortSlug}/voice/voice.wav shorts/${shortSlug}/beats.json

# 3. Preview Frame in Remotion
cd remotion && npx remotion still ${shortSlug.replace(/-/g, '')} ../shorts/${shortSlug}/output/preview.png --frame=60`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Prompt & Workflow Studio</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Custom Prompt Generator
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Craft tailored prompts and workflow templates for Google Antigravity or execute them via the local CLI pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Controls Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Preset Buttons */}
          <div className="bg-slate-900/90 border border-slate-800/80 p-5 rounded-3xl shadow-xl">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Quick Topic Presets
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => handleApplyPreset(tpl)}
                  className="text-left p-3 rounded-2xl bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/50 transition-all text-xs"
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
          <div className="bg-slate-900/90 border border-slate-800/80 p-6 rounded-3xl shadow-xl space-y-5">
            {/* Track Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Production Track
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setSelectedTrack('tsx')}
                  className={`p-3 rounded-2xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    selectedTrack === 'tsx'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Video className="w-4 h-4" />
                  <span>TSX 100%</span>
                </button>

                <button
                  onClick={() => setSelectedTrack('ai')}
                  className={`p-3 rounded-2xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    selectedTrack === 'ai'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Bot className="w-4 h-4" />
                  <span>Fal AI</span>
                </button>

                <button
                  onClick={() => setSelectedTrack('vox')}
                  className={`p-3 rounded-2xl text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                    selectedTrack === 'vox'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Vox Collage</span>
                </button>
              </div>
            </div>

            {/* Topic Input */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Video Topic & Story
              </label>
              <textarea
                rows={3}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. 5 hidden VS Code shortcuts that save 2 hours a day..."
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-2xl text-xs text-white focus:outline-none leading-relaxed"
              />
            </div>

            {/* Voice Model */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Voice Style (Free Neural Edge-TTS)
              </label>
              <select
                value={voiceTone}
                onChange={(e) => setVoiceTone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-white focus:outline-none"
              >
                <option value="en-US-AnaNeural (Playful child-friendly)">
                  en-US-AnaNeural (Playful child-friendly)
                </option>
                <option value="en-US-GuyNeural (Tech / Developer)">
                  en-US-GuyNeural (Tech / Developer)
                </option>
                <option value="en-US-ChristopherNeural (Documentary / Authoritative)">
                  en-US-ChristopherNeural (Documentary / Authoritative)
                </option>
                <option value="en-US-JennyNeural (Warm & Engaging)">
                  en-US-JennyNeural (Warm & Engaging)
                </option>
                <option value="en-US-BrianNeural (Cinematic Story)">
                  en-US-BrianNeural (Cinematic Story)
                </option>
              </select>
            </div>

            {/* Duration Slider */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="font-bold text-slate-400 uppercase tracking-wider">
                  Target Duration
                </span>
                <span className="text-indigo-400 font-bold">{durationSec} seconds</span>
              </div>
              <input
                type="range"
                min={20}
                max={55}
                step={5}
                value={durationSec}
                onChange={(e) => setDurationSec(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
            </div>

            {/* Custom Polish Instructions */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Style Constraints & Safe Zones
              </label>
              <textarea
                rows={2}
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl text-xs text-slate-300 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Output Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Antigravity Agent Prompt Box */}
          <div className="bg-slate-900/90 border border-slate-800/80 p-6 rounded-3xl shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <h3 className="text-sm font-bold text-white">
                  Ready-to-Use Antigravity Agent Prompt
                </h3>
              </div>
              <button
                onClick={() => copyToClipboard(antigravityPrompt, 'prompt')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 transition-all"
              >
                {copiedSection === 'prompt' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" />
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

            <div className="relative bg-slate-950 p-4 rounded-2xl border border-slate-800">
              <pre className="text-xs text-indigo-200 whitespace-pre-wrap font-mono leading-relaxed select-all">
                {antigravityPrompt}
              </pre>
            </div>
          </div>

          {/* Terminal CLI Execution Card */}
          <div className="bg-slate-900/90 border border-slate-800/80 p-6 rounded-3xl shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Manual CLI Workflow Commands</h3>
              </div>
              <button
                onClick={() => copyToClipboard(cliCommand, 'cli')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-all"
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

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
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
