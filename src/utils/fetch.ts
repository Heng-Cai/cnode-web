import * as constValues from "../constants/constValues";
import * as qs from "querystring";

import axios from 'axios';

let axiosInstance = axios.create({
  baseURL: 'https://cnodejs.org',
  // headers: {
  //   'Origin': 'https://cnodejs.org',
  //   'Access-Control-Request-Method': 'GET',
  // },
});

export function fetch(url: string, opts?: { params?: any, query?: any }) {
  opts = opts || {};

  if (opts.params) {
    Object.keys(opts.params).forEach(key => {
      url = url.replace(`:${key}`, opts.params[key]);
    });
  }
  if (opts.query) {
    url += `?${qs.stringify(opts.query)}`;
  }

  url = '/api/v1' + url;

  return axiosInstance.get(url).then(
    res => { return res.data['data']; },
    err => { console.log(err); });
};