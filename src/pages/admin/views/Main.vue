<template>
 <div class="admin">
    <admin-header :routerList="breadcrumbs"></admin-header>
    <div class="admin-body">
      <el-row>
        <el-col :span="24">
          <label class="el-form-item__label" style="width: 100px;">头像：</label>
          <el-upload
            class="portrait-uploader"
            :multiple="false"
            :action="portrait.action"
            :data="portrait.data"
            :headers="fileHeaders"
            :on-success="handleSuccessPortrait"
            :show-file-list="false">
            <img v-if="portrait.url" :src="portrait.url" class="img">
            <i v-else class="el-icon-plus uploader-icon"></i>
          </el-upload>
        </el-col>
        <el-col :span="12">
          <el-form v-if="isEdit" ref="userForm" :model="userForm" label-width="100px">
            <el-form-item label="昵称：">
              <el-input v-model="userForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="职业：">
              <el-input v-model="userForm.job"></el-input>
            </el-form-item>
            <el-form-item label="简介：">
              <el-input type="textarea" v-model="userForm.introduction"></el-input>
            </el-form-item>
          </el-form>
          <el-form v-else label-width="100px">
            <el-form-item label="昵称：">{{user.nickname}}</el-form-item>
            <el-form-item label="职业：">{{user.job}}</el-form-item>
            <el-form-item label="简介：">{{user.introduction}}</el-form-item>
          </el-form>
        </el-col>
        <el-col :span="24">
          <label class="el-form-item__label" style="width: 100px;">背景图：</label>
          <el-upload
            class="banner-uploader"
            :multiple="false"
            :action="banner.action"
            :data="banner.data"
            :headers="fileHeaders"
            :on-success="handleSuccessBanner"
            :show-file-list="false">
            <div v-if="banner.url" :style="`background-image: url(${banner.url})`" class="img"></div>
            <i v-else class="el-icon-plus uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18" style="margin-top: 10px; margin-left: 100px;">
          <template v-if="isEdit">
            <el-button type="primary" @click="handleSubmit"  :loading="submitload">提交</el-button>
            <el-button type="primary" @click="isEdit=false" plain>取消</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="handleEdit">编辑</el-button>
          </template>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ElIcon, ElRow, ElCol, ElUpload, ElForm, ElFormItem, ElButton, ElInput, ElMessage } from 'element-plus';

import AdminHeader from "src/components/admin-header/index.vue";

import Api from "src/api/admin";

export default {
  components: {
    ElRow,
    ElCol,
    ElUpload,
    ElForm,
    ElFormItem,
    ElInput,
    ElButton,

    AdminHeader,
  },
  data() {
    let { userName } = this.$store.getters;
    return {
      isEdit: false,
      submitload: false,
      user: {
        name: userName,
        nickname: "",
        job: "",
        introduction: ""
      },
      userForm: {
        name: userName,
        nickname: "",
        job: "",
        introduction: ""
      },
      portrait: {
        action: Api.postUserUpload(),
        data: {
          userName,
          type: 'portrait'
        },
        url: ""
      },
      banner: {
        action: Api.postUserUpload(),
        data: {
          userName,
          type: 'banner'
        },
        url: ""
      },
      fileHeaders: {
        Authorization: this.$store.getters.token
      },

      breadcrumbs: [{ text: "首页" }]
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      Api.getUserInfo({
          params: {
            userName: this.userForm.name
          }
        })
        .then(res => {
          if (200 == res.code) {
            Object.assign(this.user, res.data);
            this.portrait.url = res.data.portrait || ""
            this.banner.url = res.data.banner || ""
          }
        });
    },
    handleSuccessPortrait(res, file, fileList) {
      if (200 == res.code) {
        ElMessage.success('头像修改成功')
        this.portrait.url = res.data || ""
      }
    },
    handleSuccessBanner(res, file, fileList) {
      if (200 == res.code) {
        ElMessage.success('背景图修改成功')
        this.banner.url = res.data || ""
      }
    },
    handleEdit() {
      this.userForm.nickname = this.user.nickname;
      this.userForm.job = this.user.job;
      this.userForm.introduction = this.user.introduction;
      this.isEdit = true;
    },
    handleSubmit() {
      this.submitload = true;
      Api.putUserInfo(this.userForm).then(res => {
        if (200 == res.code) {
          ElMessage.success('修改用户信息成功')
          Object.assign(this.user, this.userForm);
          this.isEdit = false;
        }
        this.submitload = false;
      });
    }
  },
};
</script>

<style lang="scss">
.admin-body {
  padding: 20px;

  .portrait-uploader,
  .banner-uploader {
    padding-left: 20px;

    .el-upload {
      overflow: hidden;
      position: relative;
      border-radius: 6px;
      border: 1px dashed #d9d9d9;
      cursor: pointer;

      &:hover {
        border-color: #409eff;
      }
    }
    .uploader-icon {
      text-align: center;
      font-size: 28px;
      color: #8c939d;
    }
  }

  .portrait-uploader {
    margin-bottom: 10px;

    .uploader-icon,
    .img {
      display: block;
      width: 100px;
      height: 100px;
      line-height: 100px;
    }
  }
  .banner-uploader {
    .uploader-icon,
    .img {
      width: 614px;
      height: 144px;
      line-height: 144px;
      background-size: cover;
      background-position: center;
    }
  }
}
</style>

