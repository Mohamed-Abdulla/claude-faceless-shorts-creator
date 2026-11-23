import React, { useState } from 'react';
import { X, Play, Trash2, Edit3, FileText, Music, Sparkles, AlertTriangle } from 'lucide-react';
import { ShortProject, VideoFile } from '../lib/types';
import { api } from '../lib/api';

interface VideoModalProps {
  project: ShortProject;
  activeVideo: VideoFile;
  isOpen: boolean;
  onClose: () => void;
  onRenameRequest: (path: string, currentName: string) => void;
  onDeleteRequest: (path: string) => Promise<void>;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  project,
  activeVideo,
  isOpen,
  onClose,
  onRenameRequest,
  onDeleteRequest,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'script' | 'beats'>('details');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDeleteRequest(activeVideo.path);
      onClose();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const videoUrl = api.getMediaUrl(activeVideo.path);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[850px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-white bg-slate-950/70 hover:bg-slate-800 border border-slate-800 rounded-full backdrop-blur-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: 9:16 Video Player Stage */}
        <div className="relative md:w-[420px] bg-black flex items-center justify-center p-4 border-b md:border-b-0 md:border-r border-slate-800">
          <div className="relative w-[280px] sm:w-[320px] aspect-[9/16] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
            <video
              src={videoUrl}
              controls
              autoPlay
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Side: Metadata, Tabs, and Actions */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-900/90 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-slate-800/80">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md">
                {project.trackType.toUpperCase()} Short
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {project.category} / {project.name}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white truncate">
              {activeVideo.name}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">
              <span className="bg-slate-800/70 px-2.5 py-1 rounded-lg">
                Size: <strong className="text-slate-200">{activeVideo.sizeFormatted}</strong>
              </span>
              <span className="bg-slate-800/70 px-2.5 py-1 rounded-lg">
                Updated: {new Date(activeVideo.updatedAt).toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800/60 bg-slate-950/40">
            <button
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'details'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Details</span>
            </button>
            <button
              onClick={() => setActiveTab('script')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'script'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Script ({project.hasScript ? 'Available' : 'None'})</span>
            </button>
            <button
              onClick={() => setActiveTab('beats')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold border-b-2 transition-all ${
                activeTab === 'beats'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Music className="w-4 h-4" />
              <span>Beats ({project.beatsCount} beats)</span>
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 p-6 overflow-y-auto min-h-0 text-sm">
            {activeTab === 'details' && (
              <div className="space-y-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Direct Local Path
                  </h4>
                  <p className="font-mono text-xs text-indigo-300 break-all select-all bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                    {activeVideo.path}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                    <span className="text-xs text-slate-400">Audio Sync</span>
                    <p className="font-semibold text-white mt-1">
                      {project.hasVoice ? 'Voice Stem Present' : 'No Voice Stem'}
                    </p>
                  </div>
                  <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                    <span className="text-xs text-slate-400">Beats Contract</span>
                    <p className="font-semibold text-white mt-1">
                      {project.beatsCount > 0 ? `${project.beatsCount} Scenes Defined` : 'None'}
                    </p>
                  </div>
                </div>

                {project.videos.length > 1 && (
                  <div className="mt-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                      Other Renders in This Project ({project.videos.length})
                    </h4>
                    <div className="space-y-1.5 max-h-40 overflow-y-auto">
                      {project.videos.map((vid) => (
                        <div
                          key={vid.path}
                          className={`flex items-center justify-between p-2 rounded-lg text-xs font-mono ${
                            vid.path === activeVideo.path
                              ? 'bg-indigo-950/40 text-indigo-300 border border-indigo-800/50'
                              : 'bg-slate-950 text-slate-400'
                          }`}
                        >
                          <span className="truncate">{vid.name}</span>
                          <span>{vid.sizeFormatted}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'script' && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                {project.script ? (
                  <pre className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-mono">
                    {project.script}
                  </pre>
                ) : (
                  <p className="text-slate-500 italic">No script.md found in this project.</p>
                )}
              </div>
            )}

            {activeTab === 'beats' && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
                {project.beats ? (
                  <pre className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed font-mono">
                    {JSON.stringify(project.beats, null, 2)}
                  </pre>
                ) : (
                  <p className="text-slate-500 italic">No beats.json found in this project.</p>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 sm:p-6 border-t border-slate-800/80 bg-slate-950/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onRenameRequest(activeVideo.path, activeVideo.name)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
              >
                <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Rename Video</span>
              </button>
            </div>

            <div>
              {showConfirmDelete ? (
                <div className="flex items-center gap-2 animate-in fade-in">
                  <span className="text-xs text-red-400 font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Confirm delete?
                  </span>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-3 py-1.5 text-xs font-semibold bg-red-600 hover:bg-red-500 text-white rounded-lg transition-all"
                  >
                    {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                  </button>
                  <button
                    onClick={() => setShowConfirmDelete(false)}
                    className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowConfirmDelete(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/60 border border-red-900/40 rounded-xl transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Video</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
