import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('Building single HTML file...');
  try {
    await build({
      root: path.resolve(__dirname, '..'),
      plugins: [
        react(),
        tailwindcss(),
        viteSingleFile({
          useRecommendedBuildConfig: true,
          removeViteModuleLoader: true
        })
      ],
      build: {
        outDir: 'dist-singlefile',
        emptyOutDir: true,
      }
    });
    console.log('Singlefile build complete!');
  } catch (err) {
    console.error('Build error:', err);
    process.exit(1);
  }
}

run();
