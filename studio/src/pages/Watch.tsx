import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Trash2,
  Edit3,
  FileText,
  Music,
  Clock,
  HardDrive,
  AlertTriangle,
  FolderOpen,
  Sparkles,
  Share2
} from 'lucide-react';
import { ShortProject, VideoFile } from '../lib/types';
import { api } from '../lib/api';
import { RenameModal } from '../components/RenameModal';
import { PublishingKit } from '../components/PublishingKit';

export const Watch: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<ShortProject | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'publishing' | 'details' | 'script' | 'beats'>('publishing');
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [renameTarget, setRenameTarget] = useState<{ path: string; name: string } | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const projects = await api.getShorts();
      const decodedId = decodeURIComponent(projectId || '');
      const found = projects.find(
        (p) => p.id === decodedId || p.projectPath === decodedId || p.name === decodedId
      );

      if (!found) {
        setError(`Project "${decodedId}" not found`);
        return;
      }

      setProject(found);
      setActiveVideo(found.primaryVideo || found.videos[0] || null);
    } catch (err: any) {
      setError(err.message || 'Failed to load video');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [projectId]);

  const handleDelete = async () => {
    if (!activeVideo) return;
    try {
      setIsDeleting(true);
      await api.deleteItem(activeVideo.path);
      navigate('/');
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRenameConfirm = async (targetPath: string, newName: string) => {
    await api.renameItem(targetPath, newName);
    await loadData();
  };

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-slate-500">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm">Loading portrait player...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="p-8 bg-red-950/30 border border-red-900/50 rounded-3xl text-red-400">
          <AlertTriangle className="w-10 h-10 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-white mb-2">Video Not Found</h2>
          <p className="text-xs text-red-300 mb-6">{error || 'Could not locate project.'}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Library</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Library</span>
        </Link>
      </div>

      {/* Main Studio Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: True 9:16 Portrait Player (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/* Portrait Container: 9:16 vertical ratio locked */}
          <div className="relative w-full max-w-[360px] aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800/80 flex items-center justify-center">
            {activeVideo ? (
              <video
                key={activeVideo.path}
                src={api.getMediaUrl(activeVideo.path)}
                controls
                autoPlay
                loop
                playsInline
                className="w-full h-full object-contain mx-auto"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-600">
                <FolderOpen className="w-12 h-12 mb-3 stroke-1" />
                <p className="text-sm font-semibold text-slate-400">No Rendered MP4 Yet</p>
                <p className="text-xs mt-1">This short is currently a draft.</p>
              </div>
            )}
          </div>

          {/* Quick Renders Selector if project has multiple video files */}
          {project.videos.length > 1 && (
            <div className="w-full max-w-[360px] mt-4 bg-[#0d1117] border border-slate-800 p-3 rounded-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Available Renders ({project.videos.length})
              </span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {project.videos.map((vid) => (
                  <button
                    key={vid.path}
                    onClick={() => setActiveVideo(vid)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between transition-all ${
                      activeVideo?.path === vid.path
                        ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800/60'
                        : 'bg-slate-950/60 text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{vid.name}</span>
                    <span className="text-[10px] text-slate-500">{vid.sizeFormatted}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Publishing Kit, Metadata, Script, Beats (7 cols) */}
        <div className="lg:col-span-7 bg-[#0d1117] border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-xl">
          {/* Header Title */}
          <div className="border-b border-slate-800 pb-5 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md">
                100% Free TSX Short
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {project.category} / {project.name}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {activeVideo ? activeVideo.name : project.name}
            </h1>

            {activeVideo && (
              <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-slate-400">
                <span className="bg-[#090c10] px-3 py-1 rounded-xl border border-slate-800 flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Size: <strong className="text-white">{activeVideo.sizeFormatted}</strong></span>
                </span>
                <span className="bg-[#090c10] px-3 py-1 rounded-xl border border-slate-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Updated: {new Date(activeVideo.updatedAt).toLocaleTimeString()}</span>
                </span>
              </div>
            )}
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-slate-800 mb-6 pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('publishing')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'publishing'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Publishing Kit (YouTube & IG)</span>
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'details'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Asset Details</span>
            </button>
            <button
              onClick={() => setActiveTab('script')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'script'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Script</span>
            </button>
            <button
              onClick={() => setActiveTab('beats')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
                activeTab === 'beats'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Beats ({project.beatsCount})</span>
            </button>
          </div>

          {/* Tab Body */}
          <div className="mb-6">
            {activeTab === 'publishing' && <PublishingKit project={project} />}

            {activeTab === 'details' && (
              <div className="space-y-4">
                <div className="bg-[#090c10] p-4 rounded-2xl border border-slate-800">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Direct Workspace Path
                  </span>
                  <p className="font-mono text-xs text-emerald-400 break-all select-all bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
                    {activeVideo ? activeVideo.path : project.projectPath}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#090c10] p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400">Audio Stem</span>
                    <p className="font-semibold text-white mt-1">
                      {project.hasVoice ? 'Neural Voice Generated' : 'No Voice Stem'}
                    </p>
                  </div>
                  <div className="bg-[#090c10] p-3.5 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400">Beats Contract</span>
                    <p className="font-semibold text-white mt-1">
                      {project.beatsCount > 0 ? `${project.beatsCount} Scenes Defined` : 'None'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'script' && (
              <div className="bg-[#090c10] p-4 rounded-2xl border border-slate-800 max-h-72 overflow-y-auto">
                {project.script ? (
                  <pre className="text-xs text-slate-300 whitespace-pre-wrap font-mono leading-relaxed">
                    {project.script}
                  </pre>
                ) : (
                  <p className="text-slate-500 italic text-xs">No script.md found.</p>
                )}
              </div>
            )}

            {activeTab === 'beats' && (
              <div className="bg-[#090c10] p-4 rounded-2xl border border-slate-800 max-h-72 overflow-y-auto">
                {project.beats ? (
                  <pre className="text-xs text-emerald-300 whitespace-pre-wrap font-mono leading-relaxed">
                    {JSON.stringify(project.beats, null, 2)}
                  </pre>
                ) : (
                  <p className="text-slate-500 italic text-xs">No beats.json found.</p>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <div>
              {activeVideo && (
                <button
                  onClick={() => setRenameTarget({ path: activeVideo.path, name: activeVideo.name })}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Rename Video</span>
                </button>
              )}
            </div>

            <div>
              {showConfirmDelete ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-red-400 font-semibold">Confirm delete?</span>
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="px-3.5 py-1.5 text-xs font-bold bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all"
                  >
                    {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                  </button>
                  <button
                    onClick={() => setShowConfirmDelete(false)}
                    className="px-3 py-1.5 text-xs text-slate-400 hover:text-white bg-slate-800 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                activeVideo && (
                  <button
                    onClick={() => setShowConfirmDelete(true)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-red-400 hover:text-red-300 bg-red-950/25 hover:bg-red-950/50 border border-red-900/40 rounded-xl transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Video</span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Rename Modal */}
      {renameTarget && (
        <RenameModal
          isOpen={!!renameTarget}
          targetPath={renameTarget.path}
          initialName={renameTarget.name}
          onClose={() => setRenameTarget(null)}
          onRename={handleRenameConfirm}
        />
      )}
    </div>
  );
};
