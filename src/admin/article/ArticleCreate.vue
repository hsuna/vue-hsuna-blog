<template lang="html">
  <article-edit ref="articleEdit" :article="article" :breadcrumbs="breadcrumbs">
    <el-button type="primary" @click="handlePublish(false)">{{1==article.isPublic?'公开发布':'私人保存'}}</el-button>
    <el-button type="primary" @click="handlePublish(true)">暂存草稿</el-button>
  </article-edit>
</template>

<script>
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
        isPublic: 1, //是否公开
        isDraft: 0 //是否草稿
      },
      breadcrumbs: [{ text: "创建文章" }]
    };
  },
  created() {
    Object.assign(this.article, this.$store.state.article);
    console.log(this.article);
  },
  methods: {
    handlePublish(isDraft) {
      this.article.isDraft = isDraft ? 1 : 0;
      this.$refs.articleEdit.validate(valid => {
        if (valid) {
          this.$http.post($api.postArticle, this.article).then(res => {
            if (200 == res.code) {
              this.$message({ message: res.message, type: "success" });
              this.$router.replace({ path: "/admin/articleList" });
            }
          });
        }
      });
    }
  },
  components: {
    "article-edit": articleEdit
  }
};
</script>
