// POSTS //////

// POST :: CONSTANTS //////

// POST CATEGORIES
export const GET_POST_CATEGORIES = "GET_POST_CATEGORIES";
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

// POST CATEGORIES
export getPostCategories = () => ({
    type: GET_POST_CATEGORIES
});

// CREATE
export createPost = (id, timestamp, title, body, author, category, voteScore, deleted) => ({
    type: CREATE_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
});

// READ
export getPostsAll = () => ({
    type: GET_POSTS_ALL
});

export getPostsByCat = (category) => ({
    type: GET_POSTS_BY_CAT,
    category
});

// UPDATE
export updatePost = (id, timestamp, title, body, author, category, voteScore, deleted) => ({
    type: UPDATE_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
});

// DELETE
// TODO: deleting a post, also needs to tell
// it's comments that it's parentID has been deleted, or 'undeleted'
export deletePost = (id) => ({
    type: DELETE_POST,
    id
});


