import * as React from "react";
import { Link } from "react-router";

import { ITopicComment } from "../../interfaces/comment";

import getDate from '../../utils/getDate';


class Comment extends React.Component<{ comment: ITopicComment }, any> {
  render() {
    const { comment } = this.props;

    return (
      <div className="topic-comment-item">
        <div className="topic-comment-head">
          <Link to={`/user/${comment.author && comment.author.loginname}`}>
            <img className="avatar" src={comment.author && comment.author.avatar_url} />
          </Link>
          <span className="topic-comment-author">{comment.author && comment.author.loginname}</span>
          <span className="topic-comment-time">{getDate(comment.create_at)}</span>
        </div>
        <div className="topic-comment-content" dangerouslySetInnerHTML={{ __html: comment.content }}>
        </div>
      </div>
    )
  }
}

export default Comment;