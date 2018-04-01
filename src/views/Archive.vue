<template>
    <div class="blog-body">
      <div class="blog-profile">
        <div class="profile-side">
          <profile-side-archive @search="handleArchive"></profile-side-archive>
          <profile-side-hot></profile-side-hot>
        </div>
        <div class="profile-main" v-loading="loading">
          <profile-card :profileList="archiveList"></profile-card>
        </div>
      </div>
    </div>
</template>

<script>
import profileCard from "components/profile-card";
import { profileSideHot, profileSideArchive } from "components/profile-side";

import $api from "api/guest";

export default {
  data() {
    return {
      loading: false,
      archiveList: []
    };
  },
  created() {},
  methods: {
    handleArchive(archive) {
      this.loading = true;
      this.$http.get($api.getArticleAchive, { params: archive }).then(res => {
        if (200 == res.code) {
          let { list, total } = res.data;
          this.archiveList = list;
        }
        this.loading = false;
      });
    }
  },
  components: {
    "profile-card": profileCard,
    "profile-side-hot": profileSideHot,
    "profile-side-archive": profileSideArchive
  }
};
</script>

<style lang="scss">

</style>
