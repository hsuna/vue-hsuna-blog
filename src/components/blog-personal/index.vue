<template>
  <div class="blog-personal">
    <div class="personal-top">
    </div>
    <div class="personal-bottom">
      <div class="user-portrait">
        <img src="/static/images/WeChat Image_20180326140219.jpg" alt="portrait" width="100%" height="100%" />
      </div>
      <p class=""><span class="user-name">Hsuna</span>WEB前端工程师</p>
      <p class=""></p>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss">
.blog-personal {
  margin: 10px 0;
  padding-bottom: 1px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);

  .personal-top {
    height: 132px;
  }

  .personal-bottom {
    position: relative;
    min-height: 90px;
    padding-left: 180px;
    margin: 0 20px 24px;

    .user-portrait {
      overflow: hidden;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 160px;
      height: 160px;
      border-radius: 4px;
    }
    .user-name {
      margin-right: 10px;
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
