<template>
  <div class="admin">
    <admin-header :routerList="breadcrumbs"></admin-header>
    <div class="admin-body">
      <div class="admin-toolbar">
        <div class="btn-group">
          <el-button type="primary" @click="showClassifyDialg()">添加分类</el-button>
        </div>
      </div>
      <div class="admin-table">
        <el-table style='width:100%' align="center" :data="classList"  v-loading="listLoading" element-loading-text="拼命加载中">
          <el-table-column type='index' width="60" ></el-table-column>
          <el-table-column prop="title" min-width="280" label="分类名称" ></el-table-column>
          <el-table-column prop="createdAt" min-width="140" label="创建时间" :formatter="row => $options.filters.timeStampFormat(row.createdAt, 'yyyy-MM-dd hh:mm')"></el-table-column>
          <el-table-column prop="updatedAt" min-width="140" label="更新时间" :formatter="row => $options.filters.timeStampFormat(row.updatedAt, 'yyyy-MM-dd hh:mm')"></el-table-column>
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
import { Table, TableColumn, Button, Form, FormItem, Input, Dialog, Message, MessageBox } from 'element-ui';

import AdminHeader from "src/components/admin-header";

import { timeStampFormat } from 'src/utils/date'

import Api from "src/api/admin";

export default {
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Dialog.name]: Dialog,
    [Input.name]: Input,
    [Button.name]: Button,

    AdminHeader
  },
  data() {
    return {
      dialogVisible: false,
      listLoading: false,
      breadcrumbs: [{ text: "首页", path: "/admin" }, { text: "分类管理" }],
      classList: [],
      dialogData: {
        id: -1,
        title: ''
      },
      dialogRules: {
        title: [{ required: true, message: "请输入名称", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getClassifyList();
  },
  filters: {
    timeStampFormat,
  },
  methods: {
    getClassifyList() {
      this.listLoading = true;
      Api.getClassify().then(res => {
          if (200 == res.code) {
            let {list, total} = res.data;
            this.classList = list;
          }
          this.listLoading = false;
        });
    },
    handleUpdateClassify() {
      this.$refs.dialog.validate(async (valid) => {
        if (valid) {
          let { id, title } = this.dialogData;
          let res = -1 == id 
            ? await Api.postClassify({ title }) //创建分类
            : await Api.putClassify({ id, title }) //修改分类
          if (200 == res.code) {
            this.dialogVisible = false;
            Message.success(-1 == id ? '添加分类成功' : '修改分类成功');
            this.getClassifyList();
          }
        }
      });
    },
    handleRemoveClassify(id) {
      MessageBox.confirm("确认删除该分类？").then(res => {
          Api.deleteClassify({ params: { id } }).then(res => {
            if (200 == res.code) {
              Message.success('删除分类成功')
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
