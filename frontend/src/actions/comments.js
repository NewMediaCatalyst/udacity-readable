
// COMMENT :: CONSTANTS ////

// CREATE
export const CREATE_COMMENT = "CREATE_COMMENT";
// READ
export const SET_COMMENT = "SET_COMMENT";  // by comment ID
export const GET_COMMENTS_BY_POST = "GET_COMMENTS_BY_POST";  // by post ID
// VOTE COMMENT
export const VOTE_COMMENT = "VOTE_COMMENT";  // by comment ID
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

export function setComment(comment) {
    return {
        type: SET_COMMENT,
        comment
    }
}

// UPDATE
export function updateComment(comment) {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

// VOTE ON COMMENT
export function voteComment(comment) {
    return {
        type: VOTE_COMMENT,
        comment
    }
}


// DELETE
export function deleteComment(comment) {
    return {
        type: DELETE_COMMENT,
        comment
    }
};