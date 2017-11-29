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
            console.log("GET_COMMENTS_BY_POST :: action.comment: ", action.comment);
            console.log("GET_COMMENTS_BY_POST :: allPostsCArr: ", allPostsCArr);
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
        case CREATE_COMMENT:
            const createId = action.comment.id;
            let displayCreateComments = [],
                allCreateComments = Object.assign({}, state.all);

            allCreateComments[createId] = action.comment;
            let allCreatePostsCArr = _.orderBy(Object.values(allCreateComments)
                .map((comment) => comment), ['voteScore'], ['desc']);

            allCreatePostsCArr.map((comment) => {
                if (!comment.deleted && !comment.parentDeleted) {
                    displayCreateComments.push(comment.id);
                }
                return allCreateComments[comment.id] = comment;
            });

            console.log("CREATE_COMMENT :: allCreateComments: ", allCreateComments);
            console.log("CREATE_COMMENT :: allCreatePostsCArr: ", allCreatePostsCArr);
            console.log("CREATE_COMMENT :: displayCreateComments: ", displayCreateComments);


            return {
                ...state,
                all: allCreateComments,
                display: displayCreateComments
            }
        case VOTE_COMMENT:
            let updatedComment = Object.assign({}, state.all);
            updatedComment[action.comment.id].voteScore = action.comment.voteScore;
            return {
                ...state,
                details: updatedComment
            };
        case GET_COMMENT:
            const getId = action.comment.id;
            let allComments = Object.assign({}, state.all);
            allComments[getId] = action.comment;
            return {
                ...state,
                all: allComments,
                display: [getId]
            };
        case UPDATE_COMMENT:
            const updateId = action.comment.id;
            let allUpdateComments = Object.assign({}, state.all);
            allUpdateComments[updateId] = action.comment;
            return {
                ...state,
                all: allUpdateComments,
                display: [updateId]
            };

        case DELETE_COMMENT:
            return action.comment;
        default:
            return state;
    }
}

