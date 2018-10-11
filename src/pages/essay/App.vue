<template>
  <div id="app">
    <blog-main>
      <div class="blog-profile">
        <div class="profile-side">
          <profile-side-link></profile-side-link>
          <profile-side-inventory></profile-side-inventory>
        </div>
        <div class="profile-main" v-loading="loading">
          <profile-essay
            :profileList="essayList"
            :curPage="Number($route.query.page || 1)"
            :total="essayTotal"
            @change="handlePaginChange">
          </profile-essay>
        </div>
      </div>
    </blog-main>
  </div>
</template>

<script>
import blogMain from "components/blog-main";
import profileEssay from "components/profile-essay";
import { profileSideInventory, profileSideLink } from "components/profile-side";

import $api from "api/blog";

export default {
  name: "App",
   data() {
    return {
      loading: true,
      essayTotal: 0,
      essayList: []
    };
  },
  created() {
    this.getEssayList(this.$route.query);
  },
  watch: {
    $route(to, from) {
      this.getEssayList(this.$route.query);
    }
  },
  methods: {
    getEssayList(query) {
      this.$http.get($api.getEssay, { params: query }).then(res => {
        if (200 == res.code) {
          let { list, total } = res.data;
          this.essayList = list;
          this.essayTotal = total;
        }
        this.loading = false;
      });
    },
    handlePaginChange(type, val) {
      if ("page" == type) {
        this.$router.push({
          path: "/essay",
          query: {
            ...this.$route.query,
            page: val
          }
        });
      }
    }
  },
  components: {
    "blog-main": blogMain,
    "profile-essay": profileEssay,
    "profile-side-inventory": profileSideInventory,
    "profile-side-link": profileSideLink
  }
};
</script>

<style lang="scss">
</style>

