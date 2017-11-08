// libs
import {combineReducers} from 'redux';
import _ from 'lodash';

// Actions
import {GET_POST_CATEGORIES, SET_CATEGORY} from '../actions/categories';
import {
    GET_POST, CREATE_POST, GET_POSTS_ALL, GET_POSTS_BY_CAT,
    UPDATE_POST, DELETE_POST, FILTER_POSTS_BY_CAT, SHOW_ALL_POSTS,
    SORT_BY_VOTE_SCORE_ASC, SORT_BY_VOTE_SCORE_DESC,
    SORT_BY_PUBDATE_ASC, SORT_BY_PUBDATE_DESC, SET_SORT_METHOD
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

function post(state = { id: "", details: {}}, action) {
    switch(action.type) {
        case GET_POST:
            return {
                id: action.id,
                details: action.details
            };
        case CREATE_POST:
        case GET_POSTS_BY_CAT:
        case UPDATE_POST:
        case DELETE_POST:
        default: return state;
    }
}

function posts(state = {all:{}, display:{}, sortMethod: "voteScoreDesc"}, action) {

    switch (action.type) {
        case GET_POSTS_ALL:
            let postsDefault = _.orderBy(action.posts, ['voteScore'], ['desc']);
            return {
                ...state,
                all: Object.assign({}, postsDefault),
                display: Object.assign({}, postsDefault)
            };
        case FILTER_POSTS_BY_CAT:
            return {
                ...state,
                display: Object.assign({}, _.filter(state.all, (post) => action.category === post.category))
            };
        case SHOW_ALL_POSTS:
            return {
                ...state,
                display: Object.assign({}, state.all) // state.all default sorted 'voteScore, desc'
            };
        case SET_SORT_METHOD:
            return {
                ...state,
                sortMethod: action.sortMethod
            };
        case SORT_BY_VOTE_SCORE_ASC:
            return {
                ...state,
                display: Object.assign({}, _.orderBy(state.display, ['voteScore'], ['asc']))
            };
        case SORT_BY_VOTE_SCORE_DESC:
            return {
                ...state,
                display: Object.assign({}, _.orderBy(state.display, ['voteScore'], ['desc']))
            };
        case SORT_BY_PUBDATE_ASC:
            return {
                ...state,
                display: Object.assign({}, _.orderBy(state.display, ['timestamp'], ['asc']))
            };
        case SORT_BY_PUBDATE_DESC:
            return {
                ...state,
                display: Object.assign({}, _.orderBy(state.display, ['timestamp'], ['desc']))
            };
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
    post,
    comments
})

