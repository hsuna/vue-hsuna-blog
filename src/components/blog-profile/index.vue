<template>
  <div class="blog-profile">
    <div class="profile-side">
      test
    </div>
    <div class="profile-main">
      <div class="profile-main-card" v-for="profile in profileList" v-bind:key="profile.id">
        <div class="card-title"><a>{{profile.title}}</a></div>
        <div class="card-date">{{profile.publishAt}}</div>
        <div class="card-tags">
          <el-tag size="mini" v-for="tag in profileList.tags" v-bind:key="tag">{{tag}}</el-tag>
        </div>
        <div class="card-content">&nbsp;&nbsp;&nbsp;&nbsp;{{profile.about}}
          <el-button type="text">阅读全文<i class="el-icon-arrow-down"></i></el-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    profileList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.blog-profile {
  .profile-main,
  .profile-side {
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  }

  .profile-main {
    width: 714px;
  }

  .profile-side {
    float: right;
    width: 300px;
  }

  .profile-main-card {
    margin: 0 10px;
    padding: 15px 10px;
    line-height: 1.6;
    border-bottom: 1px solid #dadada;

    .card-title {
      font-size: 24px;
      font-weight: bold;
      color: #1a1a1a;
    }

    .card-date {
      position: absolute;
      top: 24px;
      right: 26px;
    }

    .card-content {
      font-size: 16px;
      word-break: break-all;

      .el-button {
        font-size: 16px;
      }
    }

    .card-tags {
      .tag {
      }
    }
  }
}
</style>
