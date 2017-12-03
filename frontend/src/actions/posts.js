// POSTS //////

// POST :: CONSTANTS //////

// READ
export const GET_POST = "GET_POST";
// CREATE
export const ADD_POST = "ADD_POST";
// UPDATE
export const UPDATE_POST = "UPDATE_POST";
// VOTE
export const VOTE_POST = "VOTE_POST";
// DELETE
export const DELETE_POST = "DELETE_POST";


// POSTS :: CONSTANTS //////

// READ
export const GET_POSTS_ALL = "GET_POSTS_ALL";
export const GET_POSTS_BY_CAT = "GET_POSTS_BY_CAT";

// FILTER / SHOW
export const SHOW_ALL_POSTS = "SHOW_ALL_POSTS";
export const FILTER_POSTS_BY_CAT = "FILTER_POSTS_BY_CAT";

// SORT BY
export const SET_SORT_METHOD = "SET_SORT_METHOD";
export const SORT_BY_VOTE_SCORE_ASC = "SORT_VOTE_SCORE_ASC";
export const SORT_BY_VOTE_SCORE_DESC = "SORT_VOTE_SCORE_DESC";
export const SORT_BY_PUBDATE_ASC = "SORT_BY_PUBDATE_ASC";
export const SORT_BY_PUBDATE_DESC = "SORT_BY_PUBDATE_DESC";


// POST :: ACTIONS //////

// CREATE
export function addPost(post) {
    return {
        type: ADD_POST,
        post
    };
};

// READ
export function getPost(post) {
    return {
        type: GET_POST,
        post
    }
};

export function getPostsAll(posts) {
    return {
        type: GET_POSTS_ALL,
        posts: posts.posts,
        category: posts.category
    }
};

export function getPostsByCat(category) {
    return {
        type: GET_POSTS_BY_CAT,
        category
    }
};

// VOTE
export function votePost(post) {
    return {
        type: VOTE_POST,
        post
    }
}

// UPDATE
export function updatePost(post) {
    return {
        type: UPDATE_POST,
        post
    }
};

// DELETE
export function deletePost(post) {
    return {
        type: DELETE_POST,
        post
    }
};

// FILTER POSTS by Category
export function filterPostsByCat(category) {
    return {
        type: FILTER_POSTS_BY_CAT,
        category
    }
}

export function showAllPosts() {
    return {
        type: SHOW_ALL_POSTS,
        category: "all"
    }
}

// SORT POSTS BY

export function setSortMethod(sortMethod) {
    return {
        type: SET_SORT_METHOD,
        sortMethod
    }
}

export function sortPostsVoteScoreAsc(posts) {
    return {
        type: SORT_BY_VOTE_SCORE_ASC,
        posts
    }
}

export function sortPostsVoteScoreDesc(posts) {
    return {
        type: SORT_BY_VOTE_SCORE_DESC,
        posts
    }
}

export function sortPostsPubDateAsc(posts) {
    return {
        type: SORT_BY_PUBDATE_ASC,
        posts
    }
}

export function sortPostsPubDateDesc(posts) {
    return {
        type: SORT_BY_PUBDATE_DESC,
        posts
    }
}



