<template>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagin.page"
        :page-size="pagin.limit"
        :page-sizes="[10, 20, 50, 100]"
        layout="sizes, prev, pager, next"
        :total="articleTotal">
    </el-pagination>
</template>

<script>

export default {
  props: {
    pagin: {
        type: Object,
        default: {
            page: 1,
            limit: 10,
            total
        }
    }
  },
  data() {
    return {
        
    };
  },
  created() {
    let { page=1, limit=10 } = this.$route.query
  },
  methods: {
    handleSizeChange() {
    },
    handleCurrentChange() {
    }
  },
  components: {
  
  }
};
</script>


<style lang="scss">
</style>
