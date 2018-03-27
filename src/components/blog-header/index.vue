<template>
    <div class="blog-header">
        <div class="header-inner">
            <div class="page-header">
                <div class="header-logo">
                    <a>HSUNA</a>
                </div>
                <!-- <div class="header-btns">
                    <el-button type="primary" plain>登录</el-button>
                </div> -->
                <el-menu :default-active="activeIndex" class="header-nav" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="home">首页</el-menu-item>
                    <!-- <el-submenu index="classify">
                        <template slot="title">分类</template>
                        <el-menu-item v-for="item in classifyList" :index="item._id" :key="item._id"><span>[{{item.count}}]</span>{{item._id}}</el-menu-item>
                    </el-submenu> -->
                    <el-menu-item index="comment">留言</el-menu-item>
                    <el-menu-item index="about">关于</el-menu-item>
                </el-menu>
            </div>
            <div class="class-header" :class="showClassify?'is-show':''" @mouseleave="showClassify = false">
                <div class="header-portrait">
                    <img src="/static/images/WeChat Image_20180326140219.jpg" alt="hsuna" width="100%" height="100%" />
                </div>
                <ul class="header-nav">
                    <li><a class="is-active">首页</a></li>
                    <li><a>分类</a></li>
                    <li><a>分类</a></li>
                    <li><a>留言</a></li>
                    <li><a>留言</a></li>
                    <li><a>留言</a></li>
                    <!-- <li>
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown" @mouseover="showClassify = true">
                                <el-dropdown-item>黄金糕</el-dropdown-item>
                                <el-dropdown-item>狮子头</el-dropdown-item>
                                <el-dropdown-item>螺蛳粉</el-dropdown-item>
                                <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                                <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </li> -->
                </ul>
            </div>
        </div>
    </div>
</template>


<script>
import $api from "api/guest";

export default {
  data() {
    return {
      showClassify: false,
      activeIndex: "home",
      classifyList: []
    };
  },
  created() {
    //this.getClassifyList();
  },
  methods: {
    getClassifyList() {
      this.$http.get($api.getClassifyCount).then(res=>{
        if(200 == res.code){
          this.classifyList = res.data;
        }
      })
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
        case "comment":
        case "about":
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

  .header-inner {
    position: relative;
    overflow: hidden;
    width: 1024px;
    height: 52px;
    margin: 0 auto;
  }

  .page-header {
    .header-logo {
      float: left;
      width: 80px;
      height: 52px;
    }

    .header-btns {
      float: right;
      line-height: 52px;
      padding-right: 16px;
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
        &:hover {
          text-decoration: none;
          color: #0084ff;
        }

        &.is-active {
          color: #0084ff;
          // font-weight: bold;
          // border-bottom: 3px solid #0084ff;
        }
      }
    }
  }
  .class-header {
    position: absolute;
    top: 52px;
    left: 0;
    right: 0;
    transition: top 0.5s;
    background-color: #fff;

    .header-portrait {
      float: left;
      width: 42px;
      height: 42px;
      padding: 4px;
      border-radius: 2px;
    }

    .header-nav {
      li {
        display: inline-block;
        padding: 0 20px;

        a {
          display: inline-block;
          padding: 14px 0;
          font-size: 15px;
          color: #8590a6;
          cursor: pointer;

          &:hover {
            text-decoration: none;
          }

          &.is-active {
            border-bottom: 3px solid #0084ff;
          }
        }
      }
    }
  }
  .class-header.is-show {
    top: 0;
  }
}
</style>
