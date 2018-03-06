import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import UserTopicItem from '../components/user/userTopicItem';
import { fetchUserInfo } from '../actions/user';
import { IUserInfo, ITopic } from '../interfaces/user';

import getDate from '../utils/getDate';

import '../styles/user.scss';

class User extends React.Component<{ user: IUserInfo, dispatch: Function, params: { userId: string } }, any> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchUserInfo(this.props.params.userId));
  }

  componentWillReceiveProps(nextProps: { params: { userId: string } }) {
    if (this.props.params.userId !== nextProps.params.userId) {
      this.props.dispatch(fetchUserInfo(nextProps.params.userId));
    }
  }

  render() {
    const { user } = this.props;
    const { recent_replies } = user;
    const { recent_topics } = user;

    return (
      <div className="user">
        <div className="user-info">
          <div className="user-name">
            <img src={user.avatar_url} alt="" className="avatar" />
            <span className="user-loginname">{user.loginname}</span>
          </div>
          <div className="user-score">积分: {user.score}</div>
          <div className="user-github">
            github: <a className="github" href={`https://github.com/${user.githubUsername}`}> @{user.githubUsername}</a>
          </div>

          <div className="user-regtime">注册时间: {getDate(user.create_at)}</div>
        </div>

        <div className="recent-replies-title">最近创建的话题</div>
        <div className="topic-list">
          {recent_topics && recent_topics.map && recent_topics.map((topic, index) => {
            return (
              <UserTopicItem topic={topic} key={index} />
            )
          })}
        </div>

        <div className="recent-replies-title">最近参与的话题</div>
        <div className="topic-list">
          {recent_replies && recent_replies.map && recent_replies.map((topic, index) => {
            return (
              <UserTopicItem topic={topic} key={index} />
            )
          })}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return {
    user,
  };
}

export default connect(mapStateToProps)(User);