// deps
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
/* new
import {thunk, thunkMiddleware}  from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
*/

// app
import reducer from './reducers';
import logger from './utils/logger';

/*
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, logger)));
*/

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, logger)));

export default store;