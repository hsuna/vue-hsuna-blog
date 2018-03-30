<template>
  <div class="profile-side">
    <profile-side-hot></profile-side-hot>
    <profile-side-classify></profile-side-classify>
    <profile-side-comment></profile-side-comment>
  </div>
</template>

<script>
import profileSideHot from "./hot";
import profileSideClassify from "./classify";
import profileSideComment from "./comment";

import $api from "api/guest";

export default {
  components: {
    "profile-side-hot": profileSideHot,
    "profile-side-classify": profileSideClassify,
    "profile-side-comment": profileSideComment
  }
};
</script>

<style lang="scss">
@mixin back-shadow {
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
}

.profile-side {
  float: right;
  width: 300px;

  .item-side {
    margin-bottom: 10px;
    padding: 10px;
    @include back-shadow;

    .side-header {
      padding-left: 4px;
      padding-bottom: 4px;
      border-bottom: 1px solid #dadada;
      font-size: 16px;
      font-weight: bold;

      .more {
        float: right;
        padding-top: 4px;
        padding-right: 6px;
        font-size: 12px;
        font-weight: normal;
      }
    }
    .side-body {
      padding: 10px 6px 0;
    }
  }
}
</style>
