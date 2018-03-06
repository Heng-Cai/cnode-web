export interface ITopicComment {
  // 评论者
  author: {
    loginname: string;
    avatar_url: string;
  };

  // 评论内容
  content: string;

  // 评论时间
  create_at: string;

  // 评论id
  id: string;

  // 评论回复id
  reply_id: string;

  // 评论点赞信息
  ups: string[]
}