// libs
import _ from 'lodash';


// Actions
import {
    GET_POST, VOTE_POST, ADD_POST, GET_POSTS_ALL,
    UPDATE_POST, DELETE_POST, FILTER_POSTS_BY_CAT,
    SHOW_ALL_POSTS, SORT_BY_VOTE_SCORE_ASC,
    SORT_BY_VOTE_SCORE_DESC, SORT_BY_PUBDATE_ASC,
    SORT_BY_PUBDATE_DESC, SET_SORT_METHOD
} from '../actions/posts';


// Reducers

export const post = (state = { id: "", details: {}}, action) => {

    switch(action.type) {
        case VOTE_POST:
            let updatedPost = Object.assign({}, state.details);
            updatedPost.voteScore = action.post.voteScore;
            return {
                ...state,
                details: updatedPost
            };

        default: return state;
    }
}


export const posts = (state = {all:{}, display:[], sortMethod: "voteScoreDesc"}, action) => {

    switch (action.type) {
        case GET_POSTS_ALL:
            let getPostsAllSorted = {}, getPostsToDisplay = [],
                getPostsSorted = _.orderBy(action.posts, ['voteScore'], ['desc']);

            console.log("00 GET_POSTS_ALL :: action.posts: ", action.posts);
            console.log("01 GET_POSTS_ALL :: getPostsSorted: ", getPostsSorted);
            getPostsSorted.map((post) => {
                console.log("01a GET_POSTS_ALL :: post: ", post);
                return getPostsAllSorted[post.id] = post;
            });
            console.log("01 GET_POSTS_ALL :: getPostsAllSorted: ", getPostsAllSorted);
            getPostsToDisplay = Object.values(getPostsAllSorted).filter((post) => {
                console.log("post.category: ", post.category, "; action.category: ", action.category);
                return post.category === action.posts.category;
            });
            console.log("04 GET_POSTS_ALL :: getPostsToDisplay: ", getPostsToDisplay);
            return {
                ...state,
                all: getPostsAllSorted,
                display: getPostsToDisplay
            };
        case GET_POST:
            let getPostAll = Object.assign({}, state.all), getPostDisplay = [];
            getPostAll[action.post.id] = action.post;
            getPostDisplay.push(action.post.id);
            return {
                ...state,
                all: getPostAll,
                display: getPostDisplay
            }
        case DELETE_POST:
            return state;
        case FILTER_POSTS_BY_CAT:
            let filteredState = _.filter(state.all, (post) => action.category === post.category);
            let filteredPostsDisplay = Object.values(filteredState).map((post) => post.id);
            console.log("FILTER_POSTS_BY_CAT :: action.category: ", action.category ," :: filteredState: ", filteredState, "; filteredPostsDisplay: ", filteredPostsDisplay);
            return {
                ...state,
                display: filteredPostsDisplay
            };
        case SHOW_ALL_POSTS:
            let showPostsAll = Object.assign({}, state.all), showPostsDisplay = [];
            showPostsDisplay = Object.values(showPostsAll).map((post) => post.id);
            console.log("SHOW_ALL_POSTS :: action.category: ", action.category ," :: showPostsAll: ", showPostsAll, "; showPostsDisplay: ", showPostsDisplay);
            return {
                ...state,
                display: showPostsDisplay // state.all default sorted 'voteScore, desc'
            };
        case ADD_POST:
            let addPostAll = Object.assign({}, state.all);
            addPostAll[action.post.id] = action.post;
            _.orderBy(addPostAll, ['voteScore'], ['desc']);
            return {
                ...state,
                all: Object.assign({}, addPostAll),
                display: Object.assign({}, addPostAll)
            };
        case UPDATE_POST:
            let updatePostAll = Object.assign({}, state.all);
            updatePostAll[action.post.id] = action.post;
            console.log("UPDATE_POST :: action.post: ", action.post);
            console.log("UPDATE_POST :: updatePostAll: ", updatePostAll);
            return {
                ...state,
                all: Object.assign({}, updatePostAll),
                display: Object.assign({}, updatePostAll)
            };
        case SET_SORT_METHOD:
            return {
                ...state,
                sortMethod: action.sortMethod
            };
        case SORT_BY_VOTE_SCORE_ASC:
            let sortScoreAscAll = [], sortScoreAscDisplay = [];
            state.display.map((id) => sortScoreAscAll.push(state.all[id]));
            sortScoreAscAll = _.orderBy(sortScoreAscAll, ['voteScore'], ['asc']);
            sortScoreAscAll.map((post) => sortScoreAscDisplay.push(post.id));
            return {
                ...state,
                display: sortScoreAscDisplay
            };
        case SORT_BY_VOTE_SCORE_DESC:
            let sortScoreDescAll = [], sortScoreDescDisplay = [];
            state.display.map((id) => sortScoreDescAll.push(state.all[id]));
            sortScoreDescAll = _.orderBy(sortScoreDescAll, ['voteScore'], ['desc']);
            sortScoreDescAll.map((post) => sortScoreDescDisplay.push(post.id));
            return {
                ...state,
                display: sortScoreDescDisplay
            };
        case SORT_BY_PUBDATE_ASC:
            let sortScoreDateAscAll = [], sortScoreDateAscDisplay = [];
            state.display.map((id) => sortScoreDateAscAll.push(state.all[id]));
            sortScoreDateAscAll = _.orderBy(sortScoreDateAscAll, ['timestamp'], ['asc']);
            sortScoreDateAscAll.map((post) => sortScoreDateAscDisplay.push(post.id));
            return {
                ...state,
                display: sortScoreDateAscDisplay
            };
        case SORT_BY_PUBDATE_DESC:
            let sortScoreDateDescAll = [], sortScoreDateDescDisplay = [];
            state.display.map((id) => sortScoreDateDescAll.push(state.all[id]));
            sortScoreDateDescAll = _.orderBy(sortScoreDateDescAll, ['timestamp'], ['desc']);
            sortScoreDateDescAll.map((post) => sortScoreDateDescDisplay.push(post.id));
            return {
                ...state,
                display: sortScoreDateDescDisplay
            };
        default: return state;
    }
}
