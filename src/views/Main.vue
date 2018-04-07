<template>
  <div class="blog">
      <blog-header :activeIndex="activeIndex" @scroll-fixed="handleScrollFixed"></blog-header>
      <router-view />
      <blog-footer></blog-footer>
      <float-menu :class="showFloatMenu?'is-show':''"></float-menu>
  </div>
</template>

<script>
import blogHeader from "components/blog-header";
import blogFooter from "components/blog-footer";
import floatMenu from "components/float-menu";

export default {
  data() {
    return {
      activeIndex: this.$route.name,
      showFloatMenu: false
    };
  },
  methods: {
    handleScrollFixed(isFixed) {
      this.showFloatMenu = !isFixed;
    }
  },
  components: {
    "blog-header": blogHeader,
    "blog-footer": blogFooter,
    "float-menu": floatMenu
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
