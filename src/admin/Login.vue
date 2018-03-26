<template>
  <div class="login-container">
    <el-form :model="user" :rules="rules" ref="user" label-position="left" label-width="0px" v-loading="loadingflag" element-loading-text="页面跳转中">
     <h3 class="title">欢迎登录后台管理系统</h3>
     <el-form-item prop="name">
       <el-input type="text" v-model="user.name" auto-complete="off" placeholder="账号"></el-input>
     </el-form-item>
     <el-form-item prop="password">
       <el-input type="password" v-model="user.password" auto-complete="off" placeholder="密码"></el-input>
     </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">登录</el-button>
         <el-button type="primary" @click="$router.push({path: '/backend/reg'})">注册</el-button>
      </el-form-item>
  </el-form>
</div>
</template>

<script>
import $api from "api/admin";

export default {
  data() {
    //自定义验证函数
    // 返回的数据
    return {
      loadingflag: false,

      user: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.loadingflag = true;
      this.$refs.user.validate(valid => {
        if (valid) {
          this.$http.post($api.postLogin, this.user).then(data => {
            this.loadingflag = false;
            if (200 == data.code) {
              this.$store.dispatch("userLogin", {
                token: data.token,
                name: this.user.name
              });
              this.$message({
                message: data.message,
                type: "success"
              });
              this.$router.replace({ path: "/admin" });
            }
          });
        } else {
          this.loadingflag = false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -200px;
  margin-top: -150px;
  padding: 10px 20px;
  width: 400px;
  text-align: center;
  box-shadow: 0 0 1px #ccc;

  .title {
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 24px;
  }
}
</style>
