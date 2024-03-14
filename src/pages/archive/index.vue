<template>
  <blog-main :activeIndex="'archive'" v-model:openMore="openMore">
    <div class="blog-profile">
      <profile-main :loading="loading">
        <profile-card :profileList="archiveList" :curPage="curPage" :total="archiveTotal" @change="handlePaginChange">
        </profile-card>
      </profile-main>
      <profile-side v-model:visible="openMore">
        <profile-side-archive @change="handleArchiveChange" />
        <profile-side-hot />
      </profile-side>
    </div>
  </blog-main>
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
  watch: {
    '$route.query': {
      handler(query) {
        this.getArchiveList({
          page: 1,
          ...query,
        })
      },
      immediate: true,
    }
  },
  methods: {
    async getArchiveList(params) {
      this.loading = true;
      const res = await Api.getArticleAchive({ params })
      if (200 == res.statusCode) {
        let { rows: list, count: total } = res.data;
        this.archiveList = list;
        this.archiveTotal = total;
      }
      this.loading = false;
    },
    handleArchiveChange(archive) {
      if (archive.init) {
        this.getArchiveList({
          year: archive.year,
          month: archive.month,
        })
      } else {
        this.$router.push({
          query: {
            year: archive.year,
            month: archive.month,
          }
        });
      }
    },
    handlePaginChange(type, val) {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: val,
        }
      });
    }
  }
};
</script>
