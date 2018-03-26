<template>
  <div class="blog">
      <blog-header></blog-header>
      <router-view />
  </div>
</template>

<script>
import blogHeader from "components/blog-header";

export default {
  components: {
    "blog-header": blogHeader
  }
};
</script>


<style lang="scss">
  body{
    background-color: #fafafa;
  }
  .blog-body{
    width: 1024px;
    margin: 0 auto;
    padding-top: 52px;
  }
</style>
