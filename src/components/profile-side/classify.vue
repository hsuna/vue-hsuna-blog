<template>
  <div class="item-side">
    <div class="side-header">文章分类</div>
    <div class="side-body">
      <template v-if="classifyList.length>0">
        <ul class="article-classify clearfix">
          <li v-for="item in classifyList" :key="item._id">
            <a href="javascript:;"  @click="$filter.goUrl({ path: `/?classify=${item._id}` })"><span class="count">{{item.count}}篇</span>{{item._id}}</a>
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
import $api from "api/guest";

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
    getClassifyCount() {
      this.$http.get($api.getClassifyCount).then(res => {
        if (200 == res.code) {
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
