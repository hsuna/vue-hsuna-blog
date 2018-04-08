/*
 * @Description: Hsuna
 * @Author: Hsuna
 * @Date: 2018-04-01 13:40:54
 * @Last Modified by: Hsuna
 * @Last Modified time: 2018-04-04 03:01:33
 */

const userInfoFilter = user => ({
  name: user.name,
  nickname: user.nickname,
  job: user.job,
  introduction: user.introduction,
  portrait: user.portrait,
  banner: user.banner
});
 
const guestBaseFilter = article => ({
  id: article._id,
  title: article.title,
  classify: article.classify,
  about: article.about,
  tags: article.tags,
  viewCount: article.viewCount,
  commentCount: article.comments.length,
  updatedAt: article.updatedAt,
  publishAt: article.publishAt
});

const guestCommentFilter = comment => ({
  id: comment._id,
  name: comment.name,
  content: comment.content,
  createdAt: comment.createdAt,
  articleId: comment.articleId,
  admin: comment.admin
});

const guestDetailFilter = article =>
  Object.assign(guestBaseFilter(article), {
    comments: article.comments.map(guestCommentFilter), //评论
    content: article.content //详情
  });

export { 
  userInfoFilter,
  guestBaseFilter, 
  guestCommentFilter, 
  guestDetailFilter 
};
