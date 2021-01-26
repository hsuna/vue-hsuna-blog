<template>
  <div id="app">
    <blog-main :activeIndex="'essay'" v-model:openMore="openMore">
      <div class="blog-profile">
        <profile-side v-model:visible="openMore">
          <profile-side-link></profile-side-link>
          <profile-side-inventory></profile-side-inventory>
        </profile-side>
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
import { ProfileSide, ProfileSideInventory, ProfileSideLink } from "src/components/profile-side";

import * as utils from 'src/utils/search.js'
import Api from "src/api/blog";

export default {
  name: "App",
  components: {
    BlogMain,
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
};
</script>

<style lang="scss">
</style>

