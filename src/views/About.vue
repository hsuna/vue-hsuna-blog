<template>
    <div class="blog-body">
      <div class="blog-profile">
        <div class="profile-side">
          <profile-side-hot></profile-side-hot>
          <profile-side-classify></profile-side-classify>
          <profile-side-about></profile-side-about>
        </div>
        <div class="profile-main">
          <div class="about-header">关于我</div>
          <div class="about-body">
            <h4 id="aboutIntroduce">简介</h4>
            <p>某世界闻名的陶瓷大学2016届毕业生，目前在杭州从事前端开发工作，也是一枚PPT爱好者。所知甚少，唯善学。常以轩辕Rowboat为名混迹于江湖。</p>
            <h4 id="aboutHistory">前端历程</h4>
            <p>sdfsdf<a>sdfsdf</a></p>
            <h4 id="aboutContact">联系我</h4>
            <p>sdfsfs<a>sdfsdfs</a>df</p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {
  profileSideAbout,
  profileSideHot,
  profileSideClassify
} from "components/profile-side";

export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {
    "profile-side-about": profileSideAbout,
    "profile-side-hot": profileSideHot,
    "profile-side-classify": profileSideClassify
  }
};
</script>

<style lang="scss" scoped>
.about-header {
  padding: 10px 15px;
  font-size: 24px;
  border-bottom: 1px solid #dadada;
  color: #2b3f52;
}
.about-body {
  padding: 24px;
  h4 {
    line-height: 28px;
    font-size: 18px;
  }

  p {
    margin-top: 10px;
    margin-bottom: 20px;

    code {
      color: #0084ff;
      line-height: 1;
      margin: 0 4px;
      font-size: 80%;
      padding: 3px 5px;
      border-radius: 2px;
      word-wrap: break-word;
    }

    a {
      color: #0084ff;
      border-bottom: 1px dotted #68b5fd;
      word-break: break-all;

      &:hover {
        border-bottom-style: solid;
        text-decoration: none;
      }
    }
  }
}
</style>
