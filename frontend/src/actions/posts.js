// POSTS //////

// POST :: CONSTANTS //////

// CREATE
export const CREATE_POST = "CREATE_POST";
// READ
export const GET_POSTS_ALL = "GET_POSTS_ALL";
export const GET_POSTS_BY_CAT = "GET_POSTS_BY_CAT";
// UPDATE
export const UPDATE_POST = "UPDATE_POST";
// DELETE
export const DELETE_POST = "DELETE_POST";


// POST :: ACTIONS //////

// CREATE
export function createPost(id, timestamp, title, body, author, category, voteScore, deleted) {
    return {
        type: CREATE_POST,
        id,
        timestamp,
        title,
        body,
        author,
        category,
        voteScore,
        deleted
    };
};

// READ
export function getPostsAll(posts) {
    return {
        type: GET_POSTS_ALL,
        posts
    }
};

export function getPostsByCat(category) {
    return {
        type: GET_POSTS_BY_CAT,
        category
    }
};

// UPDATE
export function updatePost(id, timestamp, title, body, author, category, voteScore, deleted) {
    return {
        type: UPDATE_POST,
        id,
        timestamp,
        title,
        body,
        author,
        category,
        voteScore,
        deleted
    }
};

// DELETE
// TODO: deleting a post, also needs to tell
// it's comments that it's parentID has been deleted, or 'undeleted'
export function deletePost(id) {
    return {
        type: DELETE_POST,
        id
    }
};


