// libs
import {combineReducers} from 'redux';

// Actions
import {GET_POST_CATEGORIES, SET_CATEGORY} from '../actions/categories';
import {
    CREATE_POST, GET_POSTS_ALL, GET_POSTS_BY_CAT, UPDATE_POST,
    DELETE_POST, FILTER_POSTS_BY_CAT, SHOW_ALL_POSTS
} from '../actions/posts';
import {
    CREATE_COMMENT, GET_COMMENTS, UPDATE_COMMENT, DELETE_COMMENT
} from '../actions/comments';

// Reducers
function categories(state = {}, action) {
    const {categories} = action;

    switch (action.type) {
        case GET_POST_CATEGORIES: return Object.assign({}, state, categories: categories.categories);
        default: return state;
    }
}

function category(state = "all", action) {
    switch (action.type) {
        case SET_CATEGORY: return action.category;
        default:           return state;
    }
}

// posts: Object.entries(state.posts).filter((post) => post.category === action.category)

function posts(state = {}, action) {

    switch (action.type) {
        case GET_POSTS_ALL:
            return Object.assign({}, state, action.posts);
        case FILTER_POSTS_BY_CAT:
            let filteredPosts = {};
            Object.values(state).map((post, idx) => {
                if (action.category === post.category) { filteredPosts[idx] = post; }
            });
            return Object.assign({}, state, posts: filteredPosts);

        case SHOW_ALL_POSTS:    return Object.assign({}, state, posts);
        case CREATE_POST:
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
    category,
    posts,
    comments
})

