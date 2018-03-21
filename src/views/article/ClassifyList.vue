<template>
  <div class="hsuna">
    <hsuna-header :routerList="breadcrumbs"></hsuna-header>
    <div class="hsuna-body">
      <div class="hsuna-toolbar">
        <div class="btn-group">
          <el-button type="primary" @click="dialogFormVisible = true">添加分类</el-button>
        </div>
      </div>
      <div class="hsuna-table">
        <el-table style='width:100%' align="center" :data="classList"  v-loading="listLoading" element-loading-text="拼命加载中">
          <el-table-column type='index' width="60" ></el-table-column>
          <el-table-column prop="classify" min-width="150" label="分类名称" ></el-table-column>
          <el-table-column prop="created_at" min-width="200" label="创建时间" ></el-table-column>
          <el-table-column min-width="180" label="操作" >
            <template slot-scope='scope'>
              <el-button type='primary' @click="toEditArticle(scope.row._id)">编辑</el-button>
              <el-button type='danger' @click="remove(scope.row._id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="分类名称：" label-width="100px">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import hsunaHeader from "components/hsuna-header";
export default {
  data() {
    return {
      dialogFormVisible: false,
      listLoading: false,
      breadcrumbs: [{ text: "首页", path: "/admin" }, { text: "分类管理" }],
      classList: [],
      form: {}
    };
  },
  components: {
    "hsuna-header": hsunaHeader
  },
  methods: {
    toEditArticle(articleId) {
      this.$router.push({ path: `/admin/articleEdit/${articleId}` });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
