import * as actionTypes from '../constants/actionTypes';
import { ITopicItem } from '../interfaces/topic';

export function topics(state: ITopicItem[], action) {
  switch (action.type) {
    case actionTypes.RECEIVE_TOPICS:
      // 切换 tab 时重新加载新 topic 列表 
      if (action.switchTab) {
        return action.topics || [];
      }

      // 未切换 tab 时追加当前 topic 列表
      return state.concat(action.topics);
    default:
      return state || [];
  }
}

export function topic(state, action) {
  switch (action.type) {
    case actionTypes.RECEIVE_TOPIC:
      return action.topic || {};
    default:
      return state || {};
  }
}