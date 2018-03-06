export interface ITopic {
  author: {
    loginname: string;
    avatar_url: string;
  };

  id: string;

  // 最近上次回复时间
  last_reply_at: string;

  // 标题
  title: string;

}

export interface IUserInfo {
  // 用户头像
  avatar_url: string;

  // 用户帐号创建时间
  create_at: string;

  // 用户 github
  githubUsername: string;

  loginname: string;

  // 用户最近回复的文章
  recent_replies: Array<ITopic>;

  // 用户最近发布的主题
  recent_topics: Array<ITopic>;

  // 用户积分
  score: number;
}