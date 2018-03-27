<template>
    <div class="blog-body">
      <blog-personal></blog-personal>
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
      profileList: []
    };
  },
  created() {
    this.$http.get($api.getArticle).then(res=>{
      if(200 == res.code){
        this.profileList = res.data.list;
      }
    })
  },
  methods: {},
  components: {
    "blog-personal": blogPersonal,
    "blog-profile": blogProfile
  }
};
</script>

<style lang="scss">
</style>
