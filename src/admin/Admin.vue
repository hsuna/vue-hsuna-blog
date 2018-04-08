<template>
  <div class="wrapper">
    <div class="header">
      <div class="header-logo">HSUNA</div>
      <div class="header-option">
        <span class="user-name">欢迎回来，{{userName}}</span>
        <el-dropdown @command="handleDropdown">
          <i class="el-icon-setting"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="blog">返回博客</el-dropdown-item>
            <el-dropdown-item command="admin">返回首页</el-dropdown-item>
            <el-dropdown-item command="mofpwd">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-container class="container">
      <el-aside width="200px">
         <el-menu>
            <el-submenu v-for="(item,index) in $router.options.routes" v-bind:key="item.path" :index="index+''" v-if="'backend' == item.type">
                <template slot="title"><i :class="item.iconCls" ></i>{{item.name}}</template>
                <el-menu-item v-for="child in item.children" v-bind:key="child.path" v-if="!child.hidden" :index="item.path+'/'+child.path" @click="handleMenu(item.path+'/'+child.path)">
                  {{child.name}}
                </el-menu-item>
            </el-submenu>
         </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-dialog title="修改密码" :visible.sync="modifyDialogVisible">
      <el-form :model="modifyForm" :rules="modifyRules" ref="modifyPwd" label-width="100px">
        <el-form-item label="旧密码：" prop="oldPass">
          <el-input type="password" v-model="modifyForm.oldPass" placeholder="请输入旧密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPass">
          <el-input type="password" v-model="modifyForm.newPass" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
          <el-input type="password" v-model="modifyForm.checkPass" placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="modifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitModifyForm('modifyPwd')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ActionName } from "store/types";

export default {
  data() {
    let validateNewPass = (rule, value, callback) => {
      if (value === this.modifyForm.oldPass) {
        callback(new Error("新密码和旧密码不能相同!"));
      } else {
        if ("" !== value && "" !== this.modifyForm.checkPass) {
          this.$refs.modifyPwd.validateField("checkPass");
        }
        callback();
      }
    };
    let validateCheckPass = (rule, value, callback) => {
      if (value !== this.modifyForm.newPass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      userName: this.$store.getters.userName,

      modifyDialogVisible: false,
      modifyForm: {},
      modifyRules: {
        oldPass: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        newPass: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: validateNewPass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { validator: validateCheckPass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleMenu(path) {
      this.$router.push({ path });
    },
    handleDropdown(command) {
      switch (command) {
        case "blog":
          this.$router.push({ path: "/" });
          break;
        case "admin":
          this.$router.push({ path: "/admin" });
          break;
        case "mofpwd": //修改密码
          this.modifyDialogVisible = true;
          if (this.$refs.modifyPwd) {
            this.$refs.modifyPwd.resetFields();
          }
          break;
        case "logout":
          this.$store.dispatch(ActionName.USER_LOGOUT, { vm: this });
          break;
      }
    },
    submitModifyForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store
            .dispatch(ActionName.MODIFY_PWD, {
              data: {
                userName: this.userName,
                oldPass: this.modifyForm.oldPass,
                newPass: this.modifyForm.newPass
              },
              vm: this
            })
            .then(res => {
              if (200 == res.code) {
                this.modifyDialogVisible = false;
              }
            });
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "./admin.scss";
</style>

