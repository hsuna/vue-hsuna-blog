<template lang="html">
  <div class="hsuna">
    <hsuna-header :routerList="breadcrumbs"></hsuna-header>
    <div class="hsuna-body">
      <el-row style="margin-top: 20px;">
        <el-col :span="24">
          <el-form ref="articleCreate" :model="article" :rules="createRules" >
            <el-row>
              <el-col :span='10' :push="1">
                <el-form-item label="文章标题：" label-width="100px" prop="title">
                  <el-input v-model="article.title" placeholder="请输入标题"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" :push="3" >
                <el-form-item label="所属分类：" label-width="100px" prop="classify">
                  <el-select v-model="article.classify" placeholder="请选择分类">
                    <el-option v-for="(item,index) in classifyList" :label="item.classify" :value="item.classify" v-bind:key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
               <el-col :span='23' :push="1">
                <el-form-item label="文章简介：" label-width="100px" prop="title">
                  <el-input v-model="article.synopsis" placeholder="请输入简介"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="23" :push="1">
                <el-form-item label="文章内容：" label-width="100px" class="show" prop="content" >
                  <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="预览模式" name="preview"></el-tab-pane>
                    <el-tab-pane label="编辑模式" name="edit"></el-tab-pane>
                    <el-tab-pane label="查看语法" name="grammar"></el-tab-pane>
                  </el-tabs>
                  <el-row class="article-tab-pane">
                    <!-- 编辑区 -->
                    <el-col :span="'edit'==activeName ? 24 : 12 ">
                      <el-input type="textarea" v-model="article.content" :rows="24" placeholder="请在此处编辑文章" resize="none"></el-input>
                    </el-col>
                    <!-- 展示区 -->
                    <el-col :span="12" v-if="'preview' == activeName">
                      <div v-html="markedToHtml" class="article-edit-area"></div>
                    </el-col>
                    <!-- 语法区 -->
                    <el-col :span="12" v-if="'grammar' == activeName">
                      <div style="padding: 0 10px;">
                        [h1~h6] # ~ ######
                      </div>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-top: 20px;">
              <el-col :span="21" :push="1">
                <el-form-item label-width="100px">
                  <el-button type="primary" :loading="load">立即发布</el-button>
                  <el-button type="primary" :loading="load">暂存草稿</el-button>
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
import marked from "marked";
import highlight from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

import hsunaHeader from "components/hsuna-header";

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
        title: "", //文章标题
        synopsis: "", //文章简介
        classify: "", //文章所属分类
        content: "" //文章内容
      },
      classifyList: [],
      createRules: {
        title: [{ required: true, message: "请填写标题", trigger: "blur" }],
        synopsis: [{ required: true, message: "请填写简介", trigger: "blur" }],
        classify: [{ required: true, message: "请选择分类", trigger: "change" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
      load: false,
      btnText: "立即发布"
    };
  },
  components: {
    "hsuna-header": hsunaHeader
  },
  computed: {
    markedToHtml() {
      marked.setOptions({
        highlight: function(code) {
          return highlight.highlightAuto(code).value;
        }
      });
      // console.log(this.article.content);
      return marked(this.article.content);
    }
  },
  methods: {}
};
</script>

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


