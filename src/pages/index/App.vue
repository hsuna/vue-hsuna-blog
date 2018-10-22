<template>
  <div id="app" style="height: 100%;">
    <blog-main :activeIndex="'home'">
      <div class="blog-personal">
        <div class="personal-top" :style="`background-image:url(${banner})`"></div>
        <div class="personal-bottom">
          <div class="user-portrait">
            <img :src="portrait" alt="portrait" width="100%" height="100%" />
          </div>
          <div class="user-info clearfix">
            <span class="name">{{nickname}}</span>{{job}}
            <div class="social">
              <el-tooltip content="微博"><a class="icon" href="http://weibo.com/" target="_blank" ><i class="al al-weibo" style="background-color: rgb(221, 75, 57);"></i></a></el-tooltip>
              <el-tooltip content="github"><a class="icon" href="https://github.com/hsuna" target="_blank" ><i class="al al-github" style="background-color: rgb(85, 172, 238);"></i></a></el-tooltip>
              <el-tooltip content="邮箱"><a class="icon" href="mailto:me@hsuna.com" target="_blank" ><i class="al al-envelope" style="background-color: rgb(59, 89, 152);"></i></a></el-tooltip>
              <el-tooltip content="简历"><a class="icon" href="http://resume.hsuna.com" target="_blank" ><i class="al al-address-card-o" style="background-color: rgb(128, 185, 83);"></i></a></el-tooltip>
            </div>
            <div class="introduction">简介：{{introduction}}</div>
          </div>
        </div>
      </div>
      <div class="blog-profile">
        <div class="profile-side">
          <profile-side-hot></profile-side-hot>
          <profile-side-classify></profile-side-classify>
          <profile-side-comment></profile-side-comment>
        </div>
        <div class="profile-main" v-loading="loading">
          <profile-card
            :profileList="profileList"
            :curPage="Number($utils.params('page') || 1)"
            :total="profileTotal"
            @change="handlePaginChange">
          </profile-card>
        </div>
      </div>
    </blog-main>
  </div>
</template>

<script>
import blogMain from "components/blog-main";
import profileCard from "components/profile-card";
import {
  profileSideHot,
  profileSideClassify,
  profileSideComment
} from "components/profile-side";

import $api from "api/blog";

export default {
  name: "App",
  data() {
    return {
      loading: true,
      nickname: "Hsuna",
      job: "WEB前端工程师",
      introduction: "敢而慎之，勇敢不错失任何机会，谨慎不忽略一丝细节",
      portrait: "",
      banner: "",
      profileTotal: 0,
      profileList: []
    };
  },
  created() {
    this.getUserInfo();
    this.getProfileList(this.$utils.query());
  },
  methods: {
    getUserInfo() {
      this.$http.get($api.getUserInfo, {
        params: {
          userName: this.$store.getters.userName || 'hsuna'
        }
      })
      .then(res => {
        if (200 == res.code) {
          let user = res.data;
          this.nickname = user.nickname || "";
          this.job = user.job || "";
          this.introduction = user.introduction || "";
          this.portrait = user.portrait
            ? $api.getFileUpload + "/" + user.portrait
            : "";
          this.banner = user.banner
            ? $api.getFileUpload + "/" + user.banner
            : "";
        }
      });
    },
    getProfileList(params) {
      this.$http.get($api.getArticle, { params }).then(res => {
        if (200 == res.code) {
          this.profileList = res.data.list;
          this.profileTotal = res.data.total;
        }
        this.loading = false;
      });
    },
    handlePaginChange(type, val) {
      if ("page" == type) {
        window.location.href = '/index.html?' + this.$utils.query({
          ...this.$utils.params(),
          page: val
        })
      }
    }
  },
  components: {
    "blog-main": blogMain,
    "profile-card": profileCard,
    "profile-side-hot": profileSideHot,
    "profile-side-classify": profileSideClassify,
    "profile-side-comment": profileSideComment
  }
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
    padding-left: 180px;
    margin: 0 20px 20px;
  }

  .user-portrait {
    overflow: hidden;
    position: absolute;
    top: -80px;
    left: 0;
    width: 160px;
    height: 160px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
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
</style>