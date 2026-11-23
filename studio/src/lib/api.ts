import { ShortProject, PromptTemplate } from './types';

export const api = {
  async getShorts(): Promise<ShortProject[]> {
    const res = await fetch('/api/shorts');
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to fetch shorts');
    return data.projects;
  },

  getMediaUrl(relativePath: string): string {
    return `/media-stream?path=${encodeURIComponent(relativePath)}`;
  },

  async renameItem(targetPath: string, newName: string): Promise<string> {
    const res = await fetch('/api/rename', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetPath, newName }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to rename');
    return data.newPath;
  },

  async deleteItem(targetPath: string): Promise<void> {
    const res = await fetch('/api/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ targetPath }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to delete');
  },

  async getTemplates(): Promise<PromptTemplate[]> {
    const res = await fetch('/api/templates');
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to fetch templates');
    return data.templates;
  },
};
