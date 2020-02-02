<template lang="html">
  <article-edit :article="article" :breadcrumbs="breadcrumbs" :isEdit="true" @submit="handlePublish"></article-edit>
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
        id: this.$route.params.articleId,
        title: "", //文章标题
        about: "", //文章简介
        classify: "", //文章所属分类
        content: "", //文章内容
        tags: [], //文章标签
        files: [], //文章链接图片
        status: 1 //0:草稿 | 1:发布 | 2:收藏
      },
      breadcrumbs: [{ text: "编辑文章" }]
    };
  },
  created() {
    //获取编辑信息
    Api.getArticle({
        params: {
          id: this.article.id
        }
      })
      .then(res => {
        if (200 == res.code) {
          let { list } = res.data;
          if (list && list.length > 0) {
            Object.assign(this.article, list[0]);
          } else {
            this.$router.replace({ path: "/admin/articleList" });
            Message.error("不存在该文章");
          }
        }
      });
  },
  methods: {
    handlePublish(callback) {
      Api.putArticle(this.article).then(res => {
        if (200 == res.code) {
          this.$store.dispatch(ActionName.ADD_ARTICLE_TAGS, this.article.tags);
          Message({ message: res.message, type: "success" });
          this.$router.replace({ path: "/admin/articleList" });
        }
        callback && callback();
      });
    }
  },
};
</script>
