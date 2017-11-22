// libs
import _ from 'lodash';

// Actions
import {
    GET_COMMENT, VOTE_COMMENT, CREATE_COMMENT,
    GET_COMMENTS_BY_POST, UPDATE_COMMENT, DELETE_COMMENT
} from '../actions/comments';


// Reducers

export const comments = (state = {all: {}, display: []}, action) => {

    switch (action.type) {
        case GET_COMMENTS_BY_POST:
            let allPostsCArr, allPostComments = {}, displayPostComments = [];
            allPostsCArr = _.orderBy(action.all.map((comment) => comment), ['voteScore'], ['desc']);
            allPostsCArr.map((comment) => {
                if (!comment.deleted && !comment.parentDeleted) {
                    displayPostComments.push(comment.id);
                }
                return allPostComments[comment.id] = comment;
            });

            return {
                ...state,
                all: allPostComments,
                display: displayPostComments
            };
        case VOTE_COMMENT:
            let updatedComment = Object.assign({}, state.all);
            updatedComment[action.comment.id].voteScore = action.comment.voteScore;
            return {
                ...state,
                details: updatedComment
            };
        case GET_COMMENT:
            return action.comment;
        case CREATE_COMMENT:
            return action.comment;
        case UPDATE_COMMENT:
            return action.comment;
        case DELETE_COMMENT:
            return action.comment;
        default:
            return state;
    }
}

