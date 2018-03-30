<template>
    <div class="blog-body" v-loading="loading">
      <div class="article-main">
        <div class="article-header">
          <h1 class="title">{{article.title}}</h1>
          <div class="clearfix">
            <div class="tags"><a class="tag" href="javascript:;" v-for="tag in article.tags" :key="tag">{{tag}}</a></div>
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
      <div class="article-main" v-show="relateArticle.length">
        <div class="article-title">相关文章</div>
        <div class="article-body">
          <ul class="article-relate">
            <li v-for="relate in relateArticle" :key="relate.id">
              <span class="title">《<a :href="`/article/${relate.id}`">{{relate.title}}</a>》</span>
              <div class="tags"><span class="tag" v-for="tag in relate.tags" :key="tag">{{tag}}</span></div>
              <span class="time">{{relate.publishAt, 'yyyy-MM-dd' | timeStampFormat}}</span>
              <p class="about">简介：{{relate.about}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="article-main">
        <div class="article-title">留言<span class="num-title" v-if="article.comments.length>0">（{{article.comments.length}}条）</span></div>
        <div class="article-body">
          <ul class="article-comments">
            <template v-if="article.comments.length>0">
              <li v-for="(comment, index) in article.comments" :key="index" :id="'comment-'+comment.id">
                <div class="comment-floor">
                  <div class="comment-name">{{comment.name}}<i class="verify"></i>&nbsp;说：</div>
                  <div class="comment-layer">第<span class="num-layer">{{index+1}}</span>楼</div>
                </div>
                <div class="comment-content" v-html="comment.content"><template ></template></div>
                <div class="comment-reply">
                  <span class="mark-view-time">{{comment.createdAt | timeStampFormat}}</span>|<a :href="'#comment-'+comment.id">#</a>|<a href="javascript:void(0)" @click="handleAddReply(comment, index)">回复</a>
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
                    <el-tag v-for="(reply, index) in replys" :key="reply.index" closable @close="handleRemoveReply(index)">{{1+reply.index}}楼</el-tag>
                    <el-input type="textarea" :rows="6" :autosize="false" v-model="comment.content" placeholder="请输入评论" v-focus="commentFocus"></el-input>
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
import { StoreKey, ActionsKey } from "store/types";
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
      loading: true,
      article: {
        id: this.$route.params.articleId,
        comments: []
      },
      replys: [],
      relateArticle: [],
      comment: {
        ...this.$store.state[StoreKey.COMMENT_USER],
        checked: true
      },
      commentRules: {
        name: [{ required: true, message: "请填写昵称", trigger: "blur" }],
        email: [{ required: true, message: "请填写邮箱", trigger: "blur" }],
        content: [{ required: true, message: "请选择评论", trigger: "blur" }]
      },
      commentFocus: {
        cls: "el-textarea",
        tag: "textarea",
        focus: false
      }
    };
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
  created() {
    this.getArticleDetail();
  },
  methods: {
    getArticleDetail() {
      this.$http
        .get($api.getArticleDetail, { params: this.article })
        .then(res => {
          if (200 == res.code) {
            this.article = Object.assign({}, this.article, res.data);
            this.getArticleRelate();
            this.loading = false;
          } else {
            this.$router.replace({ path: "/" });
          }
        });
    },
    getArticleRelate() {
      this.$http
        .get($api.getArticleRelate, {
          params: {
            classify: this.article.classify
          }
        })
        .then(res => {
          if (200 == res.code) {
            this.relateArticle = res.data.list;
          }
        });
    },
    handleAddReply(data, index) {
      for (let i = this.replys.length - 1; i >= 0; i--) {
        if (index == this.replys[i].index) return;
      }
      this.replys.push({
        index,
        name: data.name,
        content: data.content
      });
      this.commentFocus.focus = true;
    },
    handleRemoveReply(index) {
      this.replys.splice(index, 1);
      this.commentFocus.focus = true;
    },
    handleComment() {
      this.$refs.commentRef.validate(valid => {
        if (valid) {
          this.$http
            .put($api.putArticleComment, {
              id: this.article.id,
              comment: Object.assign(this.comment, {
                content: this.getAssemComment()
              })
            })
            .then(res => {
              if (200 == res.code) {
                this.$message({ message: res.message, type: "success" });
                this.article.comments = res.data;
                this.$refs.commentRef.resetFields(); //清除表单状态
                this.comment.content = "";
                this.replys = [];
                if (this.comment.checked) {
                  this.$store.dispatch(
                    ActionsKey.RECORD_COMMENT_USER,
                    this.comment
                  );
                } else {
                  this.comment.name = "";
                  this.comment.email = "";
                  this.$store.dispatch(ActionsKey.CLEAR_COMMENT_USER);
                }
              }
            });
        }
      });
    },
    getAssemComment() {
      let replys = this.replys.map(reply => {
        let content = reply.content.replace(
          /<blockquote>.*<\/blockquote>[\s]*/g,
          ""
        );
        return `<blockquote><pre>回复[${reply.index + 1}楼]${
          reply.name
        }的发言：</pre><p>${content}</p></blockquote>`;
      });
      return replys.join("\n") + this.comment.content;
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
<style lang="scss">
.article-main {
  margin: 10px 0;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);

  .tags {
    display: inline-block;
    .tag {
      margin-right: 6px;
      padding: 2px 6px;
      border-radius: 2px;
      text-decoration: none;
      font-size: 12px;
      color: #0084ff;
      background-color: #daedff;

      &:hover {
        color: #fff;
        background-color: #0084ff;
      }
    }
  }

  .article-header {
    margin: 0 30px;
    padding: 30px 5px;
    padding-bottom: 20px;
    border-bottom: 1px solid #dadada;

    .title {
      margin-bottom: 15px;
      font-size: 32px;
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

    .num-title {
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

    .el-tag {
      margin: 0 4px;
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

  .article-relate {
    padding: 10px 20px;

    li {
      padding: 15px 10px;

      & + li {
        border-top: 1px solid #dadada;
      }

      .title {
        font-size: 16px;
        font-weight: bold;
        vertical-align: middle;
      }
      .tags {
        margin-left: 4px;
      }

      .time {
        float: right;
        color: #999;
      }
      .about {
        width: 80%;
        padding-top: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #999;
      }
    }
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

      blockquote {
        overflow: hidden;
        padding: 10px 16px;
        margin-bottom: 15px;
        border-radius: 4px;
        background-color: #f8f8f8;
        border: 1px solid #cccccc;

        pre {
          font-size: 14px;
          font-weight: bold;
        }
        p {
          font-size: 14px;
        }
      }
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
