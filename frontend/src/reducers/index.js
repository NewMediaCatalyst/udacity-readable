// libs
import {combineReducers} from 'redux';


// reducers
import {comments} from './comments';
import {posts} from './posts';
import {category, categories} from './categories';


export default combineReducers({
    categories,
    category,
    posts,
    comments
})
