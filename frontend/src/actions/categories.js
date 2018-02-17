// app: api calls
import {apiGetCatAll} from '../utils/api-category';

// POSTS //////

// POST CATEGORIES :: CONSTANTS //////

export const SET_CATEGORY = "SET_CATEGORY";

export const LOADING_POST_CATEGORIES = "LOADING_POST_CATEGORIES";

export const LOADED_POST_CATEGORIES = "LOADED_POST_CATEGORIES";

export const SET_POST_CATEGORIES = "SET_POST_CATEGORIES";


// POST CATEGORIES :: ACTIONS //////

export function getCategoriesLoading(bool) {
    return {
        type: LOADING_POST_CATEGORIES,
        isLoading: bool
    };
}

export function getCategoriesLoaded(bool) {
    return {
        type: LOADED_POST_CATEGORIES,
        hasLoaded: bool
    };
}

export function setCategories(categories) {
    return {
        type: SET_POST_CATEGORIES,
        all: categories.categories
    };
}

export function getCategories() {
    return (dispatch) => {
        dispatch(getCategoriesLoading(true));
        apiGetCatAll().then((categories) => {
            dispatch(getCategoriesLoading(false));
            dispatch(setCategories(categories));
            dispatch(getCategoriesLoaded(true));
        });
    }
}

export function setCategory(category) {
    return {
        type: SET_CATEGORY,
        category
    };
}
