// POSTS //////

// POST CATEGORIES :: CONSTANTS //////

export const SET_CATEGORY = "SET_CATEGORY";

export const GET_POST_CATEGORIES = "GET_POST_CATEGORIES";


// POST CATEGORIES :: ACTIONS //////
export function getCategories(categories) {
    return {
        type: GET_POST_CATEGORIES,
        categories
    };
}

export function setCategory(category) {
    return {
        type: SET_CATEGORY,
        category
    };
}
