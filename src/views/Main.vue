<template>
  <div class="blog">
      <blog-header></blog-header>
      <router-view />
      <blog-footer></blog-footer>
  </div>
</template>

<script>
import blogHeader from "components/blog-header";
import blogFooter from "components/blog-footer";

export default {
  components: {
    "blog-header": blogHeader,
    "blog-footer": blogFooter
  }
};
</script>


<style lang="scss">
body {
  background-color: #fafafa;
}
.blog-body {
  width: 1024px;
  margin: 0 auto;
  margin-top: 60px;
}
</style>
