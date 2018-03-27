<template>
    <div class="blog-body">
      <blog-personal :articleCount="articleCount" :classifyList="classifyList" @click-classify="handleClassify"></blog-personal>
      <blog-profile :profileList="profileList"></blog-profile>
    </div>
</template>

<script>
import blogPersonal from "components/blog-personal";
import blogProfile from "components/blog-profile";

import $api from "api/guest";

export default {
  data() {
    return {
      articleCount: 0,
      classifyList: [],
      profileList: []
    };
  },
  created() {
    this.getProfileList();
    this.getClassifyCount();
  },
  methods: {
    getClassifyCount() {
      this.$http.get($api.getClassifyCount).then(res => {
        if (200 == res.code) {
          this.classifyList = res.data;
        }
      });
    },
    getProfileList(query) {
      this.$http.get($api.getArticle, { params: query }).then(res => {
        if (200 == res.code) {
          this.profileList = res.data.list;
          if(!query){
            this.articleCount = res.data.total;
          }
        }
      });
    },
    handleClassify(classify) {
      this.getProfileList({ classify });
    }
  },
  components: {
    "blog-personal": blogPersonal,
    "blog-profile": blogProfile
  }
};
</script>

<style lang="scss">

</style>
