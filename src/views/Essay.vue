<template>
    <div class="blog-body">
      <div class="blog-profile">
        <div class="profile-side">
          <profile-side-link></profile-side-link>
          <profile-side-inventory></profile-side-inventory>
        </div>
        <div class="profile-main" v-loading="loading">
          <profile-essay
            :curPage="Number($route.params.page || 1)"
            :total="archiveTotal">
          </profile-essay>
        </div>
      </div>
    </div>
</template>

<script>
import profileEssay from "components/profile-essay";
import { profileSideInventory, profileSideLink } from "components/profile-side";

import $api from "api/guest";

export default {
  data() {
    return {
      loading: false,
      archiveTotal: 0,
      archiveList: []
    };
  },
  created() {

  },
  watch: {

  },
  methods: {
  },
  components: {
    "profile-essay": profileEssay,
    "profile-side-inventory": profileSideInventory,
    "profile-side-link": profileSideLink
  }
};
</script>

<style lang="scss">

</style>
