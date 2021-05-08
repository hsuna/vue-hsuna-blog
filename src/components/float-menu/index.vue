<template>
    <div class="float-menu">
        <a class="menu" href="/" title="首页" v-if="isShowMenuByName('home')"><i class="fa fa-home"></i></a>
        <a class="menu" href="/archive.html" title="档案" v-if="isShowMenuByName('archive')"><i class="fa fa-archive"></i></a>
        <a class="menu" href="/about.html" title="关于" v-if="isShowMenuByName('about')"><i class="fa fa-user"></i></a>
        <a class="menu" href="/essay.html" title="手札" v-if="isShowMenuByName('essay')"><i class="fa fa-pencil"></i></a>
        <a href="javascript:;" title="返回顶部" @click="handleBackTop"><i class="fa fa-arrow-up"></i></a>
    </div>
</template>

<script>
import { params } from 'src/utils/search.js'
import storage, { StorageKey } from 'src/utils/storage.js'

export default {
  name: 'float-menu',
  data() {
    return {};
  },
  methods: {
    isShowMenuByName(name) {
      return name !== params('name')
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
    background-color: #fff;
    text-decoration: none;
    color: #0084ff;

    .fa{
      font-size: 24px;
    }

    & + a {
      margin-top: -1px;
    }

    &:hover {
      background-color: #0084ff;
      color: #fff;
    }
  }
}

@media screen and (max-width: 750px) {
  .float-menu {
    left: auto;
    right: 20px;
    margin-left: 0;

    &.is-show {
      bottom: 50px;
    }

    a {
      border-radius: 50%;

      &:hover {
        background-color: #fff;
        color: #0084ff;
      }
    }

    .menu {
      display: none;
    }
  }
}
</style>
