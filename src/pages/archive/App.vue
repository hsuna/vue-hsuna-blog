<template>
  <div id="app" style="height: 100%;">
    <blog-main :activeIndex="'archive'" v-model:openMore="openMore">
      <div class="blog-profile">
        <profile-side v-model:visible="openMore">
          <profile-side-archive :archiveIndex="archiveIndex" @init="handleArchiveInit" @search="handleArchiveSearch"></profile-side-archive>
          <profile-side-hot></profile-side-hot>
        </profile-side>
        <div class="profile-main" v-loading="loading">
          <profile-card
            :profileList="archiveList"
            :curPage="curPage"
            :total="archiveTotal"
            @change="handlePaginChange">
          </profile-card>
        </div>
      </div>
    </blog-main>
  </div>
</template>

<script>
import BlogMain from "src/components/blog-main/index.vue";
import ProfileCard from "src/components/profile-card/index.vue";
import { ProfileSide, ProfileSideHot, ProfileSideArchive } from "src/components/profile-side/index.js";

import * as utils from 'src/utils/search.js'

import Api from "src/api/blog";

export default {
  name: "App",
  components: {
    BlogMain,
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
    curPage(){
      return Number(utils.params('page') || 1)
    }
  },
  methods: {
    getArchiveList(params) {
      if (params.year && params.month) {
        this.loading = true;
        Api.getArticleAchive({ params }).then(res => {
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
      let params = utils.params()

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
      window.location.href = '/archive.html?' + utils.query({ year, month })
    },
    handlePaginChange(type, val) {
      const params = utils.params();
      if ("page" == type && val != params.page) {
        window.location.href = '/archive.html?' + utils.query({ ...params, page: val })
      }
    }
  }
};
</script>

