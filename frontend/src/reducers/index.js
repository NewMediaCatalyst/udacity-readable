// libs
import {combineReducers} from 'redux';

// Actions
import {GET_POST_CATEGORIES} from '../actions/categories';
import {
    CREATE_POST, GET_POSTS_ALL, GET_POSTS_BY_CAT, UPDATE_POST, DELETE_POST
} from '../actions/posts';
import {
    CREATE_COMMENT, GET_COMMENTS, UPDATE_COMMENT, DELETE_COMMENT
} from '../actions/comments';

// Reducers
function categories(state = [], action) {
    const {categories} = action;

    switch (action.type) {
        case GET_POST_CATEGORIES: return Object.assign({}, state, categories);
        default: return state;
    }
}

function posts(state = [], action) {

    switch (action.type) {
        case CREATE_POST:
        case GET_POSTS_ALL:
        case GET_POSTS_BY_CAT:
        case UPDATE_POST:
        case DELETE_POST:
        default: return state;
    }
}

function comments(state = {}, action) {

    switch (action.type) {
        case CREATE_COMMENT:
        case GET_COMMENTS:
        case UPDATE_COMMENT:
        case DELETE_COMMENT:
        default: return state;
    }
}


export default combineReducers({
    categories,
    posts,
    comments
})

