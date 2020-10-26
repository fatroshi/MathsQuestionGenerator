import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import logger from 'redux-logger';
import {Provider} from 'react-redux';
//import {userReducer} from './components/reducers/userReducer'

const initialState = {
    question: 1,
    lastQuestions: []
}

const mathReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case "CREATE":
            state = {
                ...state,
                question: action.payload,
                lastQuestions: [...state.lastQuestions, action.payload]
            };

            break;
        case "ADD_QUESTION":
            state = {
                ...state,
                question: action.payload,
                lastQuestions: [...state.lastQuestions, action.payload]
            };
            break;
    }

    return state;
}

const userReducer = (state = {name: "Matte Ugglan", age: 8}, action) => {
    switch (action.type)
    {
        case "SET_NAME":
            state = {
                ...state,
                name: action.payload,
            };

            break;
        case "SET_AGE":
            state = {
                ...state,
                age: action.payload,
            };
            break;
    }
    return state;
}

const store = createStore(combineReducers({
    mathReducer: mathReducer,
    userReducer: userReducer
}), {}, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
