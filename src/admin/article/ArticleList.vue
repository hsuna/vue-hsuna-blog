<template>
  <div class="admin">
    <admin-header :routerList="breadcrumbs"></admin-header>
    <div class="admin-body">
      <div class="admin-toolbar">
        <div class="btn-group">
          <el-button type="primary" @click="$router.push({path: '/admin/articleCreate'})">创建文章</el-button>
        </div>
      </div>
      <div class="admin-table">
        <el-table style='width:100%' align="center" :data="articleList"  v-loading="listLoading" element-loading-text="拼命加载中">
          <el-table-column type='index' width="60" ></el-table-column>
          <el-table-column prop="title" min-width="180" label="文章标题" ></el-table-column>
          <el-table-column prop="about" min-width="200" label="文章简介" ></el-table-column>
          <el-table-column prop="classify" min-width="100" label="所属分类" ></el-table-column>
          <el-table-column min-width="100" label="文章类型" :formatter="row => ['草稿', '公开', '私人'][row.status]"></el-table-column>
          <el-table-column prop="createdAt" min-width="140" label="创建时间" :formatter="row => $filter.timeStampFormat(row.createdAt, 'yyyy-MM-dd hh:mm')"></el-table-column>
          <el-table-column prop="updatedAt" min-width="140" label="更新时间" :formatter="row => $filter.timeStampFormat(row.updatedAt, 'yyyy-MM-dd hh:mm')"></el-table-column>
          <el-table-column min-width="220" label="操作" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button type='primary' @click="toReadArticle(scope.row._id)">查看</el-button>
              <el-button type='primary' @click="toEditArticle(scope.row._id)">编辑</el-button>
              <el-button type='danger' @click="handleRemoveArticle(scope.row._id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="articlePage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="articleLimit"
          layout="sizes, prev, pager, next"
          :total="articleTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import adminHeader from "components/admin-header";
import $api from "api/admin";

export default {
  data() {
    return {
      listLoading: false,
      breadcrumbs: [{ text: "首页", path: "/admin" }, { text: "文章管理" }],

      articlePage: 1,
      articleLimit: 10,
      articleTotal: 1,
      articleList: []
    };
  },
  created() {
    this.$route.query.page = this.articlePage =
      this.$route.query.page || this.articlePage;
    this.$route.query.limit = this.articleLimit =
      this.$route.query.limit || this.articleLimit;
    this.getArticleList();
  },
  methods: {
    toEditArticle(articleId) {
      this.$router.push({ path: `/admin/articleEdit/${articleId}` });
    },
    toReadArticle(articleId) {
      this.$router.push({ path: `/admin/articleRead/${articleId}` });
    },
    getArticleList() {
      this.listLoading = true;
      this.$http
        .get($api.getArticle, { params: this.$route.query })
        .then(res => {
          if (200 == res.code) {
            let { list, total } = res.data;
            this.articleList = list;
            this.articleTotal = total;
          }
          this.listLoading = false;
        });
    },
    //handleTabClick() {},
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
    handleSizeChange(val) {
      this.$router.push({
        path: "/admin/articleList",
        query: {
          page: 1,
          limit: val
        }
      });
      this.getArticleList();
    },
    handleCurrentChange(val) {
      this.$router.push({
        path: "/admin/articleList",
        query: {
          page: val,
          limit: this.$route.query.limit
        }
      });
      this.getArticleList();
    }
  },
  components: {
    "admin-header": adminHeader
  }
};
</script>

<style lang="scss" scoped>
.el-pagination {
  padding: 10px;
  text-align: right;
}
</style>
