<template>
    <div class="blog-body" v-loading="loading">
      <div class="article-main">
        <div class="article-header">
          <h1 class="title">{{article.title}}</h1>
          <div class="clearfix">
            <div class="tags"><a class="tag" href="javascript:;" v-for="tag in article.tags" :key="tag">{{tag}}</a></div>
            <div class="classify">{{article.classify}}</div>
            <div class="time">
              <span>发布于{{article.publishAt, 'yyyy-MM-dd' | timeStampFormat}}</span>
              <span>{{article.viewCount}}次浏览</span>
              <span>最后一次编辑 {{article.updatedAt | timeAgoFormat}}</span>
            </div>
          </div>
        </div>
        <div class="article-body">
          <div class="article-about">{{article.about}}</div>
          <div class="markdown-body" v-html="markdownToHtml(article.content)"></div>
        </div>
        <div class="article-footer">
          <p>版权声明：本文为博主思考总结而得，欢迎大家转载指导</p>
          <a :href="href" alt="转载路径">{{href}}</a>
        </div>
      </div>
      <div class="article-main" v-show="relateArticle.length">
        <div class="article-title">相关文章</div>
        <div class="article-body">
          <ul class="article-relate">
            <li v-for="relate in relateArticle" :key="relate.id">
              <span class="title">《<a :href="`/article/${relate.id}`">{{relate.title}}</a>》</span>
              <div class="tags"><span class="tag" v-for="tag in relate.tags" :key="tag">{{tag}}</span></div>
              <div class="time">
                <span>{{relate.publishAt, 'yyyy-MM-dd' | timeStampFormat}}</span>
                 <span>{{article.viewCount}}次浏览</span>
              </div>
              <p class="about">简介：{{relate.about}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="article-main">
        <div class="article-title">留言<span class="num-title" v-if="article.commentCount>0">（{{article.commentCount}}条）</span></div>
        <div class="article-body">
          <ul class="article-comments">
            <template v-if="article.commentCount>0">
              <li v-for="(comment, index) in article.comments" :key="index" :id="'comment-'+comment.id">
                <div class="comment-floor">
                  <div class="comment-name"><i class="fa fa-vimeo" v-show="comment.admin"></i>{{comment.name}}&nbsp;说：</div>
                  <div class="comment-layer">第<span class="num-layer">{{index+1}}</span>楼</div>
                </div>
                <div class="comment-content" v-html="comment.content"><template ></template></div>
                <div class="comment-reply">
                  <span class="mark-view-time">{{comment.createdAt | timeStampFormat}}</span>|<a href="javascript:;" @click="goCommentHash('comment-'+comment.id)">#</a>|<a href="javascript:;" @click="handleAddReply(comment, index)">回复</a>
                </div>
              </li>
            </template>
            <template v-else>
              <li>还没有人评论，赶紧抢沙发～</li>
            </template>
          </ul>
        </div>
        <div class="article-footer">
          <div class="title">发表评论</div>
          <div style="padding-top: 20px;">
            <el-form ref="commentRef" :model="comment" :rules="commentRules">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="昵称：" label-width="80px" prop="name">
                    <el-input v-model="comment.name" placeholder="请输入昵称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮箱：" label-width="80px" prop="email">
                    <el-input v-model="comment.email" placeholder="请输入邮箱"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="评论：" label-width="80px" prop="content">
                    <el-tag v-for="(reply, index) in replys" :key="reply.index" closable @close="handleRemoveReply(index)">{{1+reply.index}}楼</el-tag>
                    <el-input type="textarea" :rows="6" :autosize="false" v-model="comment.content" placeholder="请输入评论" v-focus="commentFocus"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="" label-width="80px" prop="checked">
                    <el-button type="primary" :loading="commentLoading" @click="handleComment">{{commentLoading?'提交中':'提　交'}}</el-button>
                    <el-checkbox v-model="comment.checked" style="padding-left: 10px;">记住个人信息？</el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import index from "./index";
export default index;
</script>

<style>
@import "highlight.js/styles/googlecode.css";
</style>
<style lang="scss">
@import "./index";
</style>
