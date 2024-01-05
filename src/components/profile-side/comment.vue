<template>
  <div class="item-side">
    <div class="side-header">
      最新留言
      <!-- <a href="/comment" class="more">更多<i class="fa fa-angle-double-right"></i></a> -->
    </div>
    <div class="side-body">
      <template v-if="commentList.length > 0">
        <ul class="new-comment">
          <li v-for="comment in commentList" :key="comment.id">
            <p>
              <a class="name" :href="`/article.html?id=${comment.articleId}#c-${comment.id}`">{{ comment.name }}</a>
              <span class="time">{{ timeAgoFormat(comment.createdAt) }}</span>
            </p>
            <p class="content">{{ comment.content }}</p>
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
import { timeAgoFormat } from 'src/utils/date'

import Api from "src/api/blog";

export default {
  data() {
    return {
      commentList: []
    };
  },
  created() {
    this.getNewComment();
  },
  methods: {
    // 过滤器：filters
    timeAgoFormat,
    //////////////////////////////
    getNewComment() {
      Api.getCommentNew().then(res => {
        if (200 == res.statusCode) {
          this.commentList = res.data?.rows || [];
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

    &+li {
      border-top: 1px dashed #eee;
    }

    .name {
      font-size: 16px;
      font-weight: bold;
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
