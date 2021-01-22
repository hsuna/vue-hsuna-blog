<template>
  <div class="admin">
    <admin-header :routerList="routerList"></admin-header>
    <div class="admin-body">
      <el-row style="margin-top: 20px;">
        <el-col :span="24">
          <el-form ref="articleRef" :model="article" :rules="articleRules">
            <el-row>
              <el-col :span='10' :push="1">
                <el-form-item label="文章标题：" label-width="100px" prop="title">
                  <el-input v-model="article.title" placeholder="请输入标题"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :push="3" >
                <el-form-item label="所属分类：" label-width="100px" prop="classify">
                  <el-select v-model="article.classify" placeholder="请选择分类">
                    <el-option v-for="(item,index) in classifyList" :label="item.title" :value="item.title" :key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
               <el-col :span='16' :push="1">
                <el-form-item label="文章标签：" label-width="100px" prop="tags">
                  <el-select v-model="article.tags" placeholder="请添加标签" style="width:100%;" multiple filterable allow-create>
                    <el-option v-for="(item,index) in tagList" :label="item.tag" :value="item.tag" v-bind:key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
               <el-col :span='23' :push="1">
                <el-form-item label="文章简介：" label-width="100px" prop="about">
                  <el-input v-model="article.about" placeholder="请输入简介"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23" :push="1">
                <el-form-item label="文章内容：" label-width="100px" class="show" prop="content" >
                  <vue-simplemde preview-class="markdown-body" v-model="article.content" :configs="configs"></vue-simplemde>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23" :push="1">
                <el-form-item label="图片上传：" label-width="100px" class="show">
                  <!-- :before-upload="handleBeforeUpload" -->
                  <el-upload class="article-upload"
                    :multiple="true"
                    :action="fileAction"
                    :headers="fileHeaders"
                    :file-list="article.files"
                    :on-success="handleSuccessFile"
                    :on-preview="handlePreviewFile"
                    :before-remove="handleRemoveFile" list-type="picture">
                    <el-button type="primary">点击上传</el-button>
                    <template #tip>
                      <div class="el-upload__tip">只能上传jpg/git/png文件，且不超过500kb</div>
                    </template>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18" :push="1">
                <el-form-item label-width="100px">
                  <el-button type="primary" @click="handleSubmit" :loading="submiting">{{submiting?'提交中':'提 交'}}</el-button>
                  <el-button @click="handleBack">返 回</el-button>
                  <div class="article-status">
                    <el-radio v-model="article.status" :label="0" v-if="!isEdit">暂存草稿</el-radio>
                    <el-radio v-model="article.status" :label="1">公开发布</el-radio>
                    <el-radio v-model="article.status" :label="2">设为私人</el-radio>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <el-dialog v-model="dialogImageVisible">
      <img style="width: 100%;" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import { ElInput, ElSelect, ElOption, ElRadio, ElForm, ElFormItem, ElRow, ElCol, ElDialog, ElUpload, ElButton, ElMessage, ElMessageBox }  from 'element-plus'
import VueSimplemde from "vue-simplemde";
import AdminHeader from "src/components/admin-header/index.vue";

import markMixin from "src/mixin/mark";

import Api from "src/api/admin";

export default {
  name: 'article-edit',
  mixins: [markMixin],
  components: {
    ElInput,
    ElSelect,
    ElOption,
    ElRadio,
    ElDialog,
    ElForm,
    ElFormItem,
    ElUpload,
    ElButton,
    ElRow,
    ElCol,

    AdminHeader,
    VueSimplemde,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    article: {
      type: Object,
      default: _ => ({
        title: "", //文章标题
        about: "", //文章简介
        classify: "", //文章所属分类
        content: "", //文章内容
        tags: [], //文章标签
        files: [], //文章链接图片
        status: 1 //0:草稿 | 1:发布 | 2:收藏
      })
    },
    breadcrumbs: {
      type: Array,
      default: _ => []
    }
  },
  data() {
    return {
      isModify: false,
      submiting: false,
      routerList: [
        { text: "首页", path: "/admin" },
        { text: "文章管理", path: "/admin/articleList" },
        ...this.breadcrumbs
      ],
      classifyList: [],
      tagList: this.$store.getters.tagList,

      articleRules: {
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        about: [{ required: true, message: "请填写简介", trigger: "blur" }],
        classify: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        content: [{ required: true, message: "请输入内容", trigger: "change" }]
      },

      fileAction: Api.postFileUpload(),
      fileHeaders: {
        Authorization: this.$store.getters.token
      },

      dialogImageVisible: false,
      dialogImageUrl: "",

      configs: {
        previewRender: this.markdownToHtml, //预览渲染
        autoDownloadFontAwesome: false, //禁止自动下载fa字体
        status: false // 禁用底部状态栏
      }
    };
  },
  created() {
    //获取分类列表
    Api.getClassify().then(res => {
      if (200 == res.code) {
        let { list, total } = res.data;
        this.classifyList = list;
      }
    });
  },
  /* computed: {
    btnText: {
      get() {
        if (1 == this.article.status) return "公开发布";
        else if (2 == this.article.status) return "私人保存";
        else return "暂存草稿";
      }
    }
  }, */
  methods: {
    handleBeforeUpload(file) {
      //return false; //返回false不会自动上传
    },
    handleSuccessFile(res, file, fileList) {
      if (200 == res.code) {
        ElMessage.success('文件上传成功');
        Object.assign(file, res.data);
        this.article.files = [ ...fileList ];
      }
    },
    handlePreviewFile(file) {
      this.dialogImageUrl = file.url;
      this.dialogImageVisible = true;
    },
    handleRemoveFile(file, fileList) {
      return new Promise((resolve, reject) => {
        Api.deleteFileUpload({
            params: {
              articleId: this.article.id,
              id: file.id
            }
          })
          .then(res => {
            if (200 == res.code) {
              ElMessage.success('文件删除成功');
              resolve();
            } else {
              reject();
            }
          })
          .catch(err => {
            reject();
          });
      });
    },
    handleSubmit() {
      this.$refs.articleRef.validate(valid => {
        if (valid) {
          this.submiting = true;
          this.$emit("submit", _ => {
            this.submiting = false;
          });
        }
      });
    },
    handleBack() {
      if (this.isModify) {
        ElMessageBox.confirm("文章内容有改动，是否不保存直接返回？").then(res => {
          window.location.href = '/admin.html#/admin/articleList';
        }).catch(err => {});
      } else {
        window.location.href = '/admin.html#/admin/articleList';
      }
    }
  },
};
</script>

<style lang="scss">
@import 'simplemde/dist/simplemde.min';
@import "highlight.js/styles/googlecode";
@import "~src/assets/styles/markdown-body.scss";

.vue-simplemde .CodeMirror, .CodeMirror-scroll{
  max-height: 800px;
}
.el-upload__tip {
  display: inline-block;
  margin-left: 10px;
}
.article-upload {
  .el-upload-list {
    margin-top: 10px;
  }
  .el-upload-list__item {
    display: inline-block;
    width: 24%;
    margin: 0 0.5%;
  }
  .el-upload-list__item-name {
    margin-right: 20px;
  }
}
.article-status {
  display: inline-block;
  margin-left: 20px;
}
</style>
