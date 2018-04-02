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
  </div>
</template>

<script>
import { ActionName } from "store/types";

export default {
  data() {
    return {
      userName: this.$store.getters.userName
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
        case "logout":
          this.$store.dispatch(ActionName.USER_LOGOUT, { vm: this });
          break;
      }
    }
  }
};
</script>

<style lang="scss">
@import "./admin.scss";
</style>

