<template lang="html">
  <article-edit :article="article" :breadcrumbs="breadcrumbs" @submit="handlePublish"></article-edit>
</template>

<script>
import articleEdit from "components/article-edit";
import $api from "api/admin";

export default {
  data() {
    return {
      article: {
        id: this.$route.params.articleId,
        title: "", //文章标题
        about: "", //文章简介
        classify: "", //文章所属分类
        content: "", //文章内容
        tags: [], //文章标签
        status: 1 //0:草稿 | 1:发布 | 2:收藏
      },
      breadcrumbs: [{ text: "编辑文章" }]
    };
  },
  created() {
    //获取编辑信息
    this.$http
      .get($api.getArticle, {
        params: {
          id: this.article.id
        }
      })
      .then(res => {
        if (200 == res.code) {
          let { list } = res.data;
          if (list && list.length>0) {
            Object.assign(this.article, list[0]);
          } else {
            this.$router.replace({ path: "/admin/articleList" });
            this.$message.error("不存在该文章");
          }
        }
      });
  },
  methods: {
    handlePublish() {
      this.$http.put($api.putArticle, this.article).then(res => {
        if (200 == res.code) {
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
