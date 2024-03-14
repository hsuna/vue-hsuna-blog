<template>
  <blog-main v-loading="loading" :activeIndex="'article'" :showMore="false">
    <div class="article-main">
      <div class="article-header">
        <h1 class="title">{{ article.title }}</h1>
        <div class="info">
          <div class="tags"><a class="tag" href="javascript:;" v-for="tag in article.tags" :key="tag">{{ tag }}</a>
          </div>
          <div class="classify">{{ article.classify?.title }}</div>
          <div class="time">
            <span>发布于{{ timeStampFormat(article.publishAt, 'yyyy-MM-dd') }}</span>
            <span>{{ article.viewCount }}次浏览</span>
            <span>最后一次编辑 {{ timeAgoFormat(article.updatedAt) }}</span>
          </div>
        </div>
      </div>
      <div class="article-body">
        <div class="article-about" v-html="article.about"></div>
        <div class="markdown-body" v-html="markdownToHtml(article.content)"></div>
      </div>
      <div class="article-footer">
        <a :href="href" alt="转载链接">链接：{{ href }}</a>
        <p>著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</p>
      </div>
    </div>
    <div class="article-main" v-show="relateArticle.length">
      <div class="article-title">相关文章</div>
      <div class="article-body">
        <ul class="article-relate">
          <li v-for="relate in relateArticle" :key="relate.id">
            <span class="title">《<a :href="`/article/${relate.id}`">{{ relate.title }}</a>》</span>
            <div class="tags"><span class="tag" v-for="tag in relate.tags" :key="tag">{{ tag }}</span></div>
            <div class="time">
              <span>{{ timeStampFormat(relate.publishAt, 'yyyy-MM-dd') }}</span>
              <span>{{ relate.viewCount }}次浏览</span>
            </div>
            <p class="about">简介：{{ relate.about }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="article-main">
      <div class="article-title">留言<span class="num-title" v-if="article.comments?.length">（{{
    article.comments?.length
    || 0 }}条）</span></div>
      <div class="article-body">
        <ul class="article-comments">
          <template v-if="article.comments?.length">
            <li v-for="(comment, index) in article.comments" :key="index" :id="`c-${comment.id}`">
              <div class="comment-floor">
                <div class="comment-name"><i class="fa fa-vimeo" v-show="comment.admin"></i>{{ comment.name }}&nbsp;说：
                </div>
                <div class="comment-layer">第<span class="num-layer">{{ index + 1 }}</span>楼</div>
              </div>
              <div class="comment-content" v-html="comment.content"></div>
              <div class="comment-reply">
                <span class="mark-view-time">{{ timeStampFormat(comment.createdAt) }}</span>
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
                  <el-tag v-for="(reply, index) in replys" :key="reply.index" closable
                    @close="handleRemoveReply(index)">{{ 1
    + reply.index }}楼</el-tag>
                  <el-input ref="textarea" type="textarea" :rows="6" :autosize="false" v-model="comment.content"
                    placeholder="请输入评论"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="" label-width="80px" prop="checked">
                  <el-button type="primary" :loading="commentLoading" @click="handleComment">{{ commentLoading ? '提交中'
    :
                    '提　交' }}</el-button>
                  <el-checkbox v-model="comment.checked" style="padding-left: 10px;">记住个人信息？</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </div>
  </blog-main>
</template>

<script>
import { ElFormItem, ElForm, ElRow, ElCol, ElInput, ElButton, ElCheckbox, ElTag, ElMessage } from 'element-plus';
import BlogMain from "src/components/blog-main/index.vue";

import { setDocumentTitle } from "src/utils/title.js";

import storage, { StorageKey } from 'src/utils/storage.js'
import { timeAgoFormat, timeStampFormat } from 'src/utils/date.js'
import markMixin from "src/mixin/mark.js";

import Api from "src/api/blog.js";

let visitor = storage.get(StorageKey.VISITOR)

export default {
  mixins: [markMixin],
  components: {
    ElForm,
    ElFormItem,
    ElRow,
    ElCol,
    ElInput,
    ElButton,
    ElCheckbox,
    ElTag,

    BlogMain
  },
  data() {
    return {
      href: window.location.href,
      loading: true,
      article: {
        id: this.$route.params.id,
        content: '',
        comments: []
      },
      replys: [], //回复楼层
      relateArticle: [],
      comment: {
        checked: true,
        ...(visitor.comment || {})
      },
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
  methods: {
    // 过滤器：filters
    timeAgoFormat,
    timeStampFormat,
    //////////////////////////////
    async getArticleDetail() {
      const res = await Api.getArticleDetail({ id: this.article.id })
      if (200 == res.statusCode) {
        this.article = {
          ...this.article,
          ...res.data,
        };
        this.updateArticleViewCount(); //更新文章的浏览次数
        await this.getArticleRelate();
        this.$nextTick(this.goCommentHash)
        this.loading = false;
        setDocumentTitle(`${this.article.title} | 文章详情 | HSUAN`);
      } else {
        this.$router.push({ path: '/' });
      }
    },
    async getArticleRelate() {
      let res = await Api.getArticleRelate({
        id: this.article.id,
        classifyId: this.article.classifyId,
      })
      if (200 == res.statusCode) {
        this.relateArticle = res.data.rows;
      }
    },
    getAssemComment() {
      let replys = this.replys.map(reply => {
        let content = reply.content.replace(
          /<blockquote>.*<\/blockquote>[\s]*/g,
          ""
        );
        return `<blockquote><pre>回复[${reply.index + 1}楼]${reply.name
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
            if (200 == res.statusCode) {
              this.article.viewCount += 1;
              visitor.ids.push(this.article.id);
              storage.set(StorageKey.VISITOR, visitor);
            }
          });
      }
    },
    handleAddReply(data, index) {
      if (!this.replys.some(reply => reply.index === index)) {
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
            ...this.comment,
            content: this.getAssemComment(),
            articleId: this.article.id
          }).then(res => {
            if (200 == res.statusCode) {
              ElMessage.success('提交评论成功');
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
.article-main {
  margin: 10px 0;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);

  .info {
    display: flex;
    align-content: center;
  }

  .tags {
    vertical-align: middle;

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

      span+span:before {
        padding: 0 4px;
        content: "•";
      }
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
    margin: 0 15px;
    padding: 15px 0;
    border-top: 1px dashed #dadada;

    .title {
      padding-left: 8px;
      font-size: 20px;
      color: #2b3f52;
    }

    .el-tag {
      margin: 0 4px;
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
      font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, Courier, monospace;
      background-color: #fff5f5;
      color: #ff502c;
    }

    a {
      color: #0084ff;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .article-relate {
    padding: 10px 20px;

    li {
      padding: 15px 10px;

      &+li {
        border-top: 1px solid #dadada;
      }

      .title {
        display: inline-block;
        max-width: 100%;
        margin-bottom: 10px;
        font-size: 16px;
        font-weight: bold;
        vertical-align: middle;
      }

      .tags {
        margin-left: 4px;
        margin-bottom: 10px;
      }

      .time {
        float: right;
        color: #999;

        span+span:before {
          content: "•";
          padding: 0 4px;
        }
      }

      .about {
        width: 100%;
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

@media screen and (max-width: 750px) {
  .article-main {
    .article-header {
      .title {
        font-size: 28px;
      }

      .time {
        display: block;
        margin-top: 10px;
      }
    }
  }
}
</style>
