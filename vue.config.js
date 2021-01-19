const path = require("path");
const webpack = require("webpack");

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    pages: [
        'about',
        'admin',
        'archive',
        'article',
        'essay',
        'index',
    ].reduce((obj, name) => Object.assign(obj, { [name]: resolve(`src/pages/${name}/main.js`) }), {}),
    publicPath: './',
    assetsDir: 'static',
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
                    commons: {
                        name: 'commons',
                        chunks: 'all',
                        minChunks: 3, //抽离公共代码时，这个代码块最小被引用的次数
                    },
                    //第三方库抽离
                    elementPlus: {
                        priority: 10, //权重
                        name: 'element-plus',
                        test: /element-plus/,
                        chunks: 'all',
                        minChunks: 2, //抽离公共代码时，这个代码块最小被引用的次数
                    }
                  },
          
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