<template>
  <div class="blog">
      <blog-header :activeIndex="activeIndex"></blog-header>
      <router-view />
      <blog-footer></blog-footer>
  </div>
</template>

<script>
import blogHeader from "components/blog-header";
import blogFooter from "components/blog-footer";

export default {
  data() {
    return {
      activeIndex: this.$route.name
    };
  },
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
  min-height: 800px;
  margin: 0 auto;
  margin-top: 60px;

  &:after {
    content: "";
    display: table;
    clear: both;
  }
}
</style>
