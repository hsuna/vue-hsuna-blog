import { ActionName, MutationName } from "store/types";
import { setDocumentTitle } from "utils";

import markMixin from "../../mixin/mark";

import $api from "api/guest";

export default {
  data() {
    return {
      href: window.location.href,
      loading: true,
      article: {
        id: this.$route.params.articleId,
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
      commentFocus: {
        cls: "el-textarea",
        tag: "textarea",
        focus: false
      }
    };
  },
  created() {
    this.getArticleDetail();
  },
  mixins: [markMixin],
  methods: {
    getArticleDetail() {
      this.$http
        .get($api.getArticleDetail, { params: this.article })
        .then(res => {
          if (200 == res.code) {
            this.article = Object.assign({}, this.article, res.data);
            this.updateArticleViewCount(); //更新文章的浏览次数
            this.getArticleRelate();
            this.$nextTick(this.goCommentHash);
            this.loading = false;
            setDocumentTitle(`${this.article.title} | 文章详情 | HSUAN`);
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
      this.$store
        .dispatch(ActionName.ADD_VIEW_TIME, {
          article: this.article,
          vm: this
        })
        .then(res => {
          if (200 == res.code) {
            this.article.viewCount = res.count;
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
          this.commentLoading = true;
          this.$http
            .post($api.postComment, {
              id: this.article.id,
              comment: Object.assign({}, this.comment, {
                articleId: this.article.id,
                content: this.getAssemComment()
              })
            })
            .then(res => {
              if (200 == res.code) {
                this.$message({ message: res.message, type: "success" });
                this.article.comments.push(res.data);
                this.article.commentCount += 1;
                let { name, email, checked } = this.comment;
                this.replys = []; //清除回复楼层
                this.$refs.commentRef.resetFields(); //清除表单状态
                if (this.comment.checked) {
                  this.comment = { name, email, checked };
                  this.$store.commit(
                    MutationName.SET_COMMENT_USER,
                    this.comment
                  );
                } else {
                  this.$store.commit(MutationName.CLEAR_COMMENT_USER);
                }
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
