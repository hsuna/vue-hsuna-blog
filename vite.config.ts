import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginImp from 'vite-plugin-imp'

export default defineConfig({
  alias: {
    'src': resolve(__dirname, 'src'),
  },
  css: {
    preprocessorOptions: {
      sass: {
        includePaths: ['src']
      }
    },
  },
  server: {
    // host: '0.0.0.0',
    port: 8080,
    open: false,
    //force: false,
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:3000',
        target: 'http://api.hsuna.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  },
  build: {
    rollupOptions: {
      input: {
        404: resolve(__dirname, '404.html'),
        about: resolve(__dirname, 'about.html'),
        admin: resolve(__dirname, 'admin.html'),
        archive: resolve(__dirname, 'archive.html'),
        article: resolve(__dirname, 'article.html'),
        essay: resolve(__dirname, 'essay.html'),
        index: resolve(__dirname, 'index.html'),
      }
    }
  },
  optimizeDeps: {
    include: [
      'dayjs/locale/zh-cn',

      'element-plus/lib/locale',
      'element-plus/lib/locale/lang/zh-cn',
      
      'highlight.js/lib/core',
      ...[
        'xml', 
        'bash', 
        'basic', 
        'css', 
        'markdown', 
        'delphi', 
        'ruby', 
        'go', 
        'http', 
        'ini', 
        'java', 
        'javascript', 
        'json', 
        'less', 
        'lua', 
        'perl', 
        'nginx', 
        'php', 
        'python', 
        'scheme', 
        'scss', 
        'shell', 
        'sql', 
        'stylus', 
        'swift', 
        'yaml', 
        'typescript', 
        'vbscript', 
        'vbscript-html', 
        'vim',
      ].map(name => `highlight.js/lib/languages/${name}.js`),
    ]
  },
  plugins: [
    vue(),
    vitePluginImp({
      libList: [{
        libName: 'element-plus',
        style: (name) => {
          return`element-plus/lib/theme-chalk/${name}.css`
        }
      }]
    })
  ]
})
