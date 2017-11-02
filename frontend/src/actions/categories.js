// POSTS //////

// POST CATEGORIES :: CONSTANTS //////
export const GET_POST_CATEGORIES = "GET_POST_CATEGORIES";

// POST CATEGORIES :: ACTIONS //////
export function getCategories(categories) {
    return {
        type: GET_POST_CATEGORIES,
        categories
    };
}
