<template>
  <div class="profile-main" v-loading="loading">
    <div class="profile-main-card" v-for="profile in profileList" :key="profile.id">
      <div class="card-title"><a :href="`/article/${profile.id}`">{{profile.title}}</a></div>
      <div class="card-date" :data-date="$filter.timeStampFormat(profile.publishAt)">{{profile.publishAt | timeAgoFormat}}</div>
      <div class="card-tags">
        <el-tag size="mini" v-for="tag in profile.tags" :key="tag">{{tag}}</el-tag>
        <span class="card-count">{{profile.comments?profile.comments.length:0}} 评论 / {{profile.viewCount}} 浏览</span>
      </div>
      <div class="card-content">&nbsp;&nbsp;&nbsp;&nbsp;{{profile.about}}
        <el-button type="text" @click="$router.push(`/article/${profile.id}`)">阅读全文<i class="el-icon-arrow-right"></i></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import $api from "api/guest";

export default {
  data() {
    return {
      loading: true,
      profileList: []
    };
  },
  created() {
    this.getProfileList(this.$route.query);
  },
  watch: {
    $route(to, from) {
      this.getProfileList(this.$route.query);
    }
  },
  methods: {
    getProfileList(query) {
      this.$http.get($api.getArticle, { params: query }).then(res => {
        if (200 == res.code) {
          this.profileList = res.data.list;
          if (!query) {
            this.articleCount = res.data.total;
          }
        }
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin back-shadow {
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}

.profile-main {
  @include back-shadow;
}

.profile-main {
  width: 710px;
}

.profile-main-card {
  position: relative;
  margin: 0 20px;
  padding: 20px 10px;
  line-height: 1.6;
  border-bottom: 1px solid #dadada;

  .card-title {
    font-size: 24px;
    font-weight: bold;
    color: #1a1a1a;

    a {
      text-decoration: none;
    }
  }

  .card-date {
    position: absolute;
    top: 28px;
    right: 26px;
  }

  .card-tags {
    padding-top: 5px;
  }

  .card-count {
    color: #999;
  }

  .card-content {
    padding-top: 10px;
    line-height: 2;
    font-size: 16px;
    word-break: break-all;

    .el-button {
      padding: 0;
      font-size: inherit;
    }
  }

  .card-tags {
    .el-tag {
      margin-right: 5px;
    }
  }
}
</style>
