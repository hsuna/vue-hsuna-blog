<template>
  <div id="app" style="height: 100%;">
    <blog-main :activeIndex="'archive'">
      <div class="blog-profile">
        <div class="profile-side">
          <profile-side-archive :archiveIndex="archiveIndex" @init="handleArchiveInit" @search="handleArchiveSearch"></profile-side-archive>
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
      archiveIndex: -1,
      archiveTotal: 0,
      archiveList: []
    };
  },
  created() {
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
    handleArchiveInit(list){
      let params = this.$utils.params()

      let index = 0;
      if (params.year && params.month) {
        for(let i=0, len=list.length; i<len; i++){
          let { year, month } = list[i]
          if(params.year == year && params.month == month){
            index = i;
            break;
          }
        }
        this.getArchiveList(params);
         this.archiveIndex = index;
      }else if(list.length > 0){
        let { year, month } = list[0]
        this.getArchiveList({
          year,
          month,
        });
         this.archiveIndex = 0;
      }
    },
    handleArchiveSearch(archive) {
      let { year, month } = archive
      window.location.href = '/archive.html?' + this.$utils.query({ year, month })
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

