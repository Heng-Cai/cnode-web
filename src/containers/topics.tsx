import * as React from 'react';
import { connect } from 'react-redux';

import Nav from '../components/topics/nav';
import TopicList from '../components/topics/topicList';
import { fetchTopics } from '../actions/topic';
import { ITopicItem } from '../interfaces/topic';

class Topics extends React.Component<{ topics: ITopicItem[], dispatch: Function, params: { tab: string } }, any> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchTopics(this.props.params.tab, 1);
  }

  componentWillReceiveProps(nextProps: { params: { tab: string } }) {
    if (this.props.params.tab !== nextProps.params.tab) {
      this.fetchTopics(nextProps.params.tab, 1);
    }
  }

  fetchTopics(tab: string, page: number) {
    const { dispatch } = this.props;
    dispatch(fetchTopics(tab || 'all', page));
  }

  render() {
    const { topics } = this.props;

    return (
      <div>
        <Nav current={this.props.params.tab}></Nav>
        <TopicList topics={this.props.topics} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { topics } = state;

  return {
    topics,
  }
}

export default connect(mapStateToProps)(Topics);