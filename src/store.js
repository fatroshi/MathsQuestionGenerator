import questionReducer from './reducers/questionReducer';
import userReducer from './reducers/userReducer';

import {applyMiddleware, combineReducers, createStore} from "redux";
import logger from "redux-logger";

export default createStore(combineReducers({
    questionReducer: questionReducer,
    userReducer: userReducer
}), {}, applyMiddleware(logger));