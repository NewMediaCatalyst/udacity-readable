// libs
import {combineReducers} from 'redux';


// reducers
import {comments} from './comments';
import {post, posts} from './posts';
import {category, categories} from './categories';


export default combineReducers({
    categories,
    category,
    posts,
    post,
    comments
})
