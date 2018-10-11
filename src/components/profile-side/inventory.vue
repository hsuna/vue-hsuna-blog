<template>
  <div class="item-side">
    <div class="side-header">学习清单</div>
    <div class="side-body" v-loading="loading">
      <template v-if="inventoryList.length>0">
        <el-collapse v-model="inventoryName" class="inventory-achive">
          <el-collapse-item v-for="(inventory, index) in inventoryList" :key="index" :name="index" :title="inventory.title">
            {{inventory.content}}
          </el-collapse-item>
        </el-collapse>
      </template>
      <template v-else>
        啥都没有，一个懒惰的家伙...
      </template>
    </div>
    <div class="side-footer">
        <div class="text-right">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="inventoryQuery.page"
            :total="inventoryTotal"
            :page-size="inventoryQuery.limit"
            layout="prev, next, slot">
            <span style="line-height: 28px;">{{inventoryQuery.page}}/{{Math.ceil(inventoryTotal/inventoryQuery.limit)}}</span>
          </el-pagination>
        </div>
    </div>
  </div>
</template>

<script>
import $api from "api/blog";

export default {
  data() {
    return {
      loading: true,
      inventoryName: "1",
      inventoryQuery: {
        page: 1,
        limit: 5
      },
      inventoryTotal: 1,
      inventoryList: []
    };
  },
  created() {
    this.getInventoryList();
  },
  methods: {
    getInventoryList() {
      this.$http
        .get($api.getInventory, { params: this.inventoryQuery })
        .then(res => {
          if (200 == res.code) {
            let { list, total } = res.data;
            this.inventoryList = list;
            this.inventoryTotal = total;
          }
          this.loading = false;
        });
    },
    handleCurrentChange(val) {
      this.inventoryQuery.page = val;
      this.getInventoryList();
    }
  }
};
</script>

<style lang="scss" scoped>
.side-body {
  padding-top: 0 !important;

  .inventory-achive {
    border-top-width: 0;
    border-bottom-width: 0;
  }
}
.side-footer {
  margin-top: 0 !important;
}
</style>
