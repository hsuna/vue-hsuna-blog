<template>
  <div>
    <div class="profile-header">杂俎大全</div>
    <div class="profile-body">
      <div class="profile-essay" v-for="(profile, index) in profileList" :key="index">
        <div class="essay-header">
          <p class="date">{{profile.createdAt, 'dd' | timeStampFormat}}</p>
          <p>{{profile.createdAt, 'ABBR' | monthFormat}}</p>
        </div>
        <div class="essay-border">
          <span class="arrows"></span>
          <div class="content" v-html="profile.content"></div>
          <div class="files">
            <ul>
              <li v-for="url in profile.files" :key="url" @click="handlePreviewFile(url)">
                <div class="img" :style="`background-image:url(${url});`"></div>
              </li>
            </ul>
          </div>
          <div class="date" :data-date="$filter.timeStampFormat(profile.createdAt)">{{profile.createdAt | timeAgoFormat}}</div>
        </div>
      </div>
    </div>
    <div class="profile-footer">
      <el-pagination background layout="prev, pager, next" v-if="-1 != total"
        :total="total"
        :current-page="curPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
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
.profile-body {
  padding: 10px;
}
.profile-essay {
  position: relative;
  padding: 10px;
  padding-left: 90px;
  margin-bottom: 10px;

  .essay-header {
    position: absolute;
    left: 12px;
    top: 10px;
    width: 56px;
    height: 56px;
    line-height: 1;
    border-radius: 50%;
    text-align: center;
    background-color: #999;
    color: #fff;

    .date {
      font-weight: bold;
      font-size: 24px;
      line-height: 1.2;
      padding-top: 4px;
    }

    &:before {
      content: "";
      display: block;
      position: absolute;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      top: -5px;
      left: -5px;
      border: 1px solid #999;
    }
  }

  .essay-border {
    position: relative;
    padding: 10px 15px;
    border-radius: 4px;
    border: 1px solid #dadada;
    box-shadow: 4px 4px 8px #ccc;

    .arrows,
    .arrows:before {
      content: "";
      display: block;
      position: absolute;
      width: 0;
      height: 0;
      border: 8px solid transparent;
      border-right-width: 12px;
    }

    .arrows {
      top: 15px;
      left: -20px;
      border-right-color: #dadada;

      &:before {
        top: -8px;
        left: -6px;
        border-right-color: #fff;
      }
    }

    .content {
      line-height: 2;
      font-size: 16px;
      word-break: break-all;
    }

    .files li {
      overflow: hidden;
      display: inline-block;
      width: 100px;
      height: 100px;
      margin: 2px;
      padding: 2px;
      border: 1px dotted transparent;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        border-color: #0084ff;
      }

      .img {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center center;
      }
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
