<template>
  <div>
    <div class="profile-card" v-for="profile in profileList" :key="profile.id">
      <div class="card-title">
        <a :href="`/article.html?id=${profile.id}`">{{ profile.title }}</a>
      </div>
      <div class="card-date" :data-date="timeStampFormat(profile.publishAt)">
        {{ timeAgoFormat(profile.publishAt) }}
      </div>
      <div class="card-tags">
        <span class="card-count">分类：{{ profile.classify?.title || '' }}</span>
        <span class="card-count">评论({{ profile.comments?.length || 0 }}) | 浏览({{ profile.viewCount }})</span>
        <el-tag size="mini" v-for="tag in profile.tags" :key="tag">{{ tag }}</el-tag>
      </div>
      <div class="card-content clearfix">
        <span v-html="`&nbsp;&nbsp;&nbsp;&nbsp;${profile.about}`"></span>
        <a :href="`/article.html?id=${profile.id}`">阅读全文<i class="el-icon-arrow-right"></i></a>
      </div>
    </div>
    <el-pagination v-if="-1 != total" layout="prev, pager, next" :background="true" :total="total" :current-page="curPage"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import { ElIcon, ElPagination, ElTag } from 'element-plus';

import { timeStampFormat, timeAgoFormat } from 'src/utils/date.js'

export default {
  components: {
    ElPagination,
    ElTag,
  },
  props: {
    curPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: -1
    },
    profileList: {
      type: Array,
      default: _ => []
    }
  },
  methods: {
    // 过滤器：filters
    timeStampFormat,
    timeAgoFormat,
    //////////////////////////////
    handleSizeChange(val) {
      this.$emit("change", "size", val);
    },
    handleCurrentChange(val) {
      this.$emit("change", "page", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.profile-card {
  position: relative;
  margin: 0 20px;
  padding: 20px 10px;
  line-height: 1.6;

  &+.profile-card {
    border-top: 1px solid #dadada;
  }

  .card-title {
    padding-right: 80px;
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
    right: 10px;
  }

  .card-tags {
    padding-top: 5px;
  }

  .card-count {
    margin-right: 10px;
    color: #999;
  }

  .card-content {
    padding-top: 10px;
    line-height: 2;
    font-size: 16px;
    word-break: break-all;
    text-align: justify;

    a {
      float: right;
      padding: 0;
      font-size: inherit;
      color: #0084ff;
      background: #fff;
    }
  }

  .card-tags {
    .el-tag {
      margin-right: 5px;
    }
  }
}

.el-pagination {
  margin-top: 15px;
  padding: 10px;
  border-top: 1px solid #dadada;
  text-align: center;
}

@media screen and (max-width: 750px) {
  .profile-card {
    padding-bottom: 30px;

    .card-title {
      text-align: justify;
      padding-right: 0;
    }

    .card-date {
      top: auto;
      bottom: 5px;
      right: auto;
      color: #bbb;
    }
  }
}
</style>
