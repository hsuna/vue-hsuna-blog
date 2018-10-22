<template>
  <div class="item-side">
    <div class="side-header">
      <a href="http://weibo.com/" target="_blank" class="icon"><i class="fa fa-weibo" style="background-color: rgb(221, 75, 57);"></i></a>
      <a href="https://github.com/hsuna" target="_blank" class="icon"><i class="fa fa-github" style="background-color: rgb(85, 172, 238);"></i></a>
      <a href="mailto:me@hsuna.com" target="_blank" class="icon"><i class="fa fa-envelope" style="background-color: rgb(59, 89, 152);"></i></a>
      <a href="http://resume.hsuna.com" target="_blank" class="icon"><i class="fa fa-address-card-o" style="background-color: rgb(128, 185, 83);"></i></a>
    </div>
    <div class="side-body">
      <ul>
        <li>1、<a href="#aboutIntroduce">简介</a></li>
        <li>2、<a href="#aboutHistory ">技能清单</a></li>
        <li>3、<a href="#aboutContact">联系我</a></li>
        <li>4、<a href="#aboutSkill">博客技术栈</a></li>
        
      </ul>
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

<style lang="scss" scoped>
.side-header {
  padding: 4px 2px 8px !important;

  .icon {
    display: inline-block;
    margin-left: 5px;
    text-decoration: none;
  }
  .fa {
    display: block;
    width: 32px;
    line-height: 32px;
    border-radius: 4px;
    font-size: 20px;
    font-weight: normal;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.1);
    color: #fff;
  }
}
.side-body {
  li {
    padding: 4px 10px;
  }
}
</style>
