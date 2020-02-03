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
        <el-table style='width:100%' align="center" :data="essayList"  v-loading="listLoading" element-loading-text="拼命加载中">
          <el-table-column type='index' width="60" ></el-table-column>
          <el-table-column prop="content" min-width="500" label="随记内容" ></el-table-column>
          <el-table-column prop="files" min-width="400" label="随记图片" >
            <template slot-scope="scope">
              <template v-if="scope.row.files.length>0">
                <ul class="essay-list-file">
                  <li v-for="file in scope.row.files" :key="file.id" @click="handlePreviewFile(file)">
                    <img width="100%" height="100%" :src="file.url" alt="">
                  </li>
                </ul>
              </template>
              <template v-else>无</template>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" min-width="140" label="创建时间" :formatter="row => $options.filters.timeStampFormat(row.createdAt, 'yyyy-MM-dd hh:mm')"></el-table-column>
          <el-table-column min-width="150" label="操作" fixed="right" align="center">
            <template slot-scope='scope'>
              <el-button type='danger' @click="handleRemoveEssay(scope.row._id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <blog-paging :paging="essayPaging" @update="getEssayList"></blog-paging>
      </div>
    </div>

    <el-dialog title="添加随记" :visible.sync="dialogVisible">
      <el-form :model="dialogData" :rules="dialogRules" ref="dialog">
        <el-form-item label="随记内容：" label-width="100px" prop="content">
          <el-input
            type="textarea"
            v-model="dialogData.content"
            :autosize="{ minRows: 2, maxRows: 6}"
            auto-complete="off">
          </el-input>
        </el-form-item>
         <el-form-item label="图片上传：" label-width="100px" class="show">
            <!-- :before-upload="handleBeforeUpload" -->
            <el-upload
              class="essay-upload"
              list-type="picture-card"
              :multiple="true"
              :action="fileAction"
              :headers="fileHeaders"
              :file-list="dialogData.files"
              :on-success="handleSuccessFile"
              :on-preview="handlePreviewFile"
              :before-remove="handleRemoveFile">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdateEssay">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogImageVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import AdminHeader from "src/components/admin-header";
import BlogPaging from "src/components/blog-paging";

import { timeStampFormat } from 'src/utils/date'
import Api from "src/api/admin";
import { Table, TableColumn, Dialog, Form, FormItem, Button, Input, Message, Upload, MessageBox } from 'element-ui';

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Button.name]: Button,
    [Upload.name]: Upload,
    [Input.name]: Input,

    AdminHeader,
    BlogPaging,
  },
  data() {
    return {
      listLoading: false,
      breadcrumbs: [{ text: "首页", path: "/admin" }, { text: "随记管理" }],

      essayList: [],
      essayPaging: {
        page: 1,
        limit: 10,
        total: 1
      },

      fileAction: Api.postFileUpload(),
      fileHeaders: {
        Authorization: this.$store.getters.token
      },

      dialogVisible: false,
      dialogData: {
        files: []
      },
      dialogRules: {
        content: [{ required: true, message: "请输入名称", trigger: "blur" }]
      },

      dialogImageVisible: false,
      dialogImageUrl: ""
    };
  },
  created() {
  },
  filters: {
    timeStampFormat,
  },
  methods: {
    getEssayList() {
      let params = {
        page: 1,
        limit: 10,
        ...this.$route.query
      }
      this.listLoading = true;
      Api.getEssay({ params }).then(res => {
        if (200 == res.code) {
          let { list, total } = res.data;
          this.essayList = list;
          Object.assign(this.essayPaging, {
            page: Number(params.page),
            limit: Number(params.limit),
            total
          })
        }
        this.listLoading = false;
      });
    },
    handleUpdateEssay() {
      this.$refs.dialog.validate(valid => {
        if (valid) {
          //创建分类
          Api.postEssay(this.dialogData).then(res => {
            if (200 == res.code) {
              Message.success('添加随记成功')
              this.dialogVisible = false;
              this.$refs.dialog.resetFields(); //清除表单状态
              this.dialogData = {
                files: []
              };
              this.getEssayList();
            }
          });
        }
      });
    },
    handleRemoveEssay(id) {
      MessageBox.confirm("确认删除该随记？").then(res => {
          Api.deleteEssay({ params: { id } }).then(res => {
            if (200 == res.code) {
              Message.success('删除随记成功')
              this.getEssayList();
            }
          });
        })
        .catch(err => {});
    },
    handleSuccessFile(res, file, fileList) {
      if (200 == res.code) {
        Message.success('文件上传成功')
        Object.assign(file, res.data);
        this.dialogData.files = fileList;
      }
    },
    handlePreviewFile(file) {
      this.dialogImageUrl = file.url;
      this.dialogImageVisible = true;
    },
    handleRemoveFile(file, fileList) {
      return new Promise((resolve, reject) => {
        Api.deleteFileUpload({
          params: { id: file.id }
        }).then(res => {
            if (200 == res.code) {
              Message.success('文件删除成功')
              resolve();
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

<style lang="scss">
.essay-upload {
  .el-upload--picture-card,
  .el-upload-list__item {
    width: 100px;
    height: 100px;
    line-height: 106px;
  }
}
.essay-list-file {
  li {
    overflow: hidden;
    display: inline-block;
    width: 96px;
    height: 54px;
    margin: 4px;
    border-radius: 3px;
    border: 1px solid transparent;
    cursor: pointer;

    &:hover {
      border-color: #0084ff;
    }
  }
}
</style>
