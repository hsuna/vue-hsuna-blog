<template>
  <div id="app" style="height: 100%;">
   <div class="blog-body">
      <div class="blog-profile">
        <div class="profile-side">
          <profile-side-hot></profile-side-hot>
          <profile-side-about></profile-side-about>
        </div>
        <div class="profile-main">
          <div class="about-header">关于我</div>
          <div class="about-body">
            <!-- 简介 -->
            <h4 id="aboutIntroduce">简介</h4>
            <p>陈阳志 男 91年天秤座一枚 毕业于2013.6</p>
            <p>重度强迫症码农，浅度流浪型驴友</p>

            <!-- 技能清单 -->
            <h4 id="aboutHistory">技能清单</h4>
            <ul>
              <li>
                <h5>前端</h5>
                <p>HTLM/HTML5, Javascript, ES6, css/css3, scss/sass</p>
                <p>jQuery, bootstrap, Requirejs, angularjs, vue/vue-cli</p>
              </li>
              <li>
                <h5>后端</h5>
                <p>dos, shell, nodejs/koa2, mongoose/sequelize, python</p>
              </li>
              <li>
                <h5>数据库</h5>
                <p>mongodb, mysql</p>
              </li>
              <li>
                <h5>代码管理及自动化工具</h5>
                <p>git/svn, gulp, webpack</p>
              </li>
            </ul>

            <!-- 联系我 -->
            <h4 id="aboutContact">联系我</h4>
            <p><strong>个人邮箱：</strong><a href="mailto:me@hsuna.com" alt="个人邮箱">me@hsuna.com</a></p>
            <p><strong>个人简历：</strong><a href="http://resume.hsuna.com" alt="个人简历">http://resume.hsuna.com</a></p>
            <p><strong>Github：</strong><a href="https://github.com/hsuna" alt="github">https://github.com/hsuna</a></p>

            <!-- 博客技术栈 -->
            <h4 id="aboutSkill">博客技术栈</h4>
            <ul>
              <li>
                <h5>前端</h5>
                <p>vue, vue-router, axios, vuex</p>
                <p>element-ui, markdown, highlight, webpack</p>
              </li>
              <li>
                <h5>后端</h5>
                <p>express, mongoose, mongodb</p>
                <p>bcryptjs, jsonwebtoken</p>
              </li>
              <li>
                <h5>Github：</h5>
                <p><a href="https://github.com/hsuna/vue-hsuna-blog" alt="github">https://github.com/hsuna/vue-hsuna-blog</a></p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { profileSideAbout, profileSideHot } from "components/profile-side";

export default {
  name: "App",
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {
    "profile-side-about": profileSideAbout,
    "profile-side-hot": profileSideHot
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
    margin-top: 30px;
    line-height: 28px;
    font-size: 20px;

    &:first-child {
      margin-top: 0;
    }
  }

  p {
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 25px;
    font-size: 16px;

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

  ul {
    padding-left: 25px;

    li {
      list-style: circle;
      h5 {
        margin-top: 20px;
        margin-bottom: 10px;
        line-height: 20px;
        font-size: 18px;
      }
    }

    p {
      margin-top: 5px;
      margin-bottom: 5px;
      padding-left: 0;
    }
  }
}
</style>