<template>
  <div>
    <div class="profile-header">杂俎大全</div>
    <div class="profile-essay" v-for="(profile, index) in profileList" :key="index">
      <div class="essay-date" :data-date="$filter.timeStampFormat(profile.publishAt)">{{profile.publishAt | timeAgoFormat}}</div>
      <div class="essay-content">{{profile.content}}</div>
      <div class="essay-files">
        <ul>
          <li v-for="url in profile.files" :key="url" @click="handlePreviewFile(url)">
            <img width="100%" height="100%" :src="url" alt="">
          </li>
        </ul>
      </div>
    </div>
    <el-pagination background layout="prev, pager, next" v-if="-1 != total"
      :total="total"
      :current-page="curPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange">
    </el-pagination>
    <el-dialog :visible.sync="dialogImageVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageVisible: false,
      dialogImageUrl: ""
    };
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
    handlePreviewFile(url) {
      this.dialogImageUrl = url;
      this.dialogImageVisible = true;
    },
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
.profile-header {
  padding: 10px 15px;
  font-size: 24px;
  border-bottom: 1px solid #dadada;
  color: #2b3f52;
}
.profile-essay {
  position: relative;
  margin: 0 20px;
  padding: 20px 10px;
  line-height: 1.6;

  & + .profile-essay {
    border-top: 1px solid #dadada;
  }

  .essay-title {
    font-size: 24px;
    font-weight: bold;
    color: #1a1a1a;

    a {
      text-decoration: none;
    }
  }

  .essay-date {
    position: absolute;
    top: 28px;
    right: 26px;
  }

  .essay-tags {
    padding-top: 5px;
  }

  .essay-count {
    margin-right: 10px;
    color: #999;
  }

  .essay-content {
    padding-top: 10px;
    line-height: 2;
    font-size: 16px;
    word-break: break-all;

    .el-button {
      padding: 0;
      font-size: inherit;
    }
  }

  .essay-tags {
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
