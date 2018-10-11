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
            :curPage="Number($utils.params('page') || 1)"
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
    this.getEssayList(this.$utils.params());
  },
  methods: {
    getEssayList(params) {
      this.$http.get($api.getEssay, { params }).then(res => {
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
        window.location.href = '/essay.html?'+this.$utils.query({
          ...this.$utils.params,
          page: val
        })
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

