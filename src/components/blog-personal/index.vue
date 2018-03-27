<template>
  <div class="blog-personal">
    <div class="personal-top" :style="`background-image:url(${background})`"></div>
    <div class="personal-bottom">
      <div class="user-portrait">
        <img src="/static/images/20180326140219.jpg" alt="portrait" width="100%" height="100%" />
      </div>
      <div class="user-info clearfix">
        <span class="name">Hsuna</span>WEB前端工程师
        <div class="social">
          <a class="icon" href="http://weibo.com/" target="_blank" ><i class="fa fa-weibo" style="background-color: rgb(221, 75, 57);"></i></a>
          <a class="icon" href="https://github.com/hsuna" target="_blank" ><i class="fa fa-github" style="background-color: rgb(85, 172, 238);"></i></a>
          <a class="icon" href="mailto:me@hsuna.com" target="_blank" ><i class="fa fa-envelope" style="background-color: rgb(59, 89, 152);"></i></a>
          <a class="icon" href="http://resume.hsuna.com" target="_blank" ><i class="fa fa-address-card-o" style="background-color: rgb(128, 185, 83);"></i></a>
        </div>
        <el-popover ref="popover1" placement="bottom" title="标题" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"></el-popover>
      </div>
      <div class="user-classify">
        <div class="tag-inner">
          <el-tag @click.native="handleClassify()">全部<span class="tag-count" v-show="articleCount>0">{{articleCount}}</span></el-tag>
          <el-tag v-for="item in classifyList" :key="item._id" @click.native="handleClassify(item._id)">{{item._id}}<span class="tag-count">{{item.count}}</span></el-tag>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    articleCount: {
      type: Number,
      default: 0
    },
    classifyList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      background: "/static/images/20180327230952.jpg"
    };
  },
  created() {},
  methods: {
    handleClassify(classify) {
      this.$emit("click-classify", classify);
    }
  }
};
</script>

<style lang="scss">
.blog-personal {
  margin: 10px 0;
  padding-bottom: 1px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);

  .personal-top {
    height: 240px;
    background-size: cover;
    background-position: center;
  }

  .personal-bottom {
    position: relative;
    min-height: 90px;
    padding-left: 180px;
    margin: 0 20px 24px;
  }

  .user-portrait {
    overflow: hidden;
    position: absolute;
    top: -70px;
    left: 0;
    width: 160px;
    height: 160px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  }

  .user-info {
    padding: 15px 0 5px 10px;

    .name {
      margin-right: 10px;
      font-size: 20px;
      font-weight: bold;
    }

    .social {
      float: right;
      .icon {
        display: inline-block;
        margin-left: 5px;
        text-decoration: none;
      }
      .fa {
        font-size: 20px;
        width: 32px;
        line-height: 32px;
        border-radius: 50%;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.1);
        text-align: center;
      }
    }
  }

  .user-classify {
    position: relative;

    .tag-inner {
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      height: 38px;
      background: #fff;
      border-radius: 4px;

      &:hover {
        height: auto;
        padding-bottom: 10px;
      }
    }

    .el-tag {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      margin: 6px;
      padding: 0 15px;
      border-radius: 15px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      background-color: transparent;
      font-size: 14px;
      color: gray;
      cursor: pointer;

      .tag-count {
        margin-left: 3px;
        color: #b3b3b3;
      }

      &:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
}
</style>
