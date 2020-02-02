<template>
  <div class="blog">
      <blog-header :activeIndex="activeIndex" @scroll-fixed="handleScrollFixed"></blog-header>
      <div class="blog-body"><slot></slot></div>
      <blog-footer></blog-footer>
      <float-menu :class="showFloatMenu?'is-show':''"></float-menu>
  </div>
</template>

<script>
import BlogHeader from "src/components/blog-header";
import BlogFooter from "src/components/blog-footer";
import FloatMenu from "src/components/float-menu";

export default {
  name: 'blog-main',
  components: {
    BlogHeader,
    BlogFooter,
    FloatMenu
  },
  props: {
    activeIndex: {
      type: String,
      default: 'home'
    }
  },
  data() {
    return {
      showFloatMenu: false
    };
  },
  methods: {
    handleScrollFixed(isFixed) {
      this.showFloatMenu = !isFixed;
    }
  },
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
