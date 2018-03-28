<template lang="html">
  <article-edit :article="article" :breadcrumbs="breadcrumbs" @submit="handlePublish"></article-edit>
</template>

<script>
import { StorageKey, ActionsKey } from "store/types";
import articleEdit from "components/article-edit";
import $api from "api/admin";

export default {
  data() {
    return {
      article: {
        title: "", //文章标题
        about: "", //文章简介
        classify: "", //文章所属分类
        content: "", //文章内容
        tags: [], //文章标签
        status: 1 //0:草稿 | 1:发布 | 2:收藏
      },
      breadcrumbs: [{ text: "创建文章" }],
      isRecord: true
    };
  },
  created() {
    Object.assign(this.article, this.$store.state[StorageKey.ARTICLE]);
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
        this.$store.dispatch(ActionsKey.RECORD_ARTICLE, this.article);
      }
    },
    handlePublish() {
      this.$http.post($api.postArticle, this.article).then(res => {
        if (200 == res.code) {
          this.isRecord = false;
          this.$store.dispatch(ActionsKey.CLEAR_ARTICLE);//清除缓存的文章
          this.$message({ message: res.message, type: "success" });
          this.$router.replace({ path: "/admin/articleList" });
        }
      });
    }
  },
  components: {
    "article-edit": articleEdit
  }
};
</script>
