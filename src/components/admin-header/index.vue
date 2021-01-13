<template>
  <div class="admin-header">
    <div class="admin-breadcrumb">
      <i class="el-icon-location"></i>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(router, index) in routerList" v-bind:key="index" :to="router.path?{ path:router.path }:null">
          {{router.text}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="admin-date">{{dateFormat(date, 'yyyy年MM月dd日&nbsp;hh:mm&nbsp;&nbsp;W')}}</div>
  </div>
</template>

<script>
import { ElIcon, ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'

import { dateFormat } from 'src/utils/date'

export default {
  name: "admin-header",
  components: {
    ElBreadcrumb,
    ElBreadcrumbItem,
  },
  props: {
    routerList: {
      type: Array,
      default: _ => []
    }
  },
  data() {
    return {
      timerId: -1,
      date: new Date()
    };
  },
  mounted() {
    this.timerId = setInterval(_ => {
      this.date = new Date();
    }, 1000 * 10);
  },
  beforeUnmount() {
    clearInterval(this.timerId);
  },
  methods: {
    // 过滤器 filters
    dateFormat,
  },
};
</script>

<style lang="scss" scoped>
.el-icon-location {
  float: left;
  font-size: 20px;
  color: #0084ff;

  & + .el-breadcrumb {
    padding-left: 25px;
    line-height: 20px;
  }
}
</style>


