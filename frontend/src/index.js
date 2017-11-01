// deps
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';

// app
import './css/index.css';
import reducer from './reducers';
import App from './components/App';

const logger = store => next => action => {
    console.group(action.type);
    console.info('dispatching: ', action);
    let result = next(action);
    console.log('next state: ', store.getState());
    console.groupEnd(action.type);
    return result;
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(logger, thunk)));

console.log("store :: state: ", store.getState());

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));