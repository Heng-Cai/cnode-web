import * as React from "react";
import { Link } from "react-router";

import getDate from '../../utils/getDate'
import { ITopic } from "../../interfaces/user";
import { TAGS } from "../../constants/constValues";

class UserTopicItem extends React.Component<{ topic: ITopic }, any> {
  render() {
    const { topic } = this.props;

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
        <span className="topic-last-reply">{getDate(topic.last_reply_at)}</span>

        {/* 点击其他地方，进入主题详情页 */}
        <Link className="topic-title-link" to={`/topic/${topic.id}`}>
          {topic.title}
        </Link>
      </div>
    )
  }
}

export default UserTopicItem;