<template>
  <div class="item-side">
    <div class="side-header">文章归档</div>
    <div class="side-body">
      <ul class="article-achive">
        <li v-for="(archive, index) in archiveList" :key="index">
          <span :class="archiveSelect.year == archive.year && archiveSelect.month == archive.month ? 'is-active' : ''"
            @click="handleArchive(archive, index)">{{ archive.year
            }}年{{ archive.month }}月</span>
          <em class="count">({{ archive.count }})</em>
        </li>
      </ul>
      <!-- <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" accordion></el-tree> -->
    </div>
  </div>
</template>

<script>
import Api from "src/api/blog";

export default {
  props: {
    archiveIndex: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      archiveSelect: {},
      archiveList: []
    };
  },
  created() {
    this.getAchiveCount();
  },
  methods: {
    async getAchiveCount() {
      const res = await Api.getAchiveCount();
      if (200 == res.statusCode) {
        this.archiveList = res.data || [];
        this.handleArchive({
          init: true,
          ...this.archiveList[0],
          ...this.$route.query,
        })
      }
    },
    handleArchive(archive) {
      this.archiveSelect = { ...archive };
      this.$emit("change", archive);
    }
  }
};
</script>

<style lang="scss" scoped>
.article-achive {
  li {
    padding: 4px;

    span {
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
