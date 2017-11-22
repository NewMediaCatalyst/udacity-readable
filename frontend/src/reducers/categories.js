// Actions
import {GET_POST_CATEGORIES, SET_CATEGORY} from '../actions/categories';


// Reducers
export const categories = (state = {}, action) => {
    const {categories} = action;

    switch (action.type) {
        case GET_POST_CATEGORIES: return Object.assign({}, state, categories: categories.categories);
        default: return state;
    }
}

export const category = (state = "all", action) => {

    switch (action.type) {
        case SET_CATEGORY: return action.category;
        default:           return state;
    }

}
