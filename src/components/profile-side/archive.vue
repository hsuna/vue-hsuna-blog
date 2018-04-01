<template>
  <div class="item-side">
    <div class="side-header">文章归档</div>
    <div class="side-body">
      <ul class="article-achive">
        <li v-for="(archive, index) in archiveList" :key="index">
          <a href="javascrip:;" :class="archiveIndex==index?'is-active':''" @click="handleArchive(archive, index)">{{archive.year}}年{{archive.month}}月</a>
          <span class="count">({{archive.count}})</span>
        </li>
      </ul>
      <!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" accordion></el-tree> -->
    </div>
  </div>
</template>

<script>
import $api from "api/guest";

export default {
  data() {
    return {
      archiveIndex: -1,
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
          if (this.archiveList.length > 0) {
            this.handleArchive(this.archiveList[0], 0);
          }
        }
      });
    },
    handleArchive(archive, index) {
      this.$emit("search", archive);
      this.archiveIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.article-achive {
  li {
    padding: 4px;

    a:hover {
      color: #0084ff;
    }

    a.is-active {
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

    .count {
      float: right;
      color: #b3b3b3;
    }
  }
}
</style>
