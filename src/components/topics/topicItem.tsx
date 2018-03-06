import * as React from 'react';
import { Link } from 'react-router';

import getDate from '../../utils/getDate'
import { ITopicItem } from '../../interfaces/topic';
import { TAGS } from '../../constants/constValues';


class TopicItem extends React.Component<{ topic: ITopicItem }, any> {
  render() {
    const { topic } = this.props;

    // 取得当前主题的 tag
    const topicTag = (topic.top ? 'top' : (topic.good ? 'good' : topic.tab));
    const tag = TAGS.filter((tag) => tag.name === topicTag).pop();

    return (
      <div className="topic-item">
        {/* 点击头像，进入用户详情页 */}
        <Link to={`/user/${topic.author.loginname}`} className="user-link">
          <img
            src={topic.author.avatar_url}
            alt=""
            className="avatar"
            title={topic.author.loginname}
          />
        </Link>
        <span className="topic-rate">
          <span className="reply-count" title="回复数">{topic.reply_count}</span>
          <span>/</span>
          <span className="visit-count" title="点击数">{topic.visit_count}</span>
        </span>
        <span className="topic-last-reply">{getDate(topic.last_reply_at)}</span>

        {/* 点击标题，进入主题详情页 */}
        <span className={`topic-tag ${tag && tag.name}`}>
          {tag && tag.text}
        </span>
        <Link className="topic-title-link" to={`/topic/${topic.id}`}>
          {topic.title}
        </Link>
      </div>
    )
  }
}

export default TopicItem;