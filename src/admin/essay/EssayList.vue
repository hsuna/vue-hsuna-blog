<template>
  <div class="admin">
    <admin-header :routerList="breadcrumbs"></admin-header>
    <div class="admin-body">
      <div class="admin-toolbar">
        <div class="btn-group">
          <el-button type="primary" @click="dialogVisible = true">添加随记</el-button>
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

    <el-dialog title="添加随记" :visible.sync="dialogVisible">
      <el-form :model="dialogData" :rules="dialogRules" ref="dialog">
        <el-form-item label="随记名称：" label-width="100px" prop="title">
          <el-input v-model="dialogData.title" auto-complete="off"></el-input>
        </el-form-item>
         <el-form-item label="图片上传：" label-width="100px" class="show">
            <!-- :before-upload="handleBeforeUpload" -->
            <el-upload class="article-upload"
              :multiple="true"
              :action="fileAction"
              :headers="fileHeaders"
              :file-list="article.files"
              :on-success="handleSuccessFile"
              :on-preview="handlePreviewFile"
              :before-remove="handleRemoveFile" list-type="picture">
              <el-button type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/git/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateEssay">确 定</el-button>
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
      listLoading: false,
      breadcrumbs: [{ text: "首页", path: "/admin" }, { text: "随记管理" }],
      essayList: [],

      dialogVisible: false,
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
      this.$http.get($api.getEssay).then(res => {
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
          //创建分类
          this.$http.post($api.postEssay, { title }).then(res => {
            if (200 == res.code) {
              this.dialogVisible = false;
              this.$message({
                message: res.message,
                type: "success"
              });
              this.getEssayList();
            }
          });
        }
      });
    },
    handleRemoveEssay(id) {
      this.$confirm("确认删除该随记？")
        .then(res => {
          this.$http.delete($api.deleteEssay, { params: { id } }).then(res => {
            if (200 == res.code) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.getEssayList();
            }
          });
        })
        .catch(err => {});
    },
    handleSuccessFile(res, file, fileList) {
      if (200 == res.code) {
        this.$message({ message: res.message, type: "success" });
        Object.assign(file, res.data);
        this.article.files = fileList.map(file => ({
          id: file.id,
          name: file.name,
          url: $api.getFileUpload + "/" + file.id
        }));
      }
    },
    handlePreviewFile(file) {
      window.open($api.getFileUpload + "/" + file.id);
    },
    handleRemoveFile(file, fileList) {
      return new Promise((resolve, reject) => {
        this.$http
          .delete($api.deleteFileUpload, {
            params: {
              articleId: this.article.id,
              id: file.id
            }
          })
          .then(res => {
            if (200 == res.code) {
              resolve();
              this.$message({ message: res.message, type: "success" });
            } else {
              reject();
            }
          })
          .catch(err => {
            reject();
          });
      });
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
