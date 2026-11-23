export interface VideoFile {
  name: string;
  path: string;
  fullPath: string;
  sizeBytes: number;
  sizeFormatted: string;
  updatedAt: string;
}

export interface PreviewFile {
  name: string;
  path: string;
  fullPath: string;
  updatedAt: string;
}

export interface ShortProject {
  id: string;
  name: string;
  category: 'shorts' | 'ai-shorts' | 'vox-shorts' | string;
  trackType: 'tsx' | 'ai' | 'vox';
  projectPath: string;
  hasScript: boolean;
  script?: string;
  beatsCount: number;
  beats?: any;
  hasVoice: boolean;
  videos: VideoFile[];
  previews: PreviewFile[];
  primaryVideo: VideoFile | null;
  primaryPreview: PreviewFile | null;
}

export interface PromptTemplate {
  id: string;
  name: string;
  track: 'tsx' | 'ai' | 'vox';
  description: string;
  defaultTopic: string;
  sampleScript: string;
  suggestedVoice: string;
  suggestedMusic: string;
}
