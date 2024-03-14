<template>
  <div id="app" style="height: 100%;">
    <blog-main :activeIndex="'archive'" v-model:openMore="openMore">
      <div class="blog-profile">
        <profile-main :loading="loading">
          <profile-card :profileList="archiveList" :curPage="curPage" :total="archiveTotal" @change="handlePaginChange">
          </profile-card>
        </profile-main>
        <profile-side v-model:visible="openMore">
          <profile-side-archive :archiveIndex="archiveIndex" @init="handleArchiveInit"
            @search="handleArchiveSearch"></profile-side-archive>
          <profile-side-hot></profile-side-hot>
        </profile-side>
      </div>
    </blog-main>
  </div>
</template>

<script>
import BlogMain from "src/components/blog-main/index.vue";
import ProfileMain from "src/components/profile-main/index.vue";
import ProfileCard from "src/components/profile-card/index.vue";
import { ProfileSide, ProfileSideHot, ProfileSideArchive } from "src/components/profile-side/index.js";

import Api from "src/api/blog";

export default {
  name: "App",
  components: {
    BlogMain,

    ProfileMain,
    ProfileSide,
    ProfileCard,
    ProfileSideHot,
    ProfileSideArchive
  },
  data() {
    return {
      openMore: false,

      loading: false,
      archiveIndex: -1,
      archiveTotal: 0,
      archiveList: []
    };
  },
  computed: {
    curPage() {
      return Number(this.$route.query.page || 1)
    }
  },
  methods: {
    getArchiveList(params) {
      if (params.year && params.month) {
        this.loading = true;
        Api.getArticleAchive({ params }).then(res => {
          if (200 == res.statusCode) {
            let { rows: list, count: total } = res.data;
            this.archiveList = list;
            this.archiveTotal = total;
          }
          this.loading = false;
        });
      }
    },
    handleArchiveInit(list) {
      let params = utthis.$route.query;
      let index = 0;
      if (params.year && params.month) {
        for (let i = 0, len = list.length; i < len; i++) {
          let { year, month } = list[i]
          if (params.year == year && params.month == month) {
            index = i;
            break;
          }
        }
        this.getArchiveList(params);
        this.archiveIndex = index;
      } else if (list.length > 0) {
        let { year, month } = list[0]
        this.getArchiveList({
          year,
          month,
        });
        this.archiveIndex = 0;
      }
    },
    handleArchiveSearch(archive) {
      const { year, month } = archive;
      this.$router.push({ path: '/archive', query: { year, month } });
    },
    handlePaginChange(type, val) {
      const params = this.$route.query;
      if ("page" == type && val != params.page) {
        this.$router.push({ path: '/archive', query: { ...params, page: val } });
      }
    }
  }
};
</script>
