'use strict'
const path = require('path')
const config = require('../config')

// glob是webpack安装时依赖的一个第三方模块，还模块允许你使用 *等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
const glob = require('glob')

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap,
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
      plugins: [
        require("autoprefixer")()
      ]
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        //test: new RegExp(`\\.${loader}$`),
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap,
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    return [options.extract ? {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: options.extractPublicPath,
      },
    } : 'style-loader'].concat(loaders)
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {
      indentedSyntax: true
    }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

// 多入口配置
exports.entries = function () {
  let entryFiles = glob.sync(config.pagesPath + '/*/main.js');
  let map = {};
  entryFiles.forEach(filePath => {
    map[path.basename(path.dirname(filePath))] = filePath;
  })
  return map
}

//多页面输出配置
exports.exits = function (conf) {
  let entryHtml = glob.sync(config.pagesPath + '/*/index.html');
  return entryHtml.map(filePath => {
    let filename = path.basename(path.dirname(filePath));
    return Object.assign({
      // 模板来源
      template: filePath,
      // 文件名称
      filename: filename + '.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: ['common', filename]
    }, conf);
  });
}