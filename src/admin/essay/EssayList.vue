<template>
  <div class="admin">
    <admin-header :routerList="breadcrumbs"></admin-header>
    <div class="admin-body">
      <div class="admin-toolbar">
        <div class="btn-group">
          <el-button type="primary" @click="dialogVisible = true">添加随说</el-button>
        </div>
      </div>
      <div class="admin-table">
        <el-row>
          <el-col :span="12" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img src="examples/assets/images/hamburger.png" class="image">
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
                <div class="bottom clearfix">
                  <time class="time">{{ currentDate }}</time>
                  <el-button type="text" class="button">操作按钮</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
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
import adminHeader from "components/admin-header";
import $api from "api/admin";

export default {
  data() {
    return {
      dialogVisible: false,
      listLoading: false,
      breadcrumbs: [{ text: "首页", path: "/admin" }, { text: "随说管理" }],
      essayList: [],
      dialogRules: {
        content: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  components: {
    "admin-header": adminHeader
  },
  created() {
    this.getEssayList();
  },
  methods: {
    getEssayList() {
      this.listLoading = true;
      this.$http.get($api.getClassify).then(res => {
        if (200 == res.code) {
          let { list, total } = res.data;
          this.classList = list;
        }
        this.listLoading = false;
      });
    },
    handleUpdateEssay() {
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
    handleRemoveEssay(id) {
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
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
