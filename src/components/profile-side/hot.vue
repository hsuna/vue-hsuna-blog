<template>
  <div class="item-side">
    <div class="side-header">热门文章</div>
    <div class="side-body" v-loading="loading">
      <template v-if="hotArticleList.length>0">
        <ul class="hot-article">
          <li v-for="article in hotArticleList" :key="article.id">
            <a :href="`/article.html?id=${article.id}`">{{article.title}}</a>
            <div class="time">评论({{article.commentCount}}) | 浏览({{article.viewCount}})</div>
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
import $api from "src/api/blog"

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
      this.$http.get($api.getArticleHot).then(res => {
        if (200 == res.code) {
          this.hotArticleList = res.data;
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
