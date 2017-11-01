// deps
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

// app
import './css/index.css';
import store from './store';
import App from './components/App';



console.log("store :: state: ", store.getState());

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));