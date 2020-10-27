import questionReducer from './reducers/questionReducer';
import userReducer from './reducers/userReducer';

import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';

const enhancer = [applyMiddleware(logger, thunk)]

export default createStore(combineReducers({
    questionReducer: questionReducer,
    userReducer: userReducer
}), {}, compose(...enhancer));