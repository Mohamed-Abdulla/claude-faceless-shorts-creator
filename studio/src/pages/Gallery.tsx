import React, { useState, useEffect, useMemo } from 'react';
import {
  Film,
  Play,
  Search,
  Sparkles,
  Layers,
  Bot,
  Video,
  FileText,
  Trash2,
  Edit3,
  Clock,
  HardDrive,
  FolderOpen
} from 'lucide-react';
import { ShortProject, VideoFile } from '../lib/types';
import { api } from '../lib/api';
import { VideoModal } from '../components/VideoModal';
import { RenameModal } from '../components/RenameModal';

export const Gallery: React.FC = () => {
  const [projects, setProjects] = useState<ShortProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [activeTrack, setActiveTrack] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [selectedProject, setSelectedProject] = useState<ShortProject | null>(null);
  const [activeVideo, setActiveVideo] = useState<VideoFile | null>(null);

  const [renameTarget, setRenameTarget] = useState<{ path: string; name: string } | null>(null);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getShorts();
      setProjects(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchTrack = activeTrack === 'all' || p.trackType === activeTrack;
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.script && p.script.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchTrack && matchSearch;
    });
  }, [projects, activeTrack, searchQuery]);

  // Aggregate stats
  const totalVideos = useMemo(() => {
    return projects.reduce((acc, p) => acc + p.videos.length, 0);
  }, [projects]);

  const handlePlayVideo = (project: ShortProject, video?: VideoFile) => {
    setSelectedProject(project);
    setActiveVideo(video || project.primaryVideo || null);
  };

  const handleRenameConfirm = async (targetPath: string, newName: string) => {
    await api.renameItem(targetPath, newName);
    await loadProjects();
  };

  const handleDeleteItem = async (targetPath: string) => {
    await api.deleteItem(targetPath);
    await loadProjects();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Welcome & Stats Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-950 border border-slate-800/80 p-6 sm:p-8 mb-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Direct File Mapping Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Faceless Shorts Library
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-xl">
              Inspect, preview, stream, rename, and manage all your generated shorts across Remotion TSX, Generative Fal AI, and Vox Collage tracks.
            </p>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl">
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block">Shorts</span>
              <span className="text-2xl font-extrabold text-white">{projects.length}</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block">Rendered MP4s</span>
              <span className="text-2xl font-extrabold text-indigo-400">{totalVideos}</span>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div>
              <span className="text-xs text-slate-400 uppercase tracking-wider block">Audio Stems</span>
              <span className="text-2xl font-extrabold text-emerald-400">
                {projects.filter((p) => p.hasVoice).length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        {/* Track Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveTrack('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTrack === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Tracks
          </button>
          <button
            onClick={() => setActiveTrack('tsx')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTrack === 'tsx'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>TSX Remotion</span>
          </button>
          <button
            onClick={() => setActiveTrack('ai')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTrack === 'ai'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>AI Generative</span>
          </button>
          <button
            onClick={() => setActiveTrack('vox')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeTrack === 'vox'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Vox Collage</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title or script..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Grid of Projects */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500">
          <Film className="w-10 h-10 animate-bounce mb-3 text-indigo-400" />
          <p className="text-sm">Scanning workspace directories...</p>
        </div>
      ) : error ? (
        <div className="p-6 bg-red-950/40 border border-red-900/60 rounded-3xl text-red-400 text-center">
          <p className="font-semibold">{error}</p>
          <button
            onClick={loadProjects}
            className="mt-3 px-4 py-1.5 bg-red-900/60 hover:bg-red-800 text-xs text-white rounded-xl"
          >
            Retry
          </button>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800/80 rounded-3xl">
          <Film className="w-12 h-12 mx-auto text-slate-600 mb-3" />
          <h3 className="text-base font-bold text-slate-300">No shorts found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search filters or generate your next short from the Prompt Studio.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project) => {
            const hasVideo = project.videos.length > 0;
            const primaryVid = project.primaryVideo;
            const previewImg = project.primaryPreview;

            return (
              <div
                key={project.id}
                className="group relative flex flex-col bg-slate-900/90 border border-slate-800/80 hover:border-indigo-500/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300"
              >
                {/* 9:16 Thumbnail / Preview Aspect Area */}
                <div className="relative aspect-[9/14] bg-slate-950 overflow-hidden flex items-center justify-center">
                  {previewImg ? (
                    <img
                      src={api.getMediaUrl(previewImg.path)}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : hasVideo && primaryVid ? (
                    <video
                      src={api.getMediaUrl(primaryVid.path)}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-600 p-4 text-center">
                      <Film className="w-12 h-12 mb-2 stroke-1" />
                      <span className="text-xs">No rendered preview yet</span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span
                      className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg backdrop-blur-md ${
                        project.trackType === 'tsx'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : project.trackType === 'ai'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {project.trackType}
                    </span>

                    {hasVideo && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-black/60 text-emerald-400 border border-emerald-500/30 rounded-md backdrop-blur-md flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {project.videos.length} MP4
                      </span>
                    )}
                  </div>

                  {/* Center Play Button on Hover */}
                  {hasVideo && primaryVid && (
                    <button
                      onClick={() => handlePlayVideo(project, primaryVid)}
                      className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-xl shadow-indigo-600/40 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                    >
                      <Play className="w-6 h-6 fill-white ml-0.5" />
                    </button>
                  )}
                </div>

                {/* Card Info Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors truncate mt-0.5">
                      {project.name}
                    </h3>

                    {project.script && (
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {project.script.replace(/#.*?\n/g, '').trim()}
                      </p>
                    )}
                  </div>

                  {/* Card Actions & Footer */}
                  <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      {hasVideo && primaryVid ? (
                        <button
                          onClick={() => handlePlayVideo(project, primaryVid)}
                          className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 font-semibold"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Watch</span>
                        </button>
                      ) : (
                        <span className="text-slate-500 italic">Draft</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          setRenameTarget({ path: project.projectPath, name: project.name })
                        }
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                        title="Rename Short Folder"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Delete short folder "${project.name}" completely?`)) {
                            handleDeleteItem(project.projectPath);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                        title="Delete Short"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Video Modal Player */}
      {selectedProject && activeVideo && (
        <VideoModal
          project={selectedProject}
          activeVideo={activeVideo}
          isOpen={!!selectedProject}
          onClose={() => {
            setSelectedProject(null);
            setActiveVideo(null);
          }}
          onRenameRequest={(path, currentName) => {
            setRenameTarget({ path, name: currentName });
          }}
          onDeleteRequest={async (path) => {
            await handleDeleteItem(path);
          }}
        />
      )}

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
