// META //

export const SET_PAGE_TITLE = "SET_PG_TITLE";
export const SET_MATCH = "SET_MATCH";


export function setPageTitle(title) {
    return {
        type: SET_PAGE_TITLE,
        title
    }
}


// ROUTING // React Router 'match' object

export function setMatch(match) {
    return {
        type: SET_MATCH,
        match
    };
}
