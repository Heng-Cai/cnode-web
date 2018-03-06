import { ITopicComment } from "./comment";

export interface ITopicItem {
  // 作者
  author: {
    loginname: string;
    avatar_url: string;
  };

  // topic作者id
  author_id: string;

  // 内容
  content: string;

  // 创建时间
  create_at: string;

  // 是否精华
  good: boolean;

  // id
  id: string;

  // 是否被收藏
  is_collect: boolean;

  // 最近评论时间
  last_reply_at: string;

  // 评论
  replies?: Array<ITopicComment>;

  // 评论数量
  reply_count: number;

  // 所属标签
  tab: string;

  // 标题
  title: string;

  // 是否置顶
  top: boolean;

  // 被查看次数
  visit_count: number;
}