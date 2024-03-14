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
          target: "http://localhost:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      // assetsInlineLimit: 1024,
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
    resolve: {
      alias: {
        'src': path.resolve(__dirname, 'src'),
      },
    },
  });
};
