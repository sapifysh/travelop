import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import seoPages from './src/data/seo-pages.json';
import blogPosts from './src/data/blog-posts.json';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          'lombok-private-tours': path.resolve(__dirname, 'lombok-private-tours/index.html'),
          ...Object.fromEntries(
            seoPages.map((p: {slug: string}) => [p.slug, path.resolve(__dirname, `${p.slug}/index.html`)]),
          ),
          blog: path.resolve(__dirname, 'blog/index.html'),
          ...Object.fromEntries(
            blogPosts.map((p: {slug: string}) => [`blog-${p.slug}`, path.resolve(__dirname, `blog/${p.slug}/index.html`)]),
          ),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
