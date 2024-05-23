<template>
  <div class="item-side">
    <div class="side-header">热门文章</div>
    <div class="side-body" v-loading="loading">
      <template v-if="hotArticleList.length > 0">
        <ul class="hot-article">
          <li v-for="article in hotArticleList" :key="article.id">
            <a :href="`/blog/article/${article.id}`">{{ article.title }}</a>
            <div class="time">评论({{ article.comments?.length || 0 }}) | 浏览({{ article.viewCount }})</div>
          </li>
        </ul>
      </template>
      <template v-else>
        这家伙太懒了，啥都没有留下来～
      </template>
    </div>
  </div>
</template>

<script>
import Api from "src/api/blog"

export default {
  data() {
    return {
      loading: true,
      hotArticleList: []
    };
  },
  created() {
    this.getHotArticle();
  },
  methods: {
    getHotArticle() {
      Api.getArticleHot().then(res => {
        if (200 == res.statusCode) {
          this.hotArticleList = res.data?.rows || [];
        }
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.hot-article {
  li {
    &:before {
      content: "•";
    }

    display: flex;
    padding: 4px 0;

    a {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-left: 8px;
    }

    .time {
      color: #999;
    }
  }
}
</style>
