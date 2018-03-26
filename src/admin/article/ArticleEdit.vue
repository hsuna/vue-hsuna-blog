<template lang="html">
  <div class="hsuna">
    <hsuna-header :routerList="breadcrumbs"></hsuna-header>
    <div class="hsuna-body">
      <el-row style="margin-top: 20px;">
        <el-col :span="24">
          <el-form ref="articleCreate" :model="article" :rules="createRules">
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
               <el-col :span='10' :push="1">
                <el-form-item label="文章标签：" label-width="100px" prop="tags">
                  <el-select v-model="article.tags" placeholder="请添加标签" style="width:100%;" multiple filterable allow-create>
                    <el-option v-for="(item,index) in tagList" :label="item.tag" :value="item.tag" v-bind:key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span='10' :push="3">
                <el-radio v-model="article.isPublic" :label="1">公开</el-radio>
                <el-radio v-model="article.isPublic" :label="0">私有</el-radio>
              </el-col>
            </el-row>
            <el-row>
               <el-col :span='23' :push="1">
                <el-form-item label="文章简介：" label-width="100px" prop="title">
                  <el-input v-model="article.about" placeholder="请输入简介"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23" :push="1">
                <el-form-item label="文章内容：" label-width="100px" class="show" prop="content" >
                  <markdown-editor v-model="article.content" preview-class="article-markdown" :highlight="true"></markdown-editor>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top: 20px;">
              <el-col :span="21" :push="1">
                <el-form-item label-width="100px">
                  <el-button type="primary" @click="handlePublish(false)">立即发布</el-button>
                  <el-button type="primary" @click="handlePublish(true)">暂存草稿</el-button>
                  <el-button :loading="load">取消</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import markdownEditor from "vue-simplemde/src/markdown-editor";

import hsunaHeader from "components/hsuna-header";

import $api from "api/admin";

export default {
  data() {
    return {
      activeName: "preview",

      breadcrumbs: [
        { text: "首页", path: "/admin" },
        { text: "文章管理", path: "/admin/articleList" },
        { text: "创建文章" }
      ],
      article: {
        id: this.$route.params.articleId,
        title: "", //文章标题
        about: "", //文章简介
        classify: "", //文章所属分类
        content: "", //文章内容
        tags: [], //文章标签
        isPublic: 1, //是否公开
        isDraft: 0 //是否草稿
      },
      tagList: [{ tag: "HTML" }, { tag: "CSS" }, { tag: "JavaScript" }],
      classifyList: [],
      createRules: {
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        about: [{ required: true, message: "请填写简介", trigger: "blur" }],
        classify: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      },
      load: false,
      btnText: "立即发布"
    };
  },
  created() {
    //如果是已存在的文章
    if (this.article.id) {
      //获取编辑信息
      this.$http.get($api.getArticle, { id: this.article.id }).then(res => {
        if (200 == res.code) {
          if (res.data && res.data.length > 0) {
            Object.assign(this.article, res.data[0]);
          } else {
            this.$router.replace({ path: "/articleList" });
            this.$message.error("不存在该文章");
          }
        }
      });
    }

    //获取分类列表
    this.$http.get($api.getClassifyAll).then(res => {
      if (200 == res.code) {
        this.classifyList = res.data;
      }
    });
  },
  methods: {
    submitArticle(data) {
      //已存在的文章，则更新
      if (data.id) {
        this.$http.put($api.putArticle, data).then(res => {
          if (200 == res.code) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.$router.replace({ path: "/admin/articleList" });
          }
        });
      } else {
        this.$http.post($api.postArticle, data).then(res => {
          if (200 == res.code) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.$router.replace({ path: "/admin/articleList" });
          }
        });
      }
    },
    handlePublish(isDraft) {
      this.article.isDraft = isDraft ? 1 : 0;
      if (isDraft) {
        this.submitArticle(this.article);
      } else {
        this.$refs.articleCreate.validate(valid => {
          if (valid) {
            this.submitArticle(this.article);
          }
        });
      }
    }
  },
  components: {
    "hsuna-header": hsunaHeader,
    "markdown-editor": markdownEditor
  }
};
</script>

<style>
@import "simplemde/dist/simplemde.min.css";
</style>
<style lang="scss">
@import "~assets/styles/article-markdown.scss";
</style>
<style lang="scss" scoped>
.article-tab-pane {
  padding: 15px;
  border: 1px solid #e4e7ed;
  border-top-width: 0;
}
.article-edit-area {
  overflow-y: auto;
  height: 520px;
  margin-left: 10px;
  padding: 0 10px;
  line-height: 1.5;
  border: 1px solid #e4e7ed;
  word-break: break-all;
}
</style>