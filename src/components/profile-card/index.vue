<template>
  <div>
    <div class="profile-card" v-for="profile in profileList" :key="profile.id">
      <div class="card-title"><a :href="`/article.html?id=${profile.id}`">{{profile.title}}</a></div>
      <div class="card-date" :data-date="$filter.timeStampFormat(profile.publishAt)">{{profile.publishAt | timeAgoFormat}}</div>
      <div class="card-tags">
        <span class="card-count">分类：{{profile.classify}}</span>
        <span class="card-count">评论({{profile.commentCount}}) | 浏览({{profile.viewCount}})</span>
        <el-tag size="mini" v-for="tag in profile.tags" :key="tag">{{tag}}</el-tag>
      </div>
      <div class="card-content">&nbsp;&nbsp;&nbsp;&nbsp;{{profile.about}}
        <a :href="`/article.html?id=${profile.id}`">阅读全文<i class="el-icon-arrow-right"></i></a>
      </div>
    </div>
    <el-pagination background　layout="prev, pager, next" v-if="-1 != total"
      :total="total"
      :current-page="curPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script>
export default {
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

  & + .profile-card {
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
    right: 26px;
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

    a {
      padding: 0;
      font-size: inherit;
      color: #0084ff;
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
</style>
