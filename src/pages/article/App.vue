<template>
  <div id="app" style="height: 100%;">
    <blog-main v-loading="loading" :activeIndex="'article'">
      <div class="article-main">
        <div class="article-header">
          <h1 class="title">{{article.title}}</h1>
          <div class="clearfix">
            <div class="tags"><a class="tag" href="javascript:;" v-for="tag in article.tags" :key="tag">{{tag}}</a></div>
            <div class="classify">{{article.classify}}</div>
            <div class="time">
              <span>发布于{{article.publishAt | timeStampFormat('yyyy-MM-dd')}}</span>
              <span>{{article.viewCount}}次浏览</span>
              <span>最后一次编辑 {{article.updatedAt | timeAgoFormat}}</span>
            </div>
          </div>
        </div>
        <div class="article-body">
          <div class="article-about" v-html="article.about"></div>
          <div class="markdown-body" v-html="markdownToHtml(article.content)"></div>
        </div>
        <div class="article-footer">
          <p>版权声明：本文为博主思考总结而得，欢迎大家转载指导</p>
          <a :href="href" alt="转载路径">{{href}}</a>
        </div>
      </div>
      <div class="article-main" v-show="relateArticle.length">
        <div class="article-title">相关文章</div>
        <div class="article-body">
          <ul class="article-relate">
            <li v-for="relate in relateArticle" :key="relate.id">
              <span class="title">《<a :href="`/article.html?id=${relate.id}`">{{relate.title}}</a>》</span>
              <div class="tags"><span class="tag" v-for="tag in relate.tags" :key="tag">{{tag}}</span></div>
              <div class="time">
                <span>{{relate.publishAt | timeStampFormat('yyyy-MM-dd')}}</span>
                 <span>{{article.viewCount}}次浏览</span>
              </div>
              <p class="about">简介：{{relate.about}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="article-main">
        <div class="article-title">留言<span class="num-title" v-if="article.commentCount>0">（{{article.commentCount}}条）</span></div>
        <div class="article-body">
          <ul class="article-comments">
            <template v-if="article.commentCount>0">
              <li v-for="(comment, index) in article.comments" :key="index" :id="`c-${comment.id}`">
                <div class="comment-floor">
                  <div class="comment-name"><i class="fa fa-vimeo" v-show="comment.admin"></i>{{comment.name}}&nbsp;说：</div>
                  <div class="comment-layer">第<span class="num-layer">{{index+1}}</span>楼</div>
                </div>
                <div class="comment-content" v-html="comment.content"><template ></template></div>
                <div class="comment-reply">
                  <span class="mark-view-time">{{comment.createdAt | timeStampFormat}}</span>
                  |
                  <a :href="`#c-${comment.id}`">#</a>
                  |
                  <a href="javascript:;" @click="handleAddReply(comment, index)">回复</a>
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
                    <el-input ref="textarea" type="textarea" :rows="6" :autosize="false" v-model="comment.content" placeholder="请输入评论"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="" label-width="80px" prop="checked">
                    <el-button type="primary" :loading="commentLoading" @click="handleComment">{{commentLoading?'提交中':'提　交'}}</el-button>
                    <el-checkbox v-model="comment.checked" style="padding-left: 10px;">记住个人信息？</el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
    </blog-main>
  </div>
</template>

<script>
import { FormItem, Form, Row, Col, Input, Button, Checkbox, Tag, Message } from 'element-ui';
import BlogMain from "src/components/blog-main";

import { setDocumentTitle } from "src/utils/title";

import storage, { StorageKey } from 'src/utils/storage'
import { timeAgoFormat, timeStampFormat } from 'src/utils/date'
import { params } from 'src/utils/search'
import markMixin from "src/mixin/mark";

import Api from "src/api/blog";

let visitor = storage.get(StorageKey.VISITOR)

export default {
  components: {
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Row.name]: Row,
    [Col.name]: Col,
    [Input.name]: Input,
    [Button.name]: Button,
    [Checkbox.name]: Checkbox,
    [Tag.name]: Tag,

    BlogMain
  },
  data() {
    return {
      href: window.location.href,
      loading: true,
      article: {
        id: params('id'),
        content: '',
        comments: []
      },
      replys: [], //回复楼层
      relateArticle: [],
      comment: Object.assign(
        { checked: true },
        this.$store.getters.commentUser
      ),
      commentRules: {
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            message: "请输入正确邮箱的格式",
            pattern: /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/,
            trigger: "blur"
          }
        ],
        content: [{ required: true, message: "请输入评论", trigger: "blur" }]
      },
      commentLoading: false,
    };
  },
  async created() {
    await this.getArticleDetail();
  },
  mixins: [markMixin],
  filters: {
    timeAgoFormat,
    timeStampFormat,
  },
  methods: {
    async getArticleDetail() {
      let res = await Api.getArticleDetail({ params: this.article })
      if (200 == res.code) {
        this.article = Object.assign({}, this.article, res.data);
        this.updateArticleViewCount(); //更新文章的浏览次数
        await this.getArticleRelate();
        this.$nextTick(this.goCommentHash)
        this.loading = false;
        setDocumentTitle(`${this.article.title} | 文章详情 | HSUAN`);
      } else {
        window.location.href = '/index.html';
      }
    },
    async getArticleRelate() {
      let res = await Api.getArticleRelate({ params: { classify: this.article.classify } })  
      if (200 == res.code) {
        this.relateArticle = res.data.list;
      }
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
    updateArticleViewCount() {
      if (!visitor.ids) visitor.ids = []
      
      if (!visitor.ids.includes(this.article.id)) {
        Api.putArticleViewCount({
          id: this.article.id,
          viewCount: this.article.viewCount + 1
        })
        .then(res => {
          if(200 == res.code){
            this.article.viewCount += 1;
            visitor.ids.push(this.article.id);
            storage.set(StorageKey.VISITOR, visitor);
          }
        });
      }
    },
    handleAddReply(data, index) {
      if(!this.replys.some(reply => reply.index === index)){
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
          }).then(res => {
              if (200 == res.code) {
                Message({ message: res.message, type: "success" });
                this.article.comments.push(res.data);
                this.article.commentCount += 1;
                let { name, email, checked } = this.comment;
                this.replys = []; //清除回复楼层
                this.$refs.commentRef.resetFields(); //清除表单状态
                if (this.comment.checked) {
                  this.comment = { name, email, checked };
                  // 缓存用户信息
                  visitor.comment = { ...this.comment };
                } else {
                  // 清空用户信息
                  visitor.comment = {};
                }
                storage.set(StorageKey.VISITOR, visitor);
              }
              this.commentLoading = false;
            });
        }
      });
    },
    goCommentHash(id) {
      id = id || window.location.hash.replace("#", "");
      let elem = document.getElementById(id);
      if (elem) {
        document.body.scrollTop = document.documentElement.scrollTop =
          elem.offsetTop - 15;
      }
    }
  }
};
</script>

<style lang="scss">
@import "./style.scss";
</style>

