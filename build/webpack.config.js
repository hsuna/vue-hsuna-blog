'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const webpack = require('webpack')
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = function(webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development';
  const isEnvProduction = webpackEnv === 'production';
  
  const assetsPath = _path => path.posix.join(config.assetsPublicPath, _path)

  return {
    context: path.resolve(__dirname, '../'),
    entry: utils.entries(),
    devtool: isEnvProduction 
      ? config.productionSourceMap 
      ? '#source-map'
      : false
      : 'cheap-module-eval-source-map',
    output: {
      path: config.assetsRoot,
      filename: isEnvProduction ? assetsPath('js/[name].[chunkhash].js') : '[name].js',
      chunkFilename: isEnvProduction ? assetsPath('js/[id].[chunkhash].js') : undefined,
    },
    devServer: isEnvDevelopment 
    ? {
        clientLogLevel: 'warning',
        historyApiFallback: {
          rewrites: [
            { from: /.*/, to: path.posix.join('/', 'index.html') },
          ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.host,
        port: PORT || config.port,
        open: config.autoOpenBrowser,
        overlay: config.errorOverlay
          ? { warnings: false, errors: true }
          : false,
        publicPath: '/',
        proxy: config.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
          poll: config.poll,
        }
      }
    : undefined,
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        'swiper$': process.env.NODE_ENV === 'production'?'swiper/dist/js/swiper.min.js':'swiper/dist/js/swiper.js',
        'src': resolve('src'),
      }
    },
    module: {
      rules: [
        ...utils.styleLoaders({
          sourceMap: config.productionSourceMap,
          extract: isEnvProduction,
          usePostCSS: true,
          extractPublicPath: isEnvProduction ? config.extractPublicPath : null
        }),
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: utils.cssLoaders({
              sourceMap: config.productionSourceMap,
              extract: isEnvProduction,
            }),
            cssSourceMap: config.productionSourceMap,
            cacheBusting: config.cacheBusting,
            transformToRequire: {
              video: ['src', 'poster'],
              source: 'src',
              img: 'src',
              image: 'xlink:href'
            },
            postcss:[]
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 5000,
            name: assetsPath('img/[name].[hash:7].[ext]'),
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: assetsPath('media/[name].[hash:7].[ext]'),
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: assetsPath('fonts/[name].[hash:7].[ext]'),
          }
        },
      ]
    },
    node: {
      // prevent webpack from injecting useless setImmediate polyfill because Vue
      // source contains it (although only uses it if it's native).
      setImmediate: false,
      // prevent webpack from injecting mocks to Node native modules
      // that does not make sense for the client
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        name: 'common',
      },
      minimize: isEnvProduction,
			minimizer: [
				new TerserPlugin({
          extractComments: false,
					terserOptions: {
            parse: {
              // we want terser to parse ecma 8 code. However, we don't want it
              // to apply any minfication steps that turns valid ecma 5 code
              // into invalid ecma 5 code. This is why the 'compress' and 'output'
              // sections only apply transformations that are ecma 5 safe
              // https://github.com/facebook/create-react-app/pull/4234
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              // Disabled because of an issue with Uglify breaking seemingly valid code:
              // https://github.com/facebook/create-react-app/issues/2376
              // Pending further investigation:
              // https://github.com/mishoo/UglifyJS2/issues/2011
              comparisons: false,
              // Disabled because of an issue with Terser breaking valid code:
              // https://github.com/facebook/create-react-app/issues/5250
              // Pending futher investigation:
              // https://github.com/terser-js/terser/issues/120
              inline: 2,
              // 删除调试及打印
              drop_debugger: true, 
              drop_console: true,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              // Turned on because emoji and regex is not minified properly using default
              // https://github.com/facebook/create-react-app/issues/2488
              ascii_only: true,
            },
          },
          // Use multi-process parallel running to improve the build speed
          // Default number of concurrent runs: os.cpus().length - 1
          parallel: true,
          // Enable file caching
          cache: true,
        }),
        // This is only used in production mode
        new OptimizeCSSPlugin({
          cssProcessorOptions: config.productionSourceMap
            ? { safe: true, map: { inline: false } }
            : { safe: true }
        }),
      ]
		},
    plugins: [
      // http://vuejs.github.io/vue-loader/en/workflow/production.html
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: `"${webpackEnv}"`,
          ... isEnvProduction ? {
            API_HOST: '"//api.hsuna.com/blog/"'
          }: {
            API_HOST: '"//localhost:3000/blog/"'
          }
        }
      }),
      ...(isEnvProduction 
      ? [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: isEnvProduction ? assetsPath('css/[name].[contenthash].css') : '[name].css',
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
        // prevent vendor hash from being updated whenever app bundle is updated
        config.bundleAnalyzerReport && new BundleAnalyzerPlugin() 
      ].filter(Boolean)
      : isEnvDevelopment 
      ? [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
      ] 
      : []),
      new VueLoaderPlugin(),
      ...utils.exits({
        inject: true,
        minify: isEnvProduction ? {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        }: undefined
      }).map(conf => new HtmlWebpackPlugin(conf)),
      
      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../public'),
          to: config.assetsRoot,
          ignore: ['.*']
        }
      ])
    ].filter(Boolean)
  }
}