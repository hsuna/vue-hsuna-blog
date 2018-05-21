module.exports = {
  files: {
    vendor: ['vue', 'axios', 'store', '@/plugins/el-base'],
    vendor1: ['highlight.js']
  },
  pages: {
    404: {
      title: '首页 | HSUAN',
      vendor: []
    },
    about: {
      title: '关于我 | HSUAN',
      vendor: []
    },

    archive: {
      title: '归档 | HSUAN',
      vendor: []
    },
    article: {
      title: '文章详情 | HSUAN',
      vendor: ['vendor1']
    },
    essay: {
      title: '手札 | HSUAN',
      vendor: []
    },
    admin: {
      title: '后台管理 | HSUAN',
      vendor: ['vendor1']
    },
    index: {
      title: '404 | HSUAN',
      vendor: []
    }
  }
}
