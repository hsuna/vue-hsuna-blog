<template>
  <div class="blog-profile">
    <div class="profile-side">
      <div class="item-side">
        <div class="side-header">热门文章</div>
        <div class="side-body">
          <template v-if="hotArticleList.length>0">
            <ul class="hot-article">
              <li v-for="article in hotArticleList" :key="article.id">
                &middot;
                <a :href="`/article/${article.id}`">{{article.title}}</a>
                <span class="time">{{article.publishAt, 'yyyy年MM月dd日' | timeStampFormat}}</span>
              </li>
            </ul>
          </template>
          <template v-else>
            这家伙太懒了，啥都没有留下来～
          </template>
        </div>
      </div>
      <div class="item-side">
        <div class="side-header">文章分类</div>
        <div class="side-body">
          <template v-if="classifyList.length>0">
            <ul class="article-classify clearfix">
              <li v-for="item in classifyList" :key="item._id">
                <a href="javascript:;"  @click.native="$emit('click-classify', item._id)"><span class="count">{{item.count}}篇</span>{{item._id}}</a>
              </li>
            </ul>
          </template>
          <template v-else>
            一个没有强迫症的家伙...
          </template>
        </div>
      </div>
      <div class="item-side">
        <div class="side-header">
          最新留言
          <a href="/comment" class="more">更多<i class="fa fa-angle-double-right"></i></a>
        </div>
        <div class="side-body">
          <template v-if="commentList.length>0">
            <ul class="new-comment">
              <li>
                <p><span class="name">sdfsf</span><span class="time">1天前</span></p>
                <p class="content">sdfsdfsdfs</p>
              </li>
                <li>
                <p><span class="name">sdfsf</span><span class="time">1天前</span></p>
                <p class="content">sdfsdfsdfs</p>
              </li>
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
    </div>
    <div class="profile-main">
      <div class="profile-main-card" v-for="profile in profileList" :key="profile.id">
        <div class="card-title"><a :href="`/article/${profile.id}`">{{profile.title}}</a></div>
        <div class="card-date" :data-date="$filter.timeStampFormat(profile.publishAt)">{{profile.publishAt | timeAgoFormat}}</div>
        <div class="card-tags">
          <el-tag size="mini" v-for="tag in profile.tags" :key="tag">{{tag}}</el-tag>
        </div>
        <div class="card-content">&nbsp;&nbsp;&nbsp;&nbsp;{{profile.about}}
          <el-button type="text" @click="$router.push(`/article/${profile.id}`)">阅读全文<i class="el-icon-arrow-right"></i></el-button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    hotArticleList: {
      type: Array,
      default: () => []
    },
    profileList: {
      type: Array,
      default: () => []
    },
    classifyList: {
      type: Array,
      default: () => []
    },
    commentList: {
      type: Array,
      default: () => [1, 2]
    }
  },
  data() {
    return {
      // hotArticleList:[],
      // profileList:[],
      // classifyList[],
      // commentList:[]
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.blog-profile {
  @mixin back-shadow {
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  }

  .profile-main {
    @include back-shadow;
  }

  .profile-main {
    width: 710px;
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

      .hot-article {
        li {
          padding: 4px;
          a {
            padding-left: 8px;
          }
        }
      }

      .article-classify {
        a {
          display: block;
          padding: 4px;
          .count {
            float: right;
            color: #b3b3b3;
          }
        }
      }

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
    }
  }

  .profile-main-card {
    position: relative;
    margin: 0 10px;
    padding: 20px 10px;
    line-height: 1.6;
    border-bottom: 1px solid #dadada;

    .card-title {
      font-size: 24px;
      font-weight: bold;
      color: #1a1a1a;

      a {
        text-decoration: none;
      }
    }

    .card-date {
      position: absolute;
      top: 28px;
      right: 26px;
    }

    .card-tags {
      padding-top: 5px;
    }

    .card-content {
      padding-top: 10px;
      line-height: 2;
      font-size: 16px;
      word-break: break-all;

      .el-button {
        padding: 0;
        font-size: inherit;
      }
    }

    .card-tags {
      .el-tag {
        margin-right: 5px;
      }
    }
  }
}
</style>
