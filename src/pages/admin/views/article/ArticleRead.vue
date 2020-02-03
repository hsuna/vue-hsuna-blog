<template>
  <div class="admin">
    <admin-header :routerList="breadcrumbs"></admin-header>
    <div class="admin-body">
      <div class="article-read">
        <div class="article-header">
          <h1 class="title">{{article.title}}</h1>
          <div class="clearfix">
            <div class="tags"><a class="tag" href="javascript:;" v-for="tag in article.tags" :key="tag">{{tag}}</a></div>
            <div class="classify">{{article.classify}}</div>
            <div class="time">
              <span>发布于{{article.publishAt | timeStampFormat('yyyy-MM-dd')}}</span>
              <span>{{article.viewCount}}次浏览</span>
              <span>最后一次编辑是{{article.updatedAt | timeAgoFormat}}</span>
            </div>
          </div>
        </div>

        <div class="article-body">
          <div class="article-about" v-html="article.about"></div>
          <div class="markdown-body" v-html="markdownToHtml(article.content)"></div>
              <ul class="article-comments">
              <li v-for="(comment, index) in article.comments" :key="index">
                <div class="comment-floor">
                  <div class="comment-name"><i class="fa fa-vimeo" v-show="comment.admin"></i>{{comment.name}}&nbsp;说：</div>
                  <div class="comment-layer">第<span class="num-layer">{{index+1}}</span>楼</div>
                </div>
                <div class="comment-content" v-html="comment.content"><template ></template></div>
                <div class="comment-reply">
                  <span class="mark-view-time">{{comment.createdAt | timeStampFormat}}</span>|<a href="javascript:;" @click="handleAddReply(comment, index)">回复</a>|<a href="javascript:;" @click="handleRemoveComment(comment, index)">删除</a>
                </div>
              </li>
          </ul>
        </div>

        <div class="article-footer">
          <div style="padding-top: 20px;">
            <el-form ref="commentRef" :model="comment" :rules="commentRules">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="评论：" label-width="80px" prop="content">
                    <el-tag v-for="(reply, index) in replys" :key="reply.index" closable @close="handleRemoveReply(index)">{{1+reply.index}}楼</el-tag>
                    <el-input ref="textarea" type="textarea" :rows="6" :autosize="false" v-model="comment.content" placeholder="请输入评论"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="" label-width="80px" prop="checked">
                    <el-button type="primary" :loading="commentLoading" @click="handleComment">{{commentLoading?'提交中':'提　交'}}</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Form, FormItem, Row, Col, Tag, Input, Button, Message, MessageBox } from 'element-ui';

import AdminHeader from "src/components/admin-header";

import { timeStampFormat, timeAgoFormat } from 'src/utils/date'
import Api from "src/api/admin";
import markMixin from "src/mixin/mark";

export default {
  components: {
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tag.name]: Tag,
    [Input.name]: Input,
    [Button.name]: Button,

    AdminHeader
  },
  mixins: [
    markMixin
  ],
  data() {
    return {
      loading: true,
      article: {
        id: this.$route.params.articleId,
        content: '',
        comments: []
      },
      replys: [], //回复楼层
      comment: {
        name: this.$store.getters.userName,
        email: this.$store.getters.userEmail
      },
      commentRules: {
        content: [{ required: true, message: "请输入评论", trigger: "blur" }]
      },
      commentLoading: false,
      breadcrumbs: [
        { text: "首页", path: "/admin" },
        { text: "文章管理", path: "/admin/articleList" },
        { text: "查看文章" }
      ]
    };
  },
  created() {
    this.getArticle();
  },
  filters: {
    timeStampFormat,
    timeAgoFormat,
  },
  methods: {
    getArticle() {
      Api.getArticle({
          params: {
            id: this.article.id
          }
        })
        .then(res => {
          if (200 == res.code) {
            let { list } = res.data;
            this.article = Object.assign({}, this.article, list[0]);
          }
          this.loading = false;
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
    },
    handleAddReply(data, index) {
      if(!this.replys.some(reply => index == reply.index)){
        this.replys.push({
          index,
          name: data.name,
          content: data.content
        });
      }
      this.$refs['textarea'].focus();
    },
    handleRemoveReply(index) {
      this.replys.splice(index, 1);
      this.$refs['textarea'].focus();
    },
    handleComment() {
      this.$refs.commentRef.validate(valid => {
        if (valid) {
          this.commentLoading = true;
          Api.postComment({
              id: this.article.id,
              comment: Object.assign({}, this.comment, {
                articleId: this.article.id,
                content: this.getAssemComment()
              })
            })
            .then(res => {
              if (200 == res.code) {
                Message.success('提交评论成功');
                this.article.comments.push(res.data);
                this.article.commentCount += 1;
                this.replys = []; //清除回复楼层
                this.$refs.commentRef.resetFields(); //清除表单状态
              }
              this.commentLoading = false;
            });
        }
      });
    },
    handleRemoveComment(comment, index) {
      MessageBox.confirm("确认删除该评论？").then(res => {
          Api.deleteComment({
              params: {
                articleId: this.article.id,
                id: comment._id
              }
            })
            .then(res => {
              if (200 == res.code) {
                Message.success('删除评论成功');
                this.article.comments.splice(index, 1);
              }
            });
        })
        .catch(err => {});
    }
  },
};
</script>

<style lang="scss">
.article-read {
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

      span + span:before {
        padding: 0 4px;
        content: "•";
      }
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

    code {
      padding: 0 5px;
      white-space: nowrap;
      border-radius: 3px;
      font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
      background-color: #fff5f5;
      color: #ff502c;
    }
    a {
      color: #0084ff;

      &:hover{
        text-decoration: underline;
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

      .fa {
        margin-right: 4px;
        padding: 2px;
        border-radius: 4px;
        background-color: #ffb517;
        color: #fff;
      }
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
