import * as actionTypes from '../constants/actionTypes';
import * as constValues from '../constants/constValues';

import { fetch } from '../utils/fetch';

import { ITopicItem } from '../interfaces/topic';

function requestTopics(tab: string) {
  return {
    type: actionTypes.REQUEST_TOPICS,
    tab,
  }
}

function receiveTopics(topics: ITopicItem[], switchTab: boolean) {
  return {
    type: actionTypes.RECEIVE_TOPICS,
    topics,
    switchTab,
  }
}

// 请求 topic 列表
export function fetchTopics(tab: string, page: number) {
  return dispatch => {
    dispatch(requestTopics(tab));
    fetch(`/topics`, { query: { tab, page, limit: constValues.MAX_PAGE } })
      .then((data: ITopicItem[]) => {
        dispatch(receiveTopics(data, page === 1));
      });
  }
}

function requestTopic(topicId: string) {
  return {
    type: actionTypes.REQUEST_TOPIC,
    topicId,
  }
}

function receiveTopic(topic: ITopicItem) {
  return {
    type: actionTypes.RECEIVE_TOPIC,
    topic,
  }
}

// 请求 topic 详情
export function fetchTopic(topicId: string) {
  return dispatch => {
    dispatch(requestTopic(topicId));
    fetch(`/topic/:topicId`, { params: { topicId } })
      .then((data: ITopicItem) => {
        dispatch(receiveTopic(data));
      });
  }
}
