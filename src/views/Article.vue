<template>
    <div class="blog-body">         
      <div class="article-main">
        <div class="article-header">
          <h1 class="title">{{article.title}}</h1>
          <div class="clearfix">
            <div class="tags"><a href="javascript:;" v-for="tag in article.tags" :key="tag">{{tag}}</a></div>
            <div class="classify">{{article.classify}}</div>
            <div class="time">{{article.publishAt, 'yyyy年MM月dd日' | timeStampFormat}}发布</div>
          </div>
        </div>
        <div class="article-about">{{article.about}}</div>
        <div class="article-markdown">
          <div class="markdown-body" v-html="markdownToHtml">
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/googlecode.css";

import $api from "api/guest";

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  }
});

export default {
  data() {
    return {
      article: {
        id: this.$route.params.articleId
      }
    };
  },
  created() {
    this.$http
      .get($api.getArticleDetail, { params: this.article })
      .then(res => {
        if (200 == res.code) {
          this.article = Object.assign({}, this.article, res.data);
        } else {
          console.log("找不到该文章");
        }
      });
  },
  computed: {
    markdownToHtml() {
      if (this.article) {
        return marked(this.article.content || "", { sanitize: true });
      } else {
        return "";
      }
    }
  },
  methods: {}
};
</script>

<style lang="scss">
@import "~assets/styles/markdown-body";
</style>
<style lang="scss" scoped>
.article-main {
  margin: 10px 0;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);

  .article-header {
    margin: 0 30px;
    padding: 30px 5px;
    padding-bottom: 20px;
    border-bottom: 1px solid #dadada;

    .title {
      margin-bottom: 15px;
      font-size: 32px;
    }

    .tags {
      display: inline-block;
      a {
        margin-right: 6px;
        padding: 0 4px;
        text-decoration: none;
        color: #0084ff;
        background-color: #daedff;

        &:hover {
          color: #fff;
          background-color: #0084ff;
        }
      }
    }

    .classify {
      display: inline-block;
      margin-right: 10px;
      font-weight: bold;
      color: #0084ff;
    }

    .time {
      display: inline-block;
      color: #999;
    }
  }

  .article-about {
    padding: 15px;
    margin: 25px 30px 0;
    border-left: 2px solid #0084ff;
    background-color: #fafafa;
  }
  .article-detail {
  }
}
</style>
