<template>
  <div class="item-side">
    <div class="side-header">文章分类</div>
    <div class="side-body">
      <template v-if="classifyList.length > 0">
        <ul class="article-classify clearfix">
          <li v-for="item in classifyList" :key="item.id">
            <a href="javascript:;" @click="handlerClick(item)"><span class="count">{{ item.count }}篇</span>{{ item.title
              }}</a>
          </li>
        </ul>
      </template>
      <template v-else>
        一个没有强迫症的家伙...
      </template>
    </div>
  </div>
</template>

<script>
import Api from "src/api/blog";

export default {
  data() {
    return {
      classifyList: []
    };
  },
  created() {
    this.getClassifyCount();
  },
  methods: {
    handlerClick(item) {
      this.$router.push({ path: '/', query: { classifyId: item.id } });
    },
    getClassifyCount() {
      Api.getClassifyCount().then(res => {
        if (200 == res.statusCode) {
          this.classifyList = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.article-classify {
  a {
    display: block;
    padding: 4px;

    .count {
      float: right;
      color: #b3b3b3;
    }
  }
}
</style>
