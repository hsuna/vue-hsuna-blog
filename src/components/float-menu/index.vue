<template>
    <div class="float-menu">
        <a href="/" title="首页" v-if="isShowMenuByName('home')"><i class="fa fa-home"></i></a>
        <a href="/archive" title="档案" v-if="isShowMenuByName('archive')"><i class="fa fa-archive"></i></a>
        <a href="/about" title="关于" v-if="isShowMenuByName('about')"><i class="fa fa-user"></i></a>
        <a href="/essay" title="手札" v-if="isShowMenuByName('essay')"><i class="fa fa-pencil"></i></a>
        <a href="/admin" title="管理" v-if="$store.getters.token"><i class="fa fa-cog"></i></a>
        <a href="javascript:;" title="返回顶部" @click="handleBackTop"><i class="fa fa-arrow-up"></i></a>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    isShowMenuByName(name) {
      return name !== this.$utils.params('name')
    },
    handleBackTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.float-menu {
  position: fixed;
  left: 50%;
  bottom: -300px;
  margin-left: 525px;
  transition: bottom 1s;

  &.is-show {
    bottom: 10px;
  }

  a {
    display: block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #dadada;
    font-size: 24px;
    background-color: #fff;
    color: #0084ff;

    & + a {
      margin-top: -1px;
    }

    &:hover {
      background-color: #0084ff;
      color: #fff;
    }
  }
}
</style>
