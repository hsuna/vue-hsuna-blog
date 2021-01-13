<template>
  <div class="item-side">
    <div class="side-header">链接归档</div>
    <div class="side-body">
      <template v-if="linkList.length>0">
        <ul class="link-archive">
          <li v-for="(link, index) in linkList" :key="index">
            《<a :href="link.url" target="_blank">{{link.name}}</a>》
          </li>
        </ul>
      </template>
      <template v-else>
        啥都没有，一个懒惰的家伙...
      </template>
    </div>
    <div class="side-footer">
        <div class="text-right">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="linkQuery.page"
            :total="linkTotal"
            :page-size="linkQuery.limit"
            layout="prev, next, slot">
            <span style="line-height: 28px;">{{linkQuery.page}}/{{Math.ceil(linkTotal/linkQuery.limit)}}</span>
          </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
import { ElPagination } from 'element-plus';

import Api from "src/api/blog";

export default {
  components: {
    ElPagination,
  },
  data() {
    return {
      loading: true,
      linkName: "1",
      linkQuery: {
        page: 1,
        limit: 5
      },
      linkTotal: 1,
      linkList: []
    };
  },
  created() {
    this.getLinkList();
  },
  methods: {
    getLinkList() {
      Api.getLink({ params: this.linkQuery }).then(res => {
        if (200 == res.code) {
          let { list, total } = res.data;
          this.linkList = list;
          this.linkTotal = total;
        }
        this.loading = false;
      });
    },
    handleCurrentChange(val) {
      this.linkQuery.page = val;
      this.getLinkList();
    }
  }
};
</script>

<style lang="scss" scoped>
.link-archive {
  li {
    padding: 4px;

    a:hover {
      color: #0084ff;
    }
  }
}
</style>
