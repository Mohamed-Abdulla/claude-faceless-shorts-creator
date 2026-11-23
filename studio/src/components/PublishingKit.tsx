import React, { useState } from 'react';
import {
  Copy,
  Check,
  Sparkles,
  Share2,
  Tag,
  Youtube,
  Instagram,
  CheckCheck
} from 'lucide-react';
import { ShortProject } from '../lib/types';
import { generatePublishingKit } from '../lib/publishing';

export const PublishingKit: React.FC<{ project: ShortProject }> = ({ project }) => {
  const kit = generatePublishingKit(project);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900 border border-emerald-800/40 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
            Algorithmic Reach Optimizer
          </span>
          <p className="text-xs text-slate-300 mt-0.5">
            Pre-formatted titles, SEO descriptions, and targeted tags for YouTube Shorts & Instagram Reels.
          </p>
        </div>
        <button
          onClick={() => handleCopy(kit.allHashtags.join(' '), 'all-tags')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all"
        >
          {copiedKey === 'all-tags' ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Copied All Tags!</span>
            </>
          ) : (
            <>
              <Tag className="w-3.5 h-3.5" />
              <span>Copy All Tags</span>
            </>
          )}
        </button>
      </div>

      {/* 1. Viral Click-Through Titles */}
      <div className="bg-[#090c10] border border-slate-800 p-5 rounded-2xl">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>High-CTR Viral Titles (Pick One)</span>
        </h4>
        <div className="space-y-2">
          {kit.titles.map((t, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/40 transition-all text-xs"
            >
              <div className="min-w-0 pr-3">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                  {t.label}
                </span>
                <span className="font-bold text-white block mt-0.5 truncate">{t.text}</span>
              </div>
              <button
                onClick={() => handleCopy(t.text, `title-${idx}`)}
                className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-[11px] font-semibold transition-colors"
              >
                {copiedKey === `title-${idx}` ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Side-by-Side YouTube Shorts & Instagram Reels Kits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* YouTube Shorts Box */}
        <div className="bg-[#090c10] border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center">
                  <Youtube className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  YouTube Shorts Kit
                </h4>
              </div>
              <button
                onClick={() => handleCopy(kit.youtubeDescription, 'yt-desc')}
                className="flex items-center gap-1 px-2.5 py-1 bg-red-600/20 hover:bg-red-600/40 text-red-300 border border-red-500/30 rounded-lg text-xs font-semibold transition-all"
              >
                {copiedKey === 'yt-desc' ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Description</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs text-slate-300 whitespace-pre-wrap font-sans bg-slate-900/90 p-3 rounded-xl border border-slate-800 leading-relaxed max-h-48 overflow-y-auto">
              {kit.youtubeDescription}
            </pre>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
            {kit.youtubeTags.map((tag) => (
              <span
                key={tag}
                onClick={() => handleCopy(tag, tag)}
                className="text-[11px] font-mono text-red-300 bg-red-950/40 border border-red-900/40 px-2 py-0.5 rounded-md cursor-pointer hover:bg-red-900/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Instagram Reels Box */}
        <div className="bg-[#090c10] border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-pink-600/20 text-pink-400 flex items-center justify-center">
                  <Instagram className="w-3.5 h-3.5" />
                </div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Instagram Reels Kit
                </h4>
              </div>
              <button
                onClick={() => handleCopy(kit.instagramCaption, 'ig-caption')}
                className="flex items-center gap-1 px-2.5 py-1 bg-pink-600/20 hover:bg-pink-600/40 text-pink-300 border border-pink-500/30 rounded-lg text-xs font-semibold transition-all"
              >
                {copiedKey === 'ig-caption' ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy Caption</span>
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs text-slate-300 whitespace-pre-wrap font-sans bg-slate-900/90 p-3 rounded-xl border border-slate-800 leading-relaxed max-h-48 overflow-y-auto">
              {kit.instagramCaption}
            </pre>
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap gap-1.5">
            {kit.instagramTags.map((tag) => (
              <span
                key={tag}
                onClick={() => handleCopy(tag, tag)}
                className="text-[11px] font-mono text-pink-300 bg-pink-950/40 border border-pink-900/40 px-2 py-0.5 rounded-md cursor-pointer hover:bg-pink-900/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Comprehensive Hashtag Cloud */}
      <div className="bg-[#090c10] border border-slate-800 p-4 rounded-2xl">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Click Any Tag to Copy
        </span>
        <div className="flex flex-wrap gap-2">
          {kit.allHashtags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleCopy(tag, tag)}
              className={`text-xs font-mono px-2.5 py-1 rounded-lg border transition-all ${
                copiedKey === tag
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-bold'
                  : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-emerald-500/50 hover:text-white'
              }`}
            >
              {copiedKey === tag ? `✓ ${tag}` : tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
