// Builds a self-contained demo of the website as ONE html file
// (dist-singlefile/IPB-Hotel-Demo.html) that opens straight from disk, no
// Laravel/PHP needed. Booking endpoints are mocked in scripts/standalone/mockApi.ts.
//
//   node scripts/build-singlefile.mjs
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'dist-singlefile');

// Shrink photos so the single file stays small enough to email. sharp is optional:
// without it the original images are inlined unchanged.
const sharp = await import('sharp').then(m => m.default).catch(() => null);
const compressImages = {
  name: 'standalone-compress-images',
  enforce: 'pre',
  async load(id) {
    if (!sharp || id.includes('?') || !/\.(jpe?g|png)$/i.test(id)) return null;
    const data = await sharp(id)
      .rotate()
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 70 })
      .toBuffer();
    return `export default ${JSON.stringify('data:image/webp;base64,' + data.toString('base64'))};`;
  },
};

await build({
  root,
  configFile: false,
  base: './',
  publicDir: false,
  plugins: [compressImages, react(), tailwindcss(), viteSingleFile({ removeViteModuleLoader: true })],
  resolve: {
    alias: [
      { find: /^react-router-dom$/, replacement: path.join(root, 'scripts/standalone/router-shim.ts') },
      { find: '@', replacement: root },
    ],
  },
  build: {
    outDir,
    emptyOutDir: true,
    assetsInlineLimit: Number.MAX_SAFE_INTEGER,
    rollupOptions: { input: path.join(root, 'scripts/standalone/index.html') },
  },
});

const built = path.join(outDir, 'scripts/standalone/index.html');
const final = path.join(outDir, 'IPB-Hotel-Demo.html');
fs.renameSync(built, final);
fs.rmSync(path.join(outDir, 'scripts'), { recursive: true, force: true });
console.log(`Done: ${final} (${(fs.statSync(final).size / 1048576).toFixed(1)} MB)`);
