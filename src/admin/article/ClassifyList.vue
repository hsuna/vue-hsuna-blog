<template>
  <div class="hsuna">
    <hsuna-header :routerList="breadcrumbs"></hsuna-header>
    <div class="hsuna-body">
      <div class="hsuna-toolbar">
        <div class="btn-group">
          <el-button type="primary" @click="showClassifyDialg()">添加分类</el-button>
        </div>
      </div>
      <div class="hsuna-table">
        <el-table style='width:100%' align="center" :data="classList"  v-loading="listLoading" element-loading-text="拼命加载中">
          <el-table-column type='index' width="60" ></el-table-column>
          <el-table-column prop="title" min-width="150" label="分类名称" ></el-table-column>
          <el-table-column prop="createdAt" min-width="200" label="创建时间" :formatter="row => $filter.timeStampFormat(row.createdAt, 'yyyy-MM-dd hh:mm')"></el-table-column>
          <el-table-column prop="updateAt" min-width="200" label="更新时间" :formatter="row => $filter.timeStampFormat(row.updateAt, 'yyyy-MM-dd hh:mm')"></el-table-column>
          <el-table-column min-width="150" label="操作" fixed="right" align="center">
            <template slot-scope='scope'>
              <el-button type='primary' @click="showClassifyDialg({id:scope.row._id, title:scope.row.title})">编辑</el-button>
              <el-button type='danger' @click="handleRemoveClassify(scope.row._id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog :title="-1 == dialogData.id ? '添加分类' : '修改分类'" :visible.sync="dialogVisible">
      <el-form :model="dialogData" :rules="dialogRules" ref="dialog">
        <el-form-item label="分类名称：" label-width="100px" prop="title">
          <el-input v-model="dialogData.title" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateClassify">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import hsunaHeader from "components/hsuna-header";
import $api from "api/admin";

export default {
  data() {
    return {
      dialogVisible: false,
      listLoading: false,
      breadcrumbs: [{ text: "首页", path: "/admin" }, { text: "分类管理" }],
      classList: [],
      dialogData: {
        id: -1
      },
      dialogRules: {
        title: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  components: {
    "hsuna-header": hsunaHeader
  },
  created() {
    this.getClassifyList();
  },
  methods: {
    getClassifyList() {
      this.listLoading = true;
      this.$http
        .get($api.getClassify)
        .then(res => {
          if (200 == res.code) {
            this.classList = res.data;
          }
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
        });
    },
    handleUpdateClassify() {
      this.$refs.dialog.validate(valid => {
        if (valid) {
          let { id, title } = this.dialogData;
          if (-1 == this.dialogData.id) {
            //创建分类
            this.$http.post($api.postClassify, { title }).then(res => {
              if (200 == res.code) {
                this.dialogVisible = false;
                this.$message({
                  message: res.message,
                  type: "success"
                });
                this.getClassifyList();
              }
            });
          } else {
            //修改分类

            this.$http.put($api.putClassify, { id, title }).then(res => {
              if (200 == res.code) {
                this.dialogVisible = false;
                this.$message({
                  message: res.message,
                  type: "success"
                });
                this.getClassifyList();
              }
            });
          }
        }
      });
    },
    handleRemoveClassify(id) {
      this.$confirm("确认删除该分类？")
        .then(res => {
          this.$http
            .delete($api.deleteClassify, { params: { id } })
            .then(res => {
              if (200 == res.code) {
                this.$message({
                  message: res.message,
                  type: "success"
                });
                this.getClassifyList();
              }
            });
        })
        .catch(err => {});
    },
    showClassifyDialg(data = { id: -1, title: "" }) {
      Object.assign(this.dialogData, data);
      this.dialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
