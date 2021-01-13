<template>
  <div class="admin">
    <admin-header :routerList="breadcrumbs"></admin-header>
    <div class="admin-body">
      <div class="admin-toolbar">
        <div class="btn-group">
          <el-button type="primary" @click="dialogVisible = true">添加清单</el-button>
        </div>
      </div>
      <div class="admin-table">
        <el-table style='width:100%' align="center" :data="inventoryList"  v-loading="listLoading" element-loading-text="拼命加载中">
          <el-table-column type='index' width="60" ></el-table-column>
          <el-table-column prop="title" min-width="280" label="清单名称" ></el-table-column>
          <el-table-column prop="content" min-width="480" label="清单内容" ></el-table-column>
          <el-table-column prop="createdAt" min-width="140" label="创建时间" :formatter="row => timeStampFormat(row.createdAt, 'yyyy-MM-dd hh:mm')"></el-table-column>
          <el-table-column min-width="150" label="操作" fixed="right" align="center">
            <template #default="scope">
              <el-button type='danger' @click="handleRemoveInventory(scope.row._id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <blog-paging :paging="inventoryPaging" @update="getInventoryList"></blog-paging>
      </div>
    </div>

    <el-dialog title="添加清单" v-model="dialogVisible">
      <el-form :model="dialogData" :rules="dialogRules" ref="dialog">
        <el-form-item label="清单名称：" label-width="100px" prop="title">
          <el-input v-model="dialogData.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="清单内容：" label-width="100px" prop="content">
          <el-input
            type="textarea"
            v-model="dialogData.content"
            :autosize="{ minRows: 2, maxRows: 6}"
            auto-complete="off">
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleUpdateInventory">确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElTable, ElTableColumn, ElDialog, ElForm, ElFormItem, ElButton, ElInput, ElMessage, ElMessageBox } from 'element-plus';

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
    ElButton,
    ElInput,

    AdminHeader,
    BlogPaging,
  },
  data() {
    return {
      listLoading: false,
      breadcrumbs: [{ text: "首页", path: "/admin" }, { text: "清单管理" }],

      inventoryList: [],
      inventoryPaging: {
        page: 1,
        limit: 10,
        total: 1
      },

      dialogVisible: false,
      dialogData: {},
      dialogRules: {
        title: [{ required: true, message: "请输入名称", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 过滤器：filters
    timeStampFormat,

    getInventoryList() {
      let params = {
        page: 1,
        limit: 10,
        ...this.$route.query
      }
      this.listLoading = true;
      Api.getInventory({ params }).then(res => {
          if (200 == res.code) {
            let { list, total } = res.data;
            this.inventoryList = list;
            Object.assign(this.inventoryPaging, {
              page: Number(params.page),
              limit: Number(params.limit),
              total
            })
          }
          this.listLoading = false;
        });
    },
    handleUpdateInventory() {
      this.$refs.dialog.validate(valid => {
        if (valid) {
          //创建清单
          Api.postInventory(this.dialogData).then(res => {
            if (200 == res.code) {
              this.dialogVisible = false;
              ElMessage.success('添加清单成功')
              this.$refs.dialog.resetFields(); //清除表单状态
              this.getInventoryList();
            }
          });
        }
      });
    },
    handleRemoveInventory(id) {
      ElMessageBox.confirm("确认删除该清单？").then(res => {
        Api.deleteInventory({ params: { id } }).then(res => {
            if (200 == res.code) {
              ElMessage.success('删除清单成功')
              this.getInventoryList();
            }
          });
      });
    }
  }
};
</script>
