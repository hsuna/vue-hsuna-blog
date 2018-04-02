<template>
  <div class="blog-header" :class="isFixed?'':'fixed-hidden'">
    <div class="header-inner">
      <!-- <div class="header-logo">
          <a>HSUNA</a>
      </div> -->
      <el-menu :default-active="activeIndex" class="header-nav" mode="horizontal" @select="handleSelect">
          <el-menu-item index="home"><i class="fa fa-home"></i>首页</el-menu-item>
          <el-menu-item index="archive"><i class="fa fa-archive"></i>档案</el-menu-item>
          <el-menu-item index="about"><i class="fa fa-user"></i>关于</el-menu-item>
          <el-menu-item index="admin"><i class="fa fa-cog"></i>管理</el-menu-item>
      </el-menu>
      <div class="header-search">
          <el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="inputSearch"></el-input>
      </div>
    </div>
  </div>
</template>


<script>
import $api from "api/guest";

export default {
  name: "blogHeader",
  props: {
    activeIndex: {
      type: String,
      default: "home"
    }
  },
  data() {
    return {
      isFixed: true,
      inputSearch: ""
    };
  },
  created() {
    //this.getClassifyList();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 60) {
        this.isFixed = false;
      } else {
        this.isFixed = true;
      }
    },
    handleSelect(index, indexPath) {
      switch (indexPath[0]) {
        //一级
        case "home":
          this.$router.push({ path: "/" });
          break;
        case "classify":
          //二级
          this.$router.push({
            path: "/",
            query: {
              classify: indexPath[1]
            }
          });
          break;
        case "archive":
        case "about":
        case "admin":
          this.$router.push({ path: "/" + index });
          break;
      }
    }
  }
};
</script>

<style lang="scss">
.blog-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  transition: top 300ms;

  &.fixed-hidden {
    top: -60px;
  }

  .header-inner {
    position: relative;
    overflow: hidden;
    width: 1024px;
    height: 52px;
    margin: 0 auto;
  }

  .header-logo {
    float: left;
    width: 80px;
    height: 52px;
  }

  .header-search {
    position: absolute;
    top: 10px;
    right: 4px;
  }

  .header-nav {
    .el-menu-item,
    .el-submenu__title {
      display: inline-block;
      height: 52px;
      line-height: 52px;
      margin: 0 10px;
      padding: 0 10px;
      font-size: 16px;
    }

    .el-menu-item {
      i {
        margin-right: 4px;
        vertical-align: inherit;
        font-size: 18px;
      }

      &:hover {
        text-decoration: none;
        color: #0084ff;

        i {
          color: #0084ff;
        }
      }

      &.is-active {
        color: #0084ff;
        // font-weight: bold;
        // border-bottom: 3px solid #0084ff;
      }
    }
  }
}
</style>
