<template>
  <div id="app" style="height: 100%;">
    <blog-main :activeIndex="'archive'">
      <div class="blog-profile">
        <div class="profile-side">
          <profile-side-archive @search="handleArchive"></profile-side-archive>
          <profile-side-hot></profile-side-hot>
        </div>
        <div class="profile-main" v-loading="loading">
          <profile-card
            :profileList="archiveList"
            :curPage="Number($utils.params('page') || 1)"
            :total="archiveTotal"
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
import { profileSideHot, profileSideArchive } from "components/profile-side";

import $api from "api/blog";

export default {
  name: "App",
   data() {
    return {
      loading: false,
      archiveTotal: 0,
      archiveList: []
    };
  },
  created() {
    this.getArchiveList(this.$utils.params()||{});
  },
  methods: {
    getArchiveList(params) {
      if (params.year && params.month) {
        this.loading = true;
        this.$http.get($api.getArticleAchive, { params }).then(res => {
          if (200 == res.code) {
            let { list, total } = res.data;
            this.archiveList = list;
            this.archiveTotal = total;
          }
          this.loading = false;
        });
      }
    },
    handleArchive(archive) {
      window.location.href = '/archive.html?' + this.$utils.query(archive);
    },
    handlePaginChange(type, val) {
      if ("page" == type) {
         window.location.href = '/archive.html?' + this.$utils.query({
           ...archive,
           page: val
         });
      }
    }
  },
  components: {
    "blog-main": blogMain,
    "profile-card": profileCard,
    "profile-side-hot": profileSideHot,
    "profile-side-archive": profileSideArchive
  }
};
</script>

<style lang="scss">
</style>

