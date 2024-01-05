<template>
  <div class="profile-main" v-loading="loading">
    <div class="profile-main__wrap">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-main {
  flex: 1;
  min-width: 0;
  margin-right: 10px;

  &__wrap {
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  }
}


@media screen and (max-width: 750px) {
  .profile-main~* {
    display: none;
  }
}
</style>
