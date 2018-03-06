import * as React from 'react'
import * as ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, hashHistory } from 'react-router';

import Topics from '../containers/topics';
import TopicList from '../components/topics/topicList';
import Topic from '../containers/topic';
import User from '../containers/user';

import '../styles/main.scss';

export default (
  <Router history={hashHistory}>
    <Route path='/'>
      <IndexRedirect to='topics/all' />
      <Route path='topics' component={Topics}>
        <Route path=':tab' component={TopicList} />
      </Route>

      {/* 路由向 Topic 传递参数: this.props.params.topicId */}
      <Route path='topic/:topicId' component={Topic} />
      <Route path='user/:userId' component={User} />
    </Route>
  </Router>
);