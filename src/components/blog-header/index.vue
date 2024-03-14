<template>
  <div class="blog-header" :class="classes">
    <div class="header-inner">
      <div class="header-search">
        <i v-if="showMenu" class="el-icon-menu" @click="openMenu = true;"></i>
        <el-input placeholder="搜索" v-model="inputSearch" prefix-icon="el-icon-search" @change="handleSearch"></el-input>
        <i v-if="showMore" class="el-icon-more" @click="$emit('update:openMore', true);"></i>
      </div>
      <div class="header-nav" :class="{ 'is-active': openMenu }">
        <i class="el-icon-close" @click="openMenu = false;"></i>
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item index="home"><i class="fa fa-home"></i>首页</el-menu-item>
          <el-menu-item index="archive"><i class="fa fa-archive"></i>档案</el-menu-item>
          <el-menu-item index="about"><i class="fa fa-user"></i>关于</el-menu-item>
          <el-menu-item index="essay"><i class="fa fa-pencil"></i>手札</el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>


<script>
import { ElIcon, ElButton, ElInput, ElMenu, ElMenuItem, ElMessage } from 'element-plus';
import storage, { StorageKey } from 'src/utils/storage.js'

export default {
  name: "blog-header",
  components: {
    ElButton,
    ElInput,
    ElMenu,
    ElMenuItem,
  },
  props: {
    showMenu: {
      type: Boolean,
      default: true,
    },
    showMore: {
      type: Boolean,
      default: true,
    },
    openMore: {
      type: Boolean,
      default: false,
    },
    activeIndex: {
      type: String,
      default: "home"
    }
  },
  data() {
    return {
      openMenu: false,

      isFixed: true,
      inputSearch: ""
    };
  },
  computed: {
    classes() {
      return [
        { 'fixed-hidden': !this.isFixed },
        { 'has-menu': this.showMenu },
        { 'has-more': this.showMore },
      ]
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
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
      this.$emit('scroll-fixed', this.isFixed);
    },
    handleSelect(index, indexPath) {
      switch (indexPath[0]) {
        //一级
        case "home":
          this.$router.push({ path: '/' });
          break;
        case "classify":
          //二级
          this.$router.push({ path: '/', query: { classifyId: indexPath[1] } });
          break;
        case "archive":
        case "about":
        case "essay":
          this.$router.push({ path: `/${index}` });
          break;
      }
    },
    handleSearch() {
      if (this.inputSearch) {
        console.log(this.inputSearch);
        ElMessage('该功能正在建设中～');
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
    max-width: 1024px;
    width: 100%;
    height: 52px;
    margin: 0 auto;

    .el-icon-close {
      display: none;
    }
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
    z-index: 2;

    .el-icon-menu,
    .el-icon-more {
      display: none;
    }
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
        vertical-align: -1px;
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
        color: #0084ff !important;
        // font-weight: bold;
        // border-bottom: 3px solid #0084ff;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  .blog-header {
    &.fixed-hidden {
      top: 0;
    }

    .header-search {
      position: static;
      padding: 10px 15px;

      .el-icon-menu,
      .el-icon-more {
        display: block;
        position: absolute;
        z-index: 2;
        font-size: 24px;
        color: #555;
      }

      .el-icon-menu {
        top: 14px;
        left: 18px;
      }

      .el-icon-more {
        top: 13px;
        right: 18px;
      }
    }

    &.has-menu {
      .header-search {
        padding-left: 52px;
      }
    }

    &.has-more {
      .header-search {
        padding-right: 52px;
      }
    }

    .header-nav {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      height: auto;
      background: rgba(255, 255, 255, 0.9);

      &.is-active {
        display: block;
      }

      .el-icon-close {
        display: block;
        position: absolute;
        top: 14px;
        left: 18px;
        font-size: 24px;
        color: #555;
      }

      .el-menu {
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        margin-top: -200px;
        border-bottom: none;
        animation: header-inner__wrap .3s ease-out;
      }

      .el-menu-item {
        float: none;
        display: block;
        font-size: 16px;
        text-align: center;
        margin: 10px 50px;
        height: 60px;
        line-height: 60px;
        border-bottom: none;
        color: #555;

        &+.el-menu-item {
          border-top: 1px solid #eee !important;
        }

        &.is-active {
          color: #555 !important;
        }

        i {
          margin-right: 10px;
          color: #555 !important;
        }
      }

    }
  }
}

@keyframes header-inner__wrap {
  0% {
    transform: translateY(-200px);
  }

  60% {
    transform: translateY(20px);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
