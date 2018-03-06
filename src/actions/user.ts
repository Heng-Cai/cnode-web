import * as actionTypes from '../constants/actionTypes';
import * as constValues from '../constants/constValues';

import { fetch } from '../utils/fetch';

import { IUserInfo } from '../interfaces/user';

function requestUserInfo(userId: string) {
  return {
    type: actionTypes.REQUEST_USERINFO,
    userId,
  }
}

function receiveUserInfo(user: IUserInfo) {
  return {
    type: actionTypes.RECEIVE_USERINFO,
    user,
  }
}

// 请求用户详情
export function fetchUserInfo(userId: string) {
  return dispatch => {
    dispatch(requestUserInfo(userId));
    fetch(`/user/:userId`, { params: { userId } })
      .then((data: IUserInfo) => {
        dispatch(receiveUserInfo(data));
      });
  }
}