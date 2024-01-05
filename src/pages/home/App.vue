<template>
  <div id="app" style="height: 100%;">
    <blog-main :activeIndex="'home'" v-model:openMore="openMore">
      <div class="blog-personal">
        <div class="personal-top" :style="`background-image:url(${banner})`"></div>
        <div class="personal-bottom">
          <div class="user-portrait" v-loading="!portrait">
            <img :src="portrait" />
          </div>
          <div class="user-info clearfix">
            <span class="name">{{ nickname }}</span>
            <span class="job">{{ job }}</span>
            <div class="social">
              <el-tooltip content="微博"><a class="icon" href="https://weibo.com/u/7888172222" target="_blank"><i
                    class="fa fa-weibo" style="background-color: rgb(221, 75, 57);"></i></a></el-tooltip>
              <el-tooltip content="github"><a class="icon" href="https://github.com/hsuna" target="_blank"><i
                    class="fa fa-github" style="background-color: rgb(85, 172, 238);"></i></a></el-tooltip>
              <el-tooltip content="邮箱"><a class="icon" href="mailto:me@hsuna.com" target="_blank"><i
                    class="fa fa-envelope" style="background-color: rgb(59, 89, 152);"></i></a></el-tooltip>
              <el-tooltip content="巽阁"><a class="icon" href="https://video.hsuna.com" target="_blank"><i
                    class="fa fa-address-card-o" style="background-color: rgb(128, 185, 83);"></i></a></el-tooltip>
            </div>
            <div class="introduction">{{ introduction }}</div>
          </div>
        </div>
      </div>
      <div class="blog-profile">
        <profile-main :loading="loading">
          <profile-card :profileList="profileList" :curPage="profilePage" :total="profileTotal"
            @change="handlePaginChange">
          </profile-card>
        </profile-main>
        <profile-side v-model:visible="openMore">
          <profile-side-hot></profile-side-hot>
          <profile-side-classify></profile-side-classify>
          <profile-side-comment></profile-side-comment>
        </profile-side>
      </div>
    </blog-main>
  </div>
</template>

<script>
import { ElTooltip } from "element-plus";

import BlogMain from "src/components/blog-main/index.vue";
import ProfileMain from "src/components/profile-main/index.vue";
import ProfileCard from "src/components/profile-card/index.vue";
import {
  ProfileSide,
  ProfileSideHot,
  ProfileSideClassify,
  ProfileSideComment,
} from "src/components/profile-side/index.js";

import * as utils from "src/utils/search.js";
import Api from "src/api/blog.js";

export default {
  name: "App",
  components: {
    ElTooltip,

    BlogMain,

    ProfileMain,
    ProfileSide,
    ProfileCard,
    ProfileSideHot,
    ProfileSideClassify,
    ProfileSideComment,
  },
  data() {
    return {
      openMore: false,

      loading: true,
      nickname: "Hsuna",
      job: "WEB前端工程师",
      introduction: "敢而慎之，勇敢不错失任何机会，谨慎不忽略一丝细节",
      portrait: "",
      banner: "",

      profilePage: 1,
      profileTotal: 0,
      profileList: [],
    };
  },
  created() {
    this.getUserInfo();

    this.getProfileList({
      page: 1,
      ...utils.params(),
    });
  },
  methods: {
    getUserInfo() {
      Api.getUserInfo({
        params: {
          userName: "hsuna",
        },
      }).then((res) => {
        if (200 == res.statusCode) {
          const user = res.data || {};
          this.nickname = user.nickname || "";
          this.job = user.job || "";
          this.introduction = user.introduction || "";
          this.portrait = user.portrait || "";
          this.banner = user.banner || "";
        }
      });
    },
    getProfileList(params) {
      Api.getArticle({ params }).then((res) => {
        if (200 == res.statusCode) {
          this.profileList = res.data.rows;
          this.profileTotal = res.data.count;
          this.profilePage = Number(params.page);
        }
        this.loading = false;
      });
    },
    handlePaginChange(type, val) {
      const params = utils.params();
      if ("page" == type && val != params.page) {
        window.location.href =
          "/index.html?" + utils.query({ ...params, page: val });
      }
    },
  },
};
</script>

<style lang="scss">
.blog-personal {
  margin: 10px 0;
  padding-bottom: 1px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);

  .personal-top {
    height: 240px;
    background-size: cover;
    background-position: center;
  }

  .personal-bottom {
    position: relative;
    min-height: 80px;
    padding-left: 200px;
    margin: 0 20px 20px;
  }

  .user-portrait {
    overflow: hidden;
    position: absolute !important;
    top: -80px;
    left: 20px;
    width: 160px;
    height: 160px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);

    img {
      width: 100%;
      height: 100%;
    }
  }

  .user-info {
    padding-top: 15px;
    padding-left: 10px;

    .name {
      margin-right: 10px;
      font-size: 24px;
      font-weight: bold;
      //text-shadow: 0 0 2px #555, 1px 2px 1px #666, 3px 4px 0px #999;
      color: #444;
    }

    .social {
      float: right;

      .icon {
        display: inline-block;
        margin-left: 5px;
        text-decoration: none;
      }

      .fa {
        display: block;
        font-size: 20px;
        width: 32px;
        line-height: 32px;
        border-radius: 50%;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.1);
        text-align: center;
        transition: all 500ms;

        &:hover {
          border-radius: 4px;
        }
      }
    }

    .introduction {
      padding-top: 10px;
      color: #999;
    }
  }
}

@media screen and (max-width: 750px) {
  .blog-personal {
    .personal-bottom {
      padding-left: 0;
    }

    .user-portrait {
      position: static !important;
      left: auto;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin: -160px auto 0;
    }

    .user-info {
      padding-top: 0;
      padding-left: 0;

      .name,
      .job,
      .social,
      .introduction {
        display: block;
        text-align: center;
        margin-top: 10px;
      }

      .name {
        margin-right: 0;
        font-size: 28px;
      }

      .social {
        float: none;
      }

      .introduction {
        padding-top: 15px;
        margin: 0 40px;
      }
    }
  }
}
</style>
