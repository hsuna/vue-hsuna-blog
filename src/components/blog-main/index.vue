<template>
  <div class="blog">
      <blog-header :activeIndex="activeIndex" :showMore="showMore" :openMore="openMore" @scroll-fixed="handleScrollFixed" @update:openMore="$emit('update:openMore', $event)"></blog-header>
      <div class="blog-body"><slot></slot></div>
      <blog-footer></blog-footer>
      <float-menu :class="showFloatMenu?'is-show':''"></float-menu>
  </div>
</template>

<script>
import BlogHeader from "src/components/blog-header/index.vue";
import BlogFooter from "src/components/blog-footer/index.vue";
import FloatMenu from "src/components/float-menu/index.vue";

export default {
  name: 'blog-main',
  components: {
    BlogHeader,
    BlogFooter,
    FloatMenu
  },
  props: {
    showMore: {
      type: Boolean,
      default: true,
    },
    openMore: {
      type: Boolean,
      default: false,
    },
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
.blog-body {
  width: 100%;
  max-width: 1024px;
  min-height: 800px;
  min-height: calc(100vh - 110px);
  margin: 60px auto 0;

  &:after {
    content: "";
    display: table;
    clear: both;
  }
}
</style>
