<template>
  <div class="admin">
    <admin-header :routerList="breadcrumbs"></admin-header>
    <div class="admin-body">
      <div class="admin-toolbar">
        <div class="btn-group">
          <el-button type="primary" @click="dialogVisible = true;">添加链接</el-button>
        </div>
      </div>
      <div class="admin-table">
        <el-table style='width:100%' align="center" :data="linkList"  v-loading="listLoading" element-loading-text="拼命加载中">
          <el-table-column type='index' width="60" ></el-table-column>
          <el-table-column min-width="280" label="链接名称" >
            <template slot-scope="scope">
              <a :href="scope.row.url" target="_blank">{{ scope.row.name }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" min-width="140" label="创建时间" :formatter="row => $filter.timeStampFormat(row.createdAt, 'yyyy-MM-dd hh:mm')"></el-table-column>
          <el-table-column min-width="150" label="操作" fixed="right" align="center">
            <template slot-scope='scope'>
              <el-button type='danger' @click="handleRemoveLink(scope.row._id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="linkPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="linkLimit"
          layout="sizes, prev, pager, next"
          :total="linkTotal">
        </el-pagination>
      </div>
    </div>

    <el-dialog title="添加链接" :visible.sync="dialogVisible">
      <el-form :model="dialogData" :rules="dialogRules" ref="dialog">
        <el-form-item label="链接名称：" label-width="100px" prop="name">
          <el-input v-model="dialogData.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接路径：" label-width="100px" prop="url">
          <el-input v-model="dialogData.url" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateLink">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import adminHeader from "components/admin-header";
import $api from "api/admin";

export default {
  data() {
    return {
      dialogVisible: false,
      listLoading: false,
      breadcrumbs: [{ text: "首页", path: "/admin" }, { text: "链接管理" }],

      linkPage: 1,
      linkLimit: 10,
      linkTotal: 1,
      linkList: [],

      dialogData: {},
      dialogRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        url: [{ required: true, message: "请输入路径", trigger: "blur" }]
      }
    };
  },
  components: {
    "admin-header": adminHeader
  },
  created() {
    this.$route.query.page = this.linkPage =
      this.$route.query.page || this.linkPage;
    this.$route.query.limit = this.linkLimit =
      this.$route.query.limit || this.linkLimit;
    this.getLinkList();
  },
  methods: {
    getLinkList() {
      this.listLoading = true;
      this.$http.get($api.getLink, { params: this.$route.query }).then(res => {
        if (200 == res.code) {
          let { list, total } = res.data;
          this.linkList = list;
          this.linkTotal = total;
        }
        this.listLoading = false;
      });
    },
    handleUpdateLink() {
      this.$refs.dialog.validate(valid => {
        if (valid) {
          //创建链接
          this.$http.post($api.postLink, this.dialogData).then(res => {
            if (200 == res.code) {
              this.dialogVisible = false;
              this.$message({
                message: res.message,
                type: "success"
              });
              this.$refs.dialog.resetFields(); //清除表单状态
              this.getLinkList();
            }
          });
        }
      });
    },
    handleRemoveLink(id) {
      this.$confirm("确认删除该链接？").then(res => {
        this.$http.delete($api.deleteLink, { params: { id } }).then(res => {
          if (200 == res.code) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.getLinkList();
          }
        });
      });
    },
    handleSizeChange(val) {
      this.$router.push({
        path: "/admin/linkList",
        query: {
          page: 1,
          limit: val
        }
      });
    },
    handleCurrentChange(val) {
      this.$router.push({
        path: "/admin/linkList",
        query: {
          page: val,
          limit: this.$route.query.limit
        }
      });
    }
  }
};
</script>
