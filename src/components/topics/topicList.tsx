import * as React from 'react';

import TopicItem from './TopicItem';
import { ITopicItem } from '../../interfaces/topic';

import '../../styles/topicList.scss';

class TopicList extends React.Component<{ topics: ITopicItem[] }, any> {
  render() {
    const { topics } = this.props;

    return (
      <section className="topics">
        <div className="topic-list">
          {topics && topics.map && topics.map((topic, index) => {
            return (
              <TopicItem topic={topic} key={index} />
            )
          })}
        </div>
      </section>
    )
  }
}

export default TopicList;