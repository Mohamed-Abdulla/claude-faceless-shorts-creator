import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Zero-Backend File Mapping Plugin:
// Maps the local filesystem (shorts/, ai-shorts/, vox-shorts/) directly to Vite endpoints.
function facelessStudioPlugin(): Plugin {
  return {
    name: 'faceless-studio-middleware',
    configureServer(server) {
      const workspaceRoot = path.resolve(__dirname, '..');

      // Helper to parse JSON body
      const parseBody = (req: any): Promise<any> => {
        return new Promise((resolve) => {
          let body = '';
          req.on('data', (chunk: Buffer) => { body += chunk.toString(); });
          req.on('end', () => {
            try { resolve(JSON.parse(body || '{}')); }
            catch { resolve({}); }
          });
        });
      };

      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || '', `http://${req.headers.host}`);

        // 1. GET /api/shorts: List all projects and their videos
        if (url.pathname === '/api/shorts' && req.method === 'GET') {
          try {
            // Only focus on 100% free TSX Remotion shorts
            const tracks = [
              { dir: 'shorts', type: 'tsx' },
            ];

            const projects: any[] = [];

            for (const { dir, type } of tracks) {
              const fullDir = path.join(workspaceRoot, dir);
              if (!fs.existsSync(fullDir)) continue;

              const entries = await fs.promises.readdir(fullDir, { withFileTypes: true });
              for (const entry of entries) {
                if (!entry.isDirectory()) continue;
                const projectDir = path.join(fullDir, entry.name);

                // Script check
                let scriptContent = '';
                const scriptPath = path.join(projectDir, 'script.md');
                if (fs.existsSync(scriptPath)) {
                  scriptContent = await fs.promises.readFile(scriptPath, 'utf-8');
                }

                // Beats check
                let beatsCount = 0;
                let beatsJson: any = null;
                const beatsPath = path.join(projectDir, 'beats.json');
                if (fs.existsSync(beatsPath)) {
                  try {
                    const raw = await fs.promises.readFile(beatsPath, 'utf-8');
                    beatsJson = JSON.parse(raw);
                    beatsCount = beatsJson.vo ? beatsJson.vo.length : (beatsJson.beats ? beatsJson.beats.length : 0);
                  } catch {
                    // ignore json error
                  }
                }

                // Voice status
                const voiceDir = path.join(projectDir, 'voice');
                const hasVoice = fs.existsSync(path.join(voiceDir, 'voice.wav')) || fs.existsSync(voiceDir);

                // Output videos and previews
                const outputDir = path.join(projectDir, 'output');
                const videos: any[] = [];
                const previews: any[] = [];

                if (fs.existsSync(outputDir)) {
                  const outFiles = await fs.promises.readdir(outputDir);
                  for (const f of outFiles) {
                    const fullF = path.join(outputDir, f);
                    const stat = await fs.promises.stat(fullF);
                    const relPath = path.relative(workspaceRoot, fullF);

                    if (f.endsWith('.mp4')) {
                      videos.push({
                        name: f,
                        path: relPath,
                        fullPath: fullF,
                        sizeBytes: stat.size,
                        sizeFormatted: (stat.size / (1024 * 1024)).toFixed(2) + ' MB',
                        updatedAt: stat.mtime.toISOString(),
                      });
                    } else if (f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.webp')) {
                      previews.push({
                        name: f,
                        path: relPath,
                        fullPath: fullF,
                        updatedAt: stat.mtime.toISOString(),
                      });
                    }
                  }
                }

                // Sort videos descending by mtime
                videos.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

                projects.push({
                  id: `${dir}/${entry.name}`,
                  name: entry.name,
                  category: dir,
                  trackType: type,
                  projectPath: path.relative(workspaceRoot, projectDir),
                  hasScript: !!scriptContent,
                  script: scriptContent,
                  beatsCount,
                  beats: beatsJson,
                  hasVoice,
                  videos,
                  previews,
                  primaryVideo: videos[0] || null,
                  primaryPreview: previews[0] || null,
                });
              }
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, projects }));
            return;
          } catch (err: any) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: err.message }));
            return;
          }
        }

        // 2. GET / HEAD /media-stream: High performance HTTP range streaming for videos & previews
        if (url.pathname === '/media-stream' && (req.method === 'GET' || req.method === 'HEAD')) {
          const reqPath = url.searchParams.get('path');
          if (!reqPath) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Missing path');
            return;
          }

          const safePath = path.resolve(workspaceRoot, reqPath);
          if (!safePath.startsWith(workspaceRoot) || !fs.existsSync(safePath)) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('File not found or outside workspace');
            return;
          }

          const stat = await fs.promises.stat(safePath);
          const range = req.headers.range;
          const ext = path.extname(safePath).toLowerCase();
          const contentType =
            ext === '.mp4' ? 'video/mp4' :
            ext === '.png' ? 'image/png' :
            ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
            ext === '.wav' ? 'audio/wav' :
            ext === '.mp3' ? 'audio/mpeg' : 'application/octet-stream';

          if (req.method === 'HEAD') {
            res.writeHead(200, {
              'Content-Length': stat.size,
              'Content-Type': contentType,
              'Accept-Ranges': 'bytes',
            });
            res.end();
            return;
          }

          if (range && ext === '.mp4') {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
            const chunksize = end - start + 1;
            const fileStream = fs.createReadStream(safePath, { start, end });

            res.writeHead(206, {
              'Content-Range': `bytes ${start}-${end}/${stat.size}`,
              'Accept-Ranges': 'bytes',
              'Content-Length': chunksize,
              'Content-Type': contentType,
            });
            fileStream.pipe(res);
            return;
          } else {
            res.writeHead(200, {
              'Content-Length': stat.size,
              'Content-Type': contentType,
              'Accept-Ranges': 'bytes',
            });
            fs.createReadStream(safePath).pipe(res);
            return;
          }
        }

        // 3. POST /api/rename: Rename file or directory
        if (url.pathname === '/api/rename' && req.method === 'POST') {
          try {
            const { targetPath, newName } = await parseBody(req);
            if (!targetPath || !newName) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: 'targetPath and newName required' }));
              return;
            }

            const currentFull = path.resolve(workspaceRoot, targetPath);
            if (!currentFull.startsWith(workspaceRoot) || !fs.existsSync(currentFull)) {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: 'Target not found' }));
              return;
            }

            const dirName = path.dirname(currentFull);
            const nextFull = path.join(dirName, newName);

            await fs.promises.rename(currentFull, nextFull);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              success: true,
              oldPath: targetPath,
              newPath: path.relative(workspaceRoot, nextFull),
            }));
            return;
          } catch (err: any) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: err.message }));
            return;
          }
        }

        // 4. POST /api/delete: Delete file or directory
        if (url.pathname === '/api/delete' && req.method === 'POST') {
          try {
            const { targetPath } = await parseBody(req);
            if (!targetPath) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: 'targetPath required' }));
              return;
            }

            const currentFull = path.resolve(workspaceRoot, targetPath);
            if (!currentFull.startsWith(workspaceRoot) || !fs.existsSync(currentFull)) {
              res.writeHead(404, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, error: 'Target not found' }));
              return;
            }

            const stat = await fs.promises.stat(currentFull);
            if (stat.isDirectory()) {
              await fs.promises.rm(currentFull, { recursive: true, force: true });
            } else {
              await fs.promises.unlink(currentFull);
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, deletedPath: targetPath }));
            return;
          } catch (err: any) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: false, error: err.message }));
            return;
          }
        }

        // 5. GET /api/templates: Custom TSX Prompt and Script Presets
        if (url.pathname === '/api/templates' && req.method === 'GET') {
          const templates = [
            {
              id: 'kids-rhyme',
              name: 'Children Rhyme & Song',
              track: 'tsx',
              description: 'Singing animated character, 3D radial Kawaii assets, Fredoka stickers, and rhythmic music.',
              defaultTopic: 'The Wheels on the Bus go round and round',
              sampleScript: '# The Wheels on the Bus\n\nThe wheels on the bus go round and round,\nAll through the town!\nThe wipers on the bus go swish swish swish,\nAll through the town!',
              suggestedVoice: 'en-US-AnaNeural (child friendly)',
              suggestedMusic: 'media/library/music/clips/lullaby-tender.mp3',
            },
            {
              id: 'dev-tips',
              name: 'Developer Quick Tips',
              track: 'tsx',
              description: 'Animated terminal, syntax-highlighted code blocks, Neumorphic UI cards, fast pace.',
              defaultTopic: 'How to use TypeScript satisfies operator for safe type narrowing',
              sampleScript: '# TS satisfies operator\n\nStop using "as" casting in TypeScript.\nHere is how satisfies keeps full type safety with zero runtime bugs.',
              suggestedVoice: 'en-US-GuyNeural (tech narrator)',
              suggestedMusic: 'media/library/music/clips/tech-pulse.mp3',
            },
            {
              id: 'math-tricks',
              name: 'Rapid Mental Math',
              track: 'tsx',
              description: 'Split digits, drop in middle, interactive pause challenge, bold gold typography.',
              defaultTopic: 'The ×11 Mental Math Trick in three seconds',
              sampleScript: '# The ×11 Trick\n\nSeventy-two times eleven. Two seconds. No calculator.\nSplit the seven and the two. Add them — nine. Drop it in the middle.\nSeven ninety-two. Done.',
              suggestedVoice: 'en-US-ChristopherNeural (authoritative)',
              suggestedMusic: 'media/library/music/clips/tech-pulse.mp3',
            },
            {
              id: 'chess-tactics',
              name: 'Chess Trap & Tactics',
              track: 'tsx',
              description: 'Interactive animated chess board, tactical arrows, rewind timer, punish moves.',
              defaultTopic: 'How to punish the 4-Move Scholar Mate trap',
              sampleScript: '# The 4-Move Checkmate Punished\n\nThis trap wins millions of games in just four moves.\nBishop c4, Queen h5.\nRight here, pawn to g6 stops everything and wins tempo.',
              suggestedVoice: 'en-US-ChristopherNeural (authoritative)',
              suggestedMusic: 'media/library/music/clips/lofi-warm.mp3',
            },
          ];

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, templates }));
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), facelessStudioPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: false,
    host: true,
  },
});
