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
            <template #default="scope">
              <a :href="scope.row.url" target="_blank">{{ scope.row.name }}</a>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" min-width="140" label="创建时间" :formatter="row => timeStampFormat(row.createdAt, 'yyyy-MM-dd hh:mm')"></el-table-column>
          <el-table-column min-width="150" label="操作" fixed="right" align="center">
            <template #default="scope">
              <el-button type='danger' @click="handleRemoveLink(scope.row._id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <blog-paging :paging="linkPaging" @update="getLinkList"></blog-paging>
      </div>
    </div>

    <el-dialog title="添加链接" v-model="dialogVisible">
      <el-form :model="dialogData" :rules="dialogRules" ref="dialog">
        <el-form-item label="链接名称：" label-width="100px" prop="name">
          <el-input v-model="dialogData.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="链接路径：" label-width="100px" prop="url">
          <el-input v-model="dialogData.url" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleUpdateLink">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElTableColumn, ElTable, ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElMessage, ElMessageBox } from 'element-plus';

import AdminHeader from "src/components/admin-header/index.vue";
import BlogPaging from "src/components/blog-paging/index.vue";

import { timeStampFormat } from 'src/utils/date'
import Api from "src/api/admin";

export default {
  components: {
    ElTable,
    ElTableColumn,
    ElDialog,
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,

    AdminHeader,
    BlogPaging,
  },
  data() {
    return {
      dialogVisible: false,
      listLoading: false,
      breadcrumbs: [{ text: "首页", path: "/admin" }, { text: "链接管理" }],

      linkList: [],
      linkPaging: {
        page: 1,
        limit: 10,
        total: 1
      },

      dialogData: {},
      dialogRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        url: [{ required: true, message: "请输入路径", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 过滤器：filters
    timeStampFormat,

    getLinkList() {
      let params = {
        page: 1,
        limit: 10,
        ...this.$route.query
      }      
      this.listLoading = true;
      Api.getLink({ params }).then(res => {
        if (200 == res.code) {
          let { list, total } = res.data;
          this.linkList = list;
          Object.assign(this.linkPaging, {
            page: Number(params.page),
            limit: Number(params.limit),
            total
          })
        }
        this.listLoading = false;
      });
    },
    handleUpdateLink() {
      this.$refs.dialog.validate(valid => {
        if (valid) {
          //创建链接
          Api.postLink(this.dialogData).then(res => {
            if (200 == res.code) {
              ElMessage.success('添加链接成功')
              this.dialogVisible = false;
              this.$refs.dialog.resetFields(); //清除表单状态
              this.getLinkList();
            }
          });
        }
      });
    },
    handleRemoveLink(id) {
      ElMessageBox.confirm("确认删除该链接？").then(res => {
        Api.deleteLink({ params: { id } }).then(res => {
          if (200 == res.code) {
            ElMessage.success('删除链接成功')
            this.getLinkList();
          }
        });
      });
    }
  }
};
</script>
