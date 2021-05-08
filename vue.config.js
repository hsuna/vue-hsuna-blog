const path = require("path");
const webpack = require("webpack");

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    pages: [
        { name: 'about', title: '关于我 | HSUAN' },
        { name: 'archive', title: '归档 | HSUAN' },
        { name: 'article', title: '文章详情 | HSUAN' },
        { name: 'essay', title: '手札 | HSUAN' },
        { name: 'index', title: '首页 | HSUAN' },
    ].reduce((obj, item) => Object.assign(obj, { 
        [item.name]: 
            process.env.NODE_ENV === 'production'
            ? {
                entry: resolve(`src/pages/${item.name}/main.js`), // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
                template: 'public/index.html',                    // 模板来源
                filename: `${item.name}.html`,                    // 在 dist/index.html 的输出
                title: item.title || 'BLOG | HSUAN',              // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
                chunks: ['common', item.name]          // 在这个页面中包含的块，默认情况下会包含,提取出来的 chunks
            }
            : resolve(`src/pages/${item.name}/main.js`),
    }), {}),
    publicPath: './',
    assetsDir: 'static',//放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
    outputDir: 'dist',// 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    configureWebpack: config => {
        /* 语言包转化 */
        config.plugins.push(
            new webpack.NormalModuleReplacementPlugin(
                /element-plus[\/\\]lib[\/\\]locale[\/\\]lang[\/\\]en/, 
                'element-plus/lib/locale/lang/zh-cn'
            )
        )

        if (process.env.NODE_ENV === 'production') {
            // 修改压缩规则，可以移除开发环境相关的代码
            // 分割代码块
            config.optimization.splitChunks = {
                cacheGroups: {
                    //公用模块抽离
                    common: {
                        name: 'common',
                        chunks: 'all',
                        minChunks: 5, //抽离公共代码时，这个代码块最小被引用的次数
                    }
                }
            }
            config.optimization.minimizer[0].options.terserOptions.compress = {
                drop_console: true,
                drop_debugger: true,
            }
        }

        return {
            devtool: "production" === process.env.NODE_ENV ? false : undefined,
            resolve: {
                alias: {
                    src: resolve('src'),
                }
            }
        };
    },
    chainWebpack: config => {
        /* 打包体积预览 */
        if (process.env.use_analyzer) {
            config
                .plugin("webpack-bundle-analyzer")
                .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
        }
    }
}