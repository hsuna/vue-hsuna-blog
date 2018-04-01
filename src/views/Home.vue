<template>
  <div class="blog-body">
    <blog-personal></blog-personal>
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
import blogPersonal from "components/blog-personal";
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
    "blog-personal": blogPersonal,
    "profile-card": profileCard,
    "profile-side-hot": profileSideHot,
    "profile-side-classify": profileSideClassify,
    "profile-side-comment": profileSideComment
  }
};
</script>

