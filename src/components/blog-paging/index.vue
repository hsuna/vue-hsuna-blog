<template>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paging.page"
        :page-size="paging.limit"
        :page-sizes="[10, 20, 50, 100]"
        :layout="layout"
        :total="paging.total">
    </el-pagination>
</template>

<script>
import { ElPagination } from 'element-plus'

export default {
  components: {
    ElPagination,
  },
  props: {
    layout: {
      type: String,
      default: "sizes, prev, pager, next"
    },
    paging: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  created() {
    this.$emit('update')
  },
  methods: {
    handleSizeChange(val) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: 1,
          limit: val
        }
      })
      this.$emit('update')
    },
    handleCurrentChange(val) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: val
        }
      })
      this.$emit('update')
    }
  },
};
</script>


<style lang="scss">
</style>
