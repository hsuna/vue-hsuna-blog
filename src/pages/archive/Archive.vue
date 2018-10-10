<template>
    <div class="blog-body">
      <div class="blog-profile">
        <div class="profile-side">
          <profile-side-archive @search="handleArchive"></profile-side-archive>
          <profile-side-hot></profile-side-hot>
        </div>
        <div class="profile-main" v-loading="loading">
          <profile-card
            :profileList="archiveList"
            :curPage="Number($route.params.page || 1)"
            :total="archiveTotal"
            @change="handlePaginChange">
          </profile-card>
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
      archiveTotal: 0,
      archiveList: []
    };
  },
  created() {
    this.getArchiveList(this.$route.query);
  },
  watch: {
    $route(to, from) {
      this.getArchiveList(this.$route.query);
    }
  },
  methods: {
    getArchiveList(query) {
      if (query.year && query.month) {
        this.loading = true;
        this.$http.get($api.getArticleAchive, { params: query }).then(res => {
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
      this.$router.push({
        path: "/archive",
        query: {
          year: archive.year,
          month: archive.month
        }
      });
    },
    handlePaginChange(type, val) {
      if ("page" == type) {
        this.$router.push({
          path: "/archive",
          query: {
            ...this.$route.query,
            page: val
          }
        });
      }
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
