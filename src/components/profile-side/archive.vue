<template>
  <div class="item-side">
    <div class="side-header">文章归档</div>
    <div class="side-body">
      <ul class="article-achive">
        <li v-for="(archive, index) in archiveList" :key="index">
          <span :class="archiveIndex==index?'is-active':''" @click="handleArchive(archive, index)">{{archive.year}}年{{archive.month}}月</span>
          <em class="count">({{archive.count}})</em>
        </li>
      </ul>
      <!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" accordion></el-tree> -->
    </div>
  </div>
</template>

<script>
import $api from "src/api/blog";

export default {
  props: {
    archiveIndex: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      archiveList: []
    };
  },
  created() {
    this.getAchiveCount();
  },
  methods: {
    getAchiveCount() {
      this.$http.get($api.getAchiveCount).then(res => {
        if (200 == res.code) {
          this.archiveList = res.data.map(group => {
            let { _id: { year, month }, count } = group;
            return { year, month, count };
          });
          this.$emit("init", this.archiveList);
        }
      });
    },
    handleArchive(archive, index) {
      this.$emit("search", archive);
    }
  }
};
</script>

<style lang="scss" scoped>
.article-achive {
  li {
    padding: 4px;

    span{
      cursor: pointer;

      &:hover {
        color: #0084ff;
      }
  
      &.is-active {
        position: relative;
        font-weight: bold;
        text-decoration: none;
        color: #0084ff;
  
        &:after {
          content: "";
          display: block;
          position: absolute;
          top: 5px;
          left: -8px;
          border: 4px solid #0084ff;
          border-color: transparent transparent transparent #0084ff;
        }
      }
    }


    .count {
      float: right;
      font-style: normal;
      color: #b3b3b3;
    }
  }
}
</style>
