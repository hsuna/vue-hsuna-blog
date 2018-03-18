<template>
  <div class="wrapper">
    <div class="header">
      <div class="header-logo">HSUNA</div>
      <div class="header-option">
        <span>{{adminName}}</span>
        <el-dropdown>
          <i class="el-icon-setting"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>返回首页</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
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
export default {
  data() {
    return {
      adminName: 'Hsuan'
    };
  },
  methods: {
    handleMenu(path) {
      this.$router.push({ path });
    }
  }
};
</script>

<style lang="scss">
@import "./admin.scss";
</style>

