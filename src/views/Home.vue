<template>
    <div class="blog-body">
      <blog-personal></blog-personal>
      <blog-profile></blog-profile>
    </div>
</template>

<script>
import blogPersonal from "components/blog-personal";
import blogProfile from "components/blog-profile";

export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {
    "blog-personal": blogPersonal,
    "blog-profile": blogProfile
  }
};
</script>

<style lang="scss">
</style>
