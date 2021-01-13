<template>
  <div id="app">
    <blog-main :activeIndex="'essay'">
      <div class="blog-profile">
        <div class="profile-side">
          <profile-side-link></profile-side-link>
          <profile-side-inventory></profile-side-inventory>
        </div>
        <div class="profile-main" v-loading="loading">
          <profile-essay
            :profileList="essayList"
            :curPage="curPage"
            :total="essayTotal"
            @change="handlePaginChange">
          </profile-essay>
        </div>
      </div>
    </blog-main>
  </div>
</template>

<script>
import BlogMain from "src/components/blog-main/index.vue";
import ProfileEssay from "src/components/profile-essay/index.vue";
import { ProfileSideInventory, ProfileSideLink } from "src/components/profile-side";

import * as utils from 'src/utils/search.js'
import Api from "src/api/blog";

export default {
  name: "App",
   data() {
    return {
      loading: true,
      essayTotal: 0,
      essayList: []
    };
  },
  computed: {
    curPage(){
      return Number(utils.params('page') || 1)
    }
  },
  created() {
    this.getEssayList(utils.params());
  },
  methods: {
    getEssayList(params) {
      Api.getEssay({ params }).then(res => {
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
        window.location.href = '/essay.html?'+utils.query({
          ...utils.params(),
          page: val
        })
      }
    }
  },
  components: {
    BlogMain,
    ProfileEssay,
    ProfileSideInventory,
    ProfileSideLink
  }
};
</script>

<style lang="scss">
</style>

