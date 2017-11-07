// deps
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';


// app
import reducer from './reducers';
import logger from './utils/logger';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(logger, thunk)));

export default store;