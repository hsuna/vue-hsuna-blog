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
    <div class="admin-date">{{date, 'yyyy年MM月dd日&nbsp;hh:mm&nbsp;&nbsp;W' | dateFormat}}</div>
  </div>
</template>

<script>
import { Breadcrumb, BreadcrumbItem } from 'element-ui'

import { dateFormat } from 'src/utils/date'

export default {
  name: "admin-header",
  components: {
    [Breadcrumb.name]: Breadcrumb,
    [BreadcrumbItem.name]: BreadcrumbItem,
  },
  props: {
    routerList: {
      type: Array,
      default: _ => []
    }
  },
  filters: {
    dateFormat
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
  destroyed() {
    clearInterval(this.timerId);
  },
  methods: {}
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


