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
        <div class="article-body">
          <div class="article-about">{{article.about}}</div>
          <div class="markdown-body" v-html="markdownToHtml">
          </div>
        </div>
        <!-- <div class="article-footer">
        </div> -->
      </div>
      <div class="article-main">
        <div class="article-title">相关文章</div>
        <div class="article-body">

        </div>
      </div>
      <div class="article-main">
        <div class="article-title">留言<span class="num-title" v-if="article.comments.length>0">（{{article.comments.length}}条）</span></div>
        <div class="article-body">
          <ul class="article-comments">
            <template v-if="article.comments.length>0">
              <li v-for="(comment, index) in article.comments" :key="index">
                <div class="comment-floor">
                  <div class="comment-name">{{comment.name}}<i class="verify"></i>&nbsp;说：</div>
                  <div class="comment-layer">第<span class="num-layer">{{index+1}}</span>楼</div>
                </div>
                <div class="comment-content">{{comment.content}}</div>
                <div class="comment-reply">
                  <span class="mark-view-time">{{comment.createdAt | timeStampFormat}}</span>|<a href="#">#</a>|<a href="javascript:void(0)">回复</a>
                </div>
              </li>
            </template>
            <template v-else>
              <li>还没有人评论，赶紧抢沙发～</li>
            </template>
          </ul>
        </div>
        <div class="article-footer">
          <div class="title">发表评论</div>
          <div style="padding-top: 20px;">
            <el-form ref="commentRef" :model="comment" :rules="commentRules">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="昵称：" label-width="80px" prop="name">
                    <el-input v-model="comment.name" placeholder="请输入昵称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮箱：" label-width="80px" prop="email">
                    <el-input v-model="comment.email" placeholder="请输入邮箱"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="评论：" label-width="80px" prop="content">
                    <el-input type="textarea" :rows="4" :autosize="false" v-model="comment.content" placeholder="请输入评论"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="" label-width="80px" prop="checked">
                    <el-button type="primary" @click="handleComment">提　交</el-button>
                    <el-checkbox v-model="comment.checked" style="padding-left: 10px;">记住个人信息？</el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { StorageKey, ActionsKey } from "store/types";
import marked from "marked";
import hljs from "highlight.js";

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
        id: this.$route.params.articleId,
        comments: []
      },
      comment: {
        ...this.$store.state[StorageKey.COMMENT_USER],
        checked: true
      },
      commentRules: {
        name: [{ required: true, message: "请填写昵称", trigger: "blur" }],
        email: [{ required: true, message: "请填写邮箱", trigger: "blur" }],
        content: [{ required: true, message: "请选择评论", trigger: "blur" }]
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
  methods: {
    handleComment() {
      this.$refs.commentRef.validate(valid => {
        if (valid) {
          this.$http
            .put($api.putArticleComment, {
              id: this.article.id,
              comment: this.comment
            })
            .then(res => {
              if (200 == res.code) {
                this.$message({ message: res.message, type: "success" });
                this.article.comments = res.data;
                if (this.comment.checked) {
                  this.comment.content = "";
                  this.$store.dispatch(
                    ActionsKey.RECORD_COMMENT_USER,
                    this.comment
                  );
                } else {
                  this.$store.dispatch(ActionsKey.CLEAR_COMMENT_USER);
                  this.comment.name = "";
                  this.comment.email = "";
                  this.comment.content = "";
                }
              }
            });
        }
      });
    }
  }
};
</script>

<style>
@import "highlight.js/styles/googlecode.css";
</style>
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

  .article-title {
    padding: 10px 15px;
    font-size: 24px;
    border-bottom: 1px solid #dadada;
    color: #2b3f52;

    .num-title{
      margin-left: 10px;
      font-size: 18px;
      color: #999;
    }
  }

  .article-footer {
    padding: 15px;
    border-top: 1px solid #dadada;

    .title {
      padding-left: 8px;
      font-size: 20px;
      color: #2b3f52;
    }

    .prev-part,
    .next-part {
    }

    .prev-part {
    }
    .next-part {
    }
  }

  .article-about {
    line-height: 1.6;
    margin: 20px 30px 0;
    padding: 15px;
    word-break: break-all;
    word-wrap: break-word;
    border-left: 3px solid #0084ff;
    background-color: #fafafa;
  }

  .article-comments {
    padding-bottom: 1px;

    li {
      margin: 15px 20px;
      padding-bottom: 15px;
      border-bottom: 1px dashed #dadada;

      &:last-child {
        padding-bottom: 0;
        border-bottom-width: 0;
      }
    }

    .comment-floor {
      position: relative;
    }
    .comment-name {
      font-size: 16px;
      font-weight: bold;
    }
    .comment-layer {
      position: absolute;
      top: 1px;
      right: 0;

      .num-layer {
        padding: 0 4px;
        //font-style: italic;
      }
    }
    .comment-content {
      padding: 10px;
      line-height: 1.6;
      font-size: 16px;
    }
    .comment-reply {
      text-align: right;
      color: #999;

      span,
      a {
        padding-left: 4px;
        padding-right: 4px;
      }
    }
  }
}
</style>
