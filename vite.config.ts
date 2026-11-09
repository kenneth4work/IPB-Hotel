import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import {fileURLToPath, URL} from 'node:url';
import sharp from 'sharp';
import {defineConfig, type Plugin} from 'vite';

/**
 * Saat `vite build`, perkecil semua foto yang di-import (6000x4000 dari kamera -> maks 1920px)
 * dan kompres ulang dengan format yang sama. Nama file & import tidak berubah; file asli di
 * src/assets tetap utuh. Dev server tetap memakai file asli.
 */
function optimizeImages(maxWidth = 1920): Plugin {
  return {
    name: 'optimize-images',
    apply: 'build',
    async generateBundle(_, bundle) {
      await Promise.all(
        Object.values(bundle).map(async (asset) => {
          if (asset.type !== 'asset' || !/\.(jpe?g|png|webp)$/i.test(asset.fileName)) return;

          const input = Buffer.from(asset.source as Uint8Array);
          const image = sharp(input).rotate().resize({width: maxWidth, height: maxWidth, fit: 'inside', withoutEnlargement: true});
          const ext = asset.fileName.split('.').pop()!.toLowerCase();
          const output = await (ext === 'png'
            ? image.png({compressionLevel: 9, palette: true, quality: 85})
            : ext === 'webp'
              ? image.webp({quality: 78})
              : image.jpeg({quality: 78, mozjpeg: true, progressive: true})
          ).toBuffer();

          if (output.length < input.length) asset.source = output;
        }),
      );
    },
  };
}

export default defineConfig({
  plugins: [
    laravel({input: ['src/main.tsx'], refresh: true}),
    react(),
    tailwindcss(),
    optimizeImages(),
  ],
  resolve: {
    alias: {'@': fileURLToPath(new URL('.', import.meta.url))},
  },
});
