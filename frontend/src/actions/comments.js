
// COMMENT :: CONSTANTS ////

// CREATE
export const CREATE_COMMENT = "CREATE_COMMENT";
// READ
export const GET_COMMENTS = "GET_COMMENTS";  // by post ID
// UPDATE
export const UPDATE_COMMENT = "UPDATE_COMMENT";  // by comment ID
// DELETE
export const DELETE_COMMENT = "DELETE_COMMENT";  // by comment ID


// COMMENT :: ACTIONS ////

// CREATE
export function createComment(id, parentID, timestamp, title, body, author, category, voteScore, deleted, parentDeleted) {
    return {
        type: CREATE_COMMENT,
        id,
        parentID,
        timestamp,
        title,
        body,
        author,
        category,
        voteScore,
        deleted
    }
};

// READ
export function getComments(parentID) {
    return {
        type: GET_COMMENTS,
        parentID
    }
};

// UPDATE
export function updateComment(id, parentID, timestamp, body, author, voteScore, deleted, parentDeleted) {
    return {
        type: UPDATE_COMMENT,
        id,
        parentID,
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