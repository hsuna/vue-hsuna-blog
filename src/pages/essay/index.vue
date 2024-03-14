<template>
  <blog-main :activeIndex="'essay'" v-model:openMore="openMore">
    <div class="blog-profile">
      <profile-main :loading="loading">
        <profile-essay :profileList="essayList" :curPage="curPage" :total="essayTotal" @change="handlePaginChange">
        </profile-essay>
      </profile-main>
      <profile-side v-model:visible="openMore">
        <profile-side-link></profile-side-link>
        <profile-side-inventory></profile-side-inventory>
      </profile-side>
    </div>
  </blog-main>
</template>

<script>
import BlogMain from "src/components/blog-main/index.vue";
import ProfileMain from "src/components/profile-main/index.vue";
import ProfileEssay from "src/components/profile-essay/index.vue";
import { ProfileSide, ProfileSideInventory, ProfileSideLink } from "src/components/profile-side";

import Api from "src/api/blog";

export default {
  name: "App",
  components: {
    BlogMain,

    ProfileMain,
    ProfileSide,
    ProfileEssay,
    ProfileSideInventory,
    ProfileSideLink
  },
  data() {
    return {
      openMore: false,

      loading: true,
      essayTotal: 0,
      essayList: []
    };
  },
  computed: {
    curPage() {
      return Number(this.$route.query.page || 1)
    }
  },
  created() {
    this.getEssayList(this.$route.query);
  },
  methods: {
    getEssayList(params) {
      Api.getEssay({ params }).then(res => {
        if (200 == res.statusCode) {
          let { rows: list, count: total } = res.data;
          this.essayList = list;
          this.essayTotal = total;
        }
        this.loading = false;
      });
    },
    handlePaginChange(type, val) {
      const params = this.$route.query;
      if ("page" == type && val != params.page) {
        this.$router.push({ path: '/essay', query: { ...params, page: val } });
      }
    }
  },
};
</script>

<style lang="scss"></style>
