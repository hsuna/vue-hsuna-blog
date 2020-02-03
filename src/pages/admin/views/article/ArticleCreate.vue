<template lang="html">
  <article-edit :article="article" :breadcrumbs="breadcrumbs" @submit="handlePublish"></article-edit>
</template>

<script>
import { Message } from 'element-ui';
import ArticleEdit from "src/components/article-edit";

import { ActionName, MutationName } from "../../store/types";

import Api from "src/api/admin";

export default {
  components: {
    ArticleEdit
  },
  data() {
    return {
      article: {
        title: "", //文章标题
        about: "", //文章简介
        classify: "", //文章所属分类
        content: "", //文章内容
        tags: [], //文章标签
        files: [], //文章链接图片
        status: 1 //0:草稿 | 1:发布 | 2:收藏
      },
      breadcrumbs: [{ text: "创建文章" }],
      isRecord: true
    };
  },
  created() {
    Object.assign(this.article, this.$store.state.article);
  },
  mounted() {
    window.onbeforeunload = this.recordCacheArticle;
  },
  destroyed() {
    this.recordCacheArticle();
    window.onbeforeunload = null;
  },
  methods: {
    recordCacheArticle() {
      if (this.isRecord) {
        //缓存正在编辑的文章
        this.$store.commit(MutationName.SET_ARTICLE, this.article);
      }
    },
    handlePublish(callback) {
      Api.postArticle(this.article).then(res => {
        if (200 == res.code) {
          Message.success(1 == res.data.status ? "文章发布成功" : "文章保存成功");
          this.isRecord = false;
          this.$store.dispatch(ActionName.ADD_ARTICLE_TAGS, this.article.tags);
          this.$store.commit(MutationName.CLEAR_ARTICLE); //清除缓存的文章
          this.$router.replace({ path: "/admin/articleList" });
        }
        callback && callback();
      });
    }
  },
};
</script>
