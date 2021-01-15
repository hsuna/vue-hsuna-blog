import hljs from 'highlight.js/lib/core.js';

hljs.registerLanguage('bash', () => import('highlight.js/lib/languages/bash.js'));
hljs.registerLanguage('basic', () => import('highlight.js/lib/languages/basic.js'));
hljs.registerLanguage('css', () => import('highlight.js/lib/languages/css.js'));
hljs.registerLanguage('markdown', () => import('highlight.js/lib/languages/markdown.js'));
hljs.registerLanguage('delphi', () => import('highlight.js/lib/languages/delphi.js'));
hljs.registerLanguage('ruby', () => import('highlight.js/lib/languages/ruby.js'));
hljs.registerLanguage('go', () => import('highlight.js/lib/languages/go.js'));
hljs.registerLanguage('http', () => import('highlight.js/lib/languages/http.js'));
hljs.registerLanguage('ini', () => import('highlight.js/lib/languages/ini.js'));
hljs.registerLanguage('java', () => import('highlight.js/lib/languages/java.js'));
hljs.registerLanguage('javascript', () => import('highlight.js/lib/languages/javascript.js'));
hljs.registerLanguage('json', () => import('highlight.js/lib/languages/json.js'));
hljs.registerLanguage('less', () => import('highlight.js/lib/languages/less.js'));
hljs.registerLanguage('lua', () => import('highlight.js/lib/languages/lua.js'));
hljs.registerLanguage('perl', () => import('highlight.js/lib/languages/perl.js'));
hljs.registerLanguage('nginx', () => import('highlight.js/lib/languages/nginx.js'));
hljs.registerLanguage('php', () => import('highlight.js/lib/languages/php.js'));
hljs.registerLanguage('python', () => import('highlight.js/lib/languages/python.js'));
hljs.registerLanguage('scheme', () => import('highlight.js/lib/languages/scheme.js'));
hljs.registerLanguage('scss', () => import('highlight.js/lib/languages/scss.js'));
hljs.registerLanguage('shell', () => import('highlight.js/lib/languages/shell.js'));
hljs.registerLanguage('sql', () => import('highlight.js/lib/languages/sql.js'));
hljs.registerLanguage('stylus', () => import('highlight.js/lib/languages/stylus.js'));
hljs.registerLanguage('swift', () => import('highlight.js/lib/languages/swift.js'));
hljs.registerLanguage('yaml', () => import('highlight.js/lib/languages/yaml.js'));
hljs.registerLanguage('typescript', () => import('highlight.js/lib/languages/typescript.js'));
hljs.registerLanguage('vbscript', () => import('highlight.js/lib/languages/vbscript.js'));
hljs.registerLanguage('vbscript-html', () => import('highlight.js/lib/languages/vbscript-html.js'));
hljs.registerLanguage('vim', () => import('highlight.js/lib/languages/vim.js'));

export default hljs 