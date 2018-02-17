// Actions
import {
    SET_CATEGORY, LOADING_POST_CATEGORIES, LOADED_POST_CATEGORIES, SET_POST_CATEGORIES
} from '../actions/categories';


// Reducers
export const categories = (state = { all: [], isLoading: false, hasLoaded: false }, action) => {

    switch (action.type) {

        case LOADING_POST_CATEGORIES:
            return {
                ...state,
                isLoading: action.isLoading
            };

        case LOADED_POST_CATEGORIES:
            return {
                ...state,
                hasLoaded: action.hasLoaded
            };

        case SET_POST_CATEGORIES:
            return {
                ...state,
                all: action.all
            };
        default:
            return state;
    }
}

export const category = (state = "all", action) => {

    switch (action.type) {
        case SET_CATEGORY:
            return action.category;
        default:
            return state;
    }

}
