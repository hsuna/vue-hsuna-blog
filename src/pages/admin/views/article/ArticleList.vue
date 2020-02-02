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
          <el-table-column prop="about" min-width="200" label="文章简介" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="classify" min-width="100" label="所属分类" ></el-table-column>
          <el-table-column min-width="100" label="文章类型" :formatter="row => ['草稿', '公开', '私人'][row.status]"></el-table-column>
          <el-table-column prop="createdAt" min-width="140" label="创建时间" :formatter="row => $options.filters.timeStampFormat(row.createdAt, 'yyyy-MM-dd hh:mm')"></el-table-column>
          <el-table-column prop="updatedAt" min-width="140" label="更新时间" :formatter="row => $options.filters.timeStampFormat(row.updatedAt, 'yyyy-MM-dd hh:mm')"></el-table-column>
          <el-table-column min-width="220" label="操作" fixed="right" align="center">
            <template slot-scope="scope">
              <el-button type='primary' @click="toReadArticle(scope.row._id)">查看</el-button>
              <el-button type='primary' @click="toEditArticle(scope.row._id)">编辑</el-button>
              <el-button type='danger' @click="handleRemoveArticle(scope.row._id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <blog-paging :paging="articlePaging" @update="getArticleList"></blog-paging>
      </div>
    </div>
  </div>
</template>

<script>
import { Table, TableColumn, Button, Message } from 'element-ui';

import AdminHeader from "src/components/admin-header";
import BlogPaging from "src/components/blog-paging";

import { timeStampFormat } from 'src/utils/date'
import Api from "src/api/admin";

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Button.name]: Button,

    AdminHeader,
    BlogPaging,
  },
  data() {
    return {
      listLoading: false,
      breadcrumbs: [{ text: "首页", path: "/admin" }, { text: "文章管理" }],
      
      articleList: [],
      articlePaging: {
        page: 1,
        limit: 10,
        total: 1
      }
    }
  },
  filters: {
    timeStampFormat
  },
  methods: {
    toEditArticle(articleId) {
      this.$router.push({ path: `/admin/articleEdit/${articleId}` });
    },
    toReadArticle(articleId) {
      this.$router.push({ path: `/admin/articleRead/${articleId}` });
    },
    getArticleList() {
      let params = {
        page: 1,
        limit: 10,
        ...this.$route.query
      }
      this.listLoading = true;
      Api.getArticle({ params }).then(res => {
          if (200 == res.code) {
            let { list, total } = res.data;
            this.articleList = list;
            Object.assign(this.articlePaging, {
              page: Number(params.page),
              limit: Number(params.limit),
              total
            })
          }
          this.listLoading = false;
        });
    },
    //handleTabClick() {},
    handleRemoveArticle(id) {
      MessageBox.confirm("确认删除该文章？")
        .then(res => {
          Api.deleteArticle({ params: { id } }).then(res => {
              if (200 == res.code) {
                Message({
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
};
</script>
