<template>
    <div :class="classes">
        <div class="profile-side__mask" @click="$emit('update:visible', false)"></div>
        <div class="profile-side__wrap">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            defalut: false,
        }
    },
    computed: {
        classes() {
            return [
                'profile-side',
                { 'is-open': this.visible },
            ]

        }
    }
}
</script>

<style lang="scss">
.profile-side {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);

  &__mask {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .item-side {
    margin-bottom: 10px;
    padding: 10px;

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

    .side-footer {
      margin-top: 10px;
      padding-top: 4px;
      border-top: 1px solid #dadada;
    }
  }
}


@media screen and (max-width: 750px) {
  .profile-side {
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 9999;

    &__wrap {
        position: relative;
        z-index: 3;
        padding: 15px 10px;
        background: #fff;
        height: 100%;
    }

    &.is-open {
      display: block;

      .profile-side__wrap {
        animation: profile-side__wrap .3s ease-out;
      }

      .profile-side__mask {
        display: block;
        animation: profile-side__mask .3s ease-out;
      }
    }
  }
}

@keyframes profile-side__wrap {
  0% { transform: translateX(300px); }
100% { transform: translateX(0); }
}

@keyframes profile-side__mask {
    0% { opacity: 0; }
  100% { opacity: 1; }
}
</style>
