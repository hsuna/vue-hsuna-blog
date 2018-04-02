<template>
  <div class="blog-body">
    <div class="blog-personal">
      <div class="personal-top" :style="`background-image:url(${background})`"></div>
      <div class="personal-bottom">
        <div class="user-portrait">
          <img src="/static/images/20180326140219.jpg" alt="portrait" width="100%" height="100%" />
        </div>
        <div class="user-info clearfix">
          <span class="name">Hsuna</span>WEB前端工程师
          <div class="social">
            <a class="icon" href="http://weibo.com/" target="_blank" ><i class="fa fa-weibo" style="background-color: rgb(221, 75, 57);"></i></a>
            <a class="icon" href="https://github.com/hsuna" target="_blank" ><i class="fa fa-github" style="background-color: rgb(85, 172, 238);"></i></a>
            <a class="icon" href="mailto:me@hsuna.com" target="_blank" ><i class="fa fa-envelope" style="background-color: rgb(59, 89, 152);"></i></a>
            <a class="icon" href="http://resume.hsuna.com" target="_blank" ><i class="fa fa-address-card-o" style="background-color: rgb(128, 185, 83);"></i></a>
          </div>
          <div class="introduction">简介：{{introduction}}</div>
          <el-popover ref="popover1" placement="bottom" title="标题" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"></el-popover>
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
        <profile-card :profileList="profileList"></profile-card>
      </div>
    </div>
  </div>
</template>

<script>
import profileCard from "components/profile-card";
import {
  profileSideHot,
  profileSideClassify,
  profileSideComment
} from "components/profile-side";

import $api from "api/guest";

export default {
  data() {
    return {
      loading: true,
      introduction: "",
      background: "/static/images/20180327230952.jpg",
      profileList: []
    };
  },
  created() {
    this.getProfileList(this.$route.query);
  },
  watch: {
    $route(to, from) {
      this.getProfileList(this.$route.query);
    }
  },
  methods: {
    getProfileList(query) {
      this.$http.get($api.getArticle, { params: query }).then(res => {
        if (200 == res.code) {
          this.profileList = res.data.list;
          if (!query) {
            this.articleCount = res.data.total;
          }
        }
        this.loading = false;
      });
    }
  },
  components: {
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
    min-height: 90px;
    padding-left: 180px;
    margin: 0 20px 24px;
  }

  .user-portrait {
    overflow: hidden;
    position: absolute;
    top: -70px;
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
      font-size: 20px;
      font-weight: bold;
    }

    .social {
      float: right;
      .icon {
        display: inline-block;
        margin-left: 5px;
        text-decoration: none;
      }
      .fa {
        font-size: 20px;
        width: 32px;
        line-height: 32px;
        border-radius: 50%;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.1);
        text-align: center;
      }
    }

    .introduction {
      padding-top: 12px;
      padding-left: 4px;
      color: #999;
    }
  }
}
</style>
