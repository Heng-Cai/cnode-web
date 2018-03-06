import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import Comment from '../components/topic/comment';

import { fetchTopic } from '../actions/topic';
import { TAGS } from '../constants/constValues';
import { ITopicItem } from '../interfaces/topic';
import { ITopicComment } from '../interfaces/comment';
import getDate from '../utils/getDate';

import '../styles/topic.scss';
import '../styles/markdown.scss';


class Topic extends React.Component<{ topic: ITopicItem, dispatch: Function, params: { topicId: string } }, any> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchTopic(this.props.params.topicId));
  }

  render() {
    const { topic } = this.props;

    // 取得当前主题的 tag
    const topicTag = (topic.top ? 'top' : (topic.good ? 'good' : topic.tab));
    const tag = TAGS.filter((tag) => tag.name === topicTag).pop();

    return (
      <div className="topic-container">
        {/* 标题 */}
        <div className="topic-title-container">
          <span className={`topic-tag ${tag && tag.name}`}>{tag && tag.text}</span>
          <span className="topic-title">{topic.title}</span>
        </div>

        {/* 信息 */}
        <div className="topic-meta">
          <span>发布于 {getDate(topic.create_at)}</span>
          <span>
            作者 <Link to={`/user/${topic.author && topic.author.loginname}`} className="topic-meta-link">{topic.author && topic.author.loginname}</Link>
          </span>
          <span>{topic.visit_count} 次浏览</span>
        </div>

        {/* 正文 */}
        <div className="topic-content markdown-body" dangerouslySetInnerHTML={{ __html: topic.content }}>
        </div>

        {/* 评论 */}
        <div className="topic-comment">
          <div className="topic-comment-count">{topic.reply_count} 回复</div>
          <div className="topic-comment-list">
            {topic.replies && topic.replies.map((comment, index) => {
              return (
                <Comment comment={comment} key={index} />
              )
            })}
          </div>
        </div>
      </div >
    )
  }
}

function mapStateToProps(state) {
  const { topic } = state;

  return {
    topic,
  }
}

export default connect(mapStateToProps)(Topic);