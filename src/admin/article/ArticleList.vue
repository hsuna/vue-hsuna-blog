<template>
  <div class="hsuna">
    <hsuna-header :routerList="breadcrumbs"></hsuna-header>
    <div class="hsuna-body">
      <div class="hsuna-toolbar">
        <div class="btn-group">
          <el-button type="primary" @click="$router.push({path: '/admin/articleCreate'})">创建文章</el-button>
        </div>
      </div>
      <div class="hsuna-table">
        <el-table style='width:100%' align="center" :data="articleList"  v-loading="listLoading" element-loading-text="拼命加载中">
          <el-table-column type='index' width="60" ></el-table-column>
          <el-table-column prop="title" min-width="180" label="文章标题" ></el-table-column>
          <el-table-column prop="about" min-width="200" label="文章简介" ></el-table-column>
          <el-table-column prop="classify" min-width="100" label="所属分类" ></el-table-column>
          <el-table-column min-width="100" label="文章类型" :formatter="row => 1==row.isDraft ? '草稿' : (1==row.isPublic ? '公开' : '私有')"></el-table-column>
          <el-table-column prop="createdAt" min-width="140" label="创建时间" :formatter="row => $filter.timeStampFormat(row.createdAt, 'yyyy-MM-dd hh:mm')"></el-table-column>
          <el-table-column prop="updateAt" min-width="140" label="更新时间" :formatter="row => $filter.timeStampFormat(row.updateAt, 'yyyy-MM-dd hh:mm')"></el-table-column>
          <el-table-column min-width="220" label="操作" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button @click="read(scope.row._id)">查看</el-button>
              <el-button type='primary' @click="toEditArticle(scope.row._id)">编辑</el-button>
              <el-button type='danger' @click="handleRemoveArticle(scope.row._id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import hsunaHeader from "components/hsuna-header";
import $api from "api/admin";

export default {
  data() {
    return {
      listLoading: false,
      breadcrumbs: [{ text: "首页", path: "/admin" }, { text: "文章管理" }],
      articleList: []
    };
  },
  created() {
    this.getArticleList(1);
  },
  methods: {
    toEditArticle(articleId) {
      this.$router.push({ path: `/admin/articleEdit/${articleId}` });
    },
    getArticleList(page) {
      this.listLoading = true;
      this.$http
        .get($api.getArticle, {
          params: {
            page: 1
          }
        })
        .then(res => {
          this.listLoading = false;
          this.articleList = res.data.list;
        });
    },
    handleTabClick(){

    },
    handleRemoveArticle(id) {
      this.$confirm("确认删除该文章？")
        .then(res => {
          this.$http
            .delete($api.deleteArticle, { params: { id } })
            .then(res => {
              if (200 == res.code) {
                this.$message({
                  message: res.message,
                  type: "success"
                });
                this.getArticleList();
              }
            });
        })
        .catch(err => {});
    },
  },
  components: {
    "hsuna-header": hsunaHeader
  }
};
</script>
