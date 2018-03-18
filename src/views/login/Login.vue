<template>
  <div class="container">
    <el-form :model="user" :rules="rules" ref="user" label-position="left" label-width="0px" v-loading="loadingflag" element-loading-text="页面跳转中">
     <h3 class="title">欢迎登录后台管理系统</h3>
     <el-form-item prop="name">
       <el-input type="text" v-model="user.name" auto-complete="off" placeholder="账号"></el-input>
     </el-form-item>
     <el-form-item prop="passwork">
       <el-input type="password" v-model="user.passwork" auto-complete="off" placeholder="密码"></el-input>
     </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">登录</el-button>
         <el-button type="primary" @click="$router.push({path: '/backend/reg'})">注册</el-button>
      </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  data() {
    //自定义验证函数
    // 返回的数据
    return {
      loadingflag: false,

      user: {
        name: "",
        passwork: ""
      },
      rules: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        passwork: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit(){

    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -150px;
  padding: 10px 20px;
  width: 400px;
  text-align: center;
  box-shadow: 0 0 1px #ccc;
}
</style>
