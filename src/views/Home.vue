<template>
    <div class="blog-body">
      <blog-personal></blog-personal>
      <div class="blog-profile">
        <profile-side></profile-side>
        <profile-main></profile-main>
      </div>

    </div>
</template>

<script>
import blogPersonal from "components/blog-personal";
import profileMain from "components/profile-main";
import profileSide from "components/profile-side";

import $api from "api/guest";

export default {
  data() {
    return {};
  },
  created() {},

  methods: {},
  components: {
    "blog-personal": blogPersonal,
    "profile-main": profileMain,
    "profile-side": profileSide
  }
};
</script>

<style lang="scss">

</style>
