import path from 'path';
import { defineConfig } from 'vite';
import { minifyHtml, injectHtml } from 'vite-plugin-html';
import vue from '@vitejs/plugin-vue';
import legacy from './plugins/legacy'; // 自定义插件调整

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    base: './',
    server: {
      host: '0.0.0.0',
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:3000',
          changeOrigin: true,
          pathRewrite: {
              '^/api': ''
          }
        },
      },
    },
    build: {
      // assetsInlineLimit: 1024,
      rollupOptions: {
        input: {
          index: path.resolve(__dirname, 'index.html'),
          article: path.resolve(__dirname, 'article.html'),
          archive: path.resolve(__dirname, 'archive.html'),
          essay: path.resolve(__dirname, 'essay.html'),
          about: path.resolve(__dirname, 'about.html'),
          404: path.resolve(__dirname, '404.html'),
        },
      },
      cssCodeSplit: false,
      minify: 'terser',
      cssTarget: 'chrome61',
      cleanCssOptions: {
        compatibility: {
          colors: {
            hexAlpha: false, // controls 4- and 8-character hex color support
            opacity: true, // controls `rgba()` / `hsla()` color support
          },
        },
      },
    },
    plugins: [
      vue(),
      minifyHtml({
        removeAttributeQuotes: false,
      }),
      injectHtml({
        data: {},
      }),
      legacy({
        // targets: ['defaults', 'not IE 11'],
        targets: ['Android > 39', 'Chrome >= 60', 'Safari >= 10.1', 'iOS >= 10.3', 'Firefox >= 54', 'Edge >= 15'],
      }),
    ],
    css: {
    },
    resolve: {
      alias: {
        'src': path.resolve(__dirname, 'src'),
      },
    },
  });
};
