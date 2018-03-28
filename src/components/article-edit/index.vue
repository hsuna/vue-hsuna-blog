<template lang="html">
  <div class="hsuna">
    <hsuna-header :routerList="routerList"></hsuna-header>
    <div class="hsuna-body">
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
               <el-col :span='10' :push="1">
                <el-form-item label="文章标签：" label-width="100px" prop="tags">
                  <el-select v-model="article.tags" placeholder="请添加标签" style="width:100%;" multiple filterable allow-create>
                    <el-option v-for="(item,index) in tagList" :label="item.tag" :value="item.tag" v-bind:key="index"></el-option>
                  </el-select>
                </el-form-item>
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
                  <markdown-editor v-model="article.content" preview-class="markdown-body" :highlight="true" :sanitize="true" :configs="configs"></markdown-editor>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10" :push="1">
                <el-form-item label-width="100px">
                  <el-button type="primary" @click="handleSubmit">{{btnText}}</el-button>
                  <el-button @click="handleBack">返回</el-button>
                  <div class="article-status">
                    <el-radio v-model="article.status" :label="0">草稿</el-radio>
                    <el-radio v-model="article.status" :label="1">发布</el-radio>
                    <el-radio v-model="article.status" :label="2">私人</el-radio>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import markdownEditor from "vue-simplemde/src/markdown-editor";
import hljs from "highlight.js";

import hsunaHeader from "components/hsuna-header";
import $api from "api/admin";

window.hljs = hljs;
export default {
  props: {
    article: {
      type: Object,
      default: () => ({
        title: "", //文章标题
        about: "", //文章简介
        classify: "", //文章所属分类
        content: "", //文章内容
        tags: [], //文章标签
        status: 1 //0:草稿 | 1:发布 | 2:收藏
      })
    },
    breadcrumbs: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isModify: false,
      routerList: [
        { text: "首页", path: "/admin" },
        { text: "文章管理", path: "/admin/articleList" },
        ...this.breadcrumbs
      ],
      articleRules: {
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        about: [{ required: true, message: "请填写简介", trigger: "blur" }],
        classify: [{ required: true, message: "请选择分类", trigger: "change" }],
        content: [{ required: true, message: "请输入内容", trigger: "change" }]
      },
      tagList: [{ tag: "HTML" }, { tag: "CSS" }, { tag: "JavaScript" }],
      classifyList: [],
      configs: {
        status: false // 禁用底部状态栏
      }
    };
  },
  created() {
    //获取分类列表
    this.$http.get($api.getClassify).then(res => {
      if (200 == res.code) {
        let { list, total } = res.data;
        this.classifyList = list;
      }
    });
  },
  computed: {
    btnText: {
      get() {
        if (1 == this.article.status) return "公开发布";
        else if (2 == this.article.status) return "私人保存";
        else return "暂存草稿";
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.articleRef.validate(valid => {
        if (valid) {
          this.$emit("submit");
        }
      });
    },
    handleBack() {
      if (this.isModify) {
        this.$confirm("文章内容有改动，是否不保存直接返回？")
          .then(res => {
            this.$router.replace({ path: "/admin/articleList" });
          })
          .catch(err => {});
      } else {
        this.$router.replace({ path: "/admin/articleList" });
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
@import "highlight.js/styles/googlecode.css";
</style>
<style lang="scss">
@import "~assets/styles/markdown-body";
.article-status{
  display: inline-block;
  margin-left: 20px;
}
</style>
