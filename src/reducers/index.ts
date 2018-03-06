import { combineReducers } from 'redux';

import { topics, topic } from "./topic";
import { user } from "./user";

const rootReducer = combineReducers({
  topics,
  topic,
  user,
});

export default rootReducer;