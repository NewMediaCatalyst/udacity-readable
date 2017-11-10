
// COMMENT :: CONSTANTS ////

// CREATE
export const CREATE_COMMENT = "CREATE_COMMENT";
// READ
export const GET_COMMENTS_BY_POST = "GET_COMMENTS_BY_POST";  // by post ID
// UPDATE
export const UPDATE_COMMENT = "UPDATE_COMMENT";  // by comment ID
// DELETE
export const DELETE_COMMENT = "DELETE_COMMENT";  // by comment ID


// COMMENT :: ACTIONS ////

// CREATE
export function createComment(comment) {
    return {
        type: CREATE_COMMENT,
        comment
    }
};

// READ
export function getComments(comments) {
    return {
        type: GET_COMMENTS_BY_POST,
        all: comments
    }
};

// UPDATE
export function updateComment(id, parentId, timestamp, body, author, voteScore, deleted, parentDeleted) {
    return {
        type: UPDATE_COMMENT,
        id,
        parentId,
        timestamp,
        body,
        author,
        voteScore,
        deleted,
        parentDeleted
    }
};

// DELETE
export function deleteComment(id) {
    return {
        type: DELETE_COMMENT,
        id
    }
};