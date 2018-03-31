<template>
  <div class="item-side">
    <div class="side-header">
      最新留言
      <!-- <a href="/comment" class="more">更多<i class="fa fa-angle-double-right"></i></a> -->
    </div>
    <div class="side-body">
      <template v-if="commentList.length>0">
        <ul class="new-comment">
          <li>
            <p><span class="name">sdfsf</span><span class="time">1天前</span></p>
            <p class="content">sdfsdfsdfs</p>
          </li>
        </ul>
      </template>
      <template v-else>
        不说话的路人们...
      </template>
    </div>
  </div>
</template>

<script>
import $api from "api/guest";

export default {
  data() {
    return {
      commentList: []
    };
  },
  created() {
    this.getArticleNewComment();
  },
  methods: {
    getArticleNewComment() {
      this.$http.get($api.getArticleNewComment).then(res => {
        if (200 == res.code) {
          this.commentList = res.data;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.new-comment {
  color: #999;

  li {
    padding-top: 6px;
    padding-bottom: 6px;

    & + li {
      border-top: 1px dashed #eee;
    }

    .name {
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }
    .time {
      float: right;
    }
    .content {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
