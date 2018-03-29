<template>
  <div class="item-side">
    <div class="side-header">热门文章</div>
    <div class="side-body">
      <template v-if="hotArticleList.length>0">
        <ul class="hot-article">
          <li v-for="article in hotArticleList" :key="article.id">
            &middot;
            <a :href="`/article/${article.id}`">{{article.title}}</a>
            <span class="time">{{article.publishAt, 'yyyy年MM月dd日' | timeStampFormat}}</span>
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
import $api from "api/guest";

export default {
  data() {
    return {
      hotArticleList: []
    };
  },
  created() {
    //this.getClassifyCount();
  },
  methods: {
    getClassifyCount() {
      this.$http.get($api.getClassifyCount).then(res => {
        if (200 == res.code) {
          this.classifyList = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.hot-article {
  li {
    padding: 4px;
    a {
      padding-left: 8px;
    }
  }
}
</style>
