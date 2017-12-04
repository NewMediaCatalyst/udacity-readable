// Actions
import {SET_MATCH, SET_PAGE_TITLE} from '../actions/meta';


// Reducers
export const meta = (state = { title: {app:"",page:"",sep:""}, match: {}}, action) => {

    switch (action.type) {
        case SET_MATCH:
            const {id: setMatchId, category: setMatchCategory} = action.match.params;
            let setMatch = Object.assign({}, action.match);
            setMatch["id"] = setMatchId ? setMatchId : false;
            setMatch["category"] = setMatchCategory ? setMatchCategory : false;
            return {
                title: state.title,
                match: setMatch
            };
        case SET_PAGE_TITLE:
            const {app, sep, page} = action.title;
            let {app: stateApp, sep: stateSep, page: statePage} = state.title;
            return {
                ...state,
                title: {
                    app: app || stateApp,
                    page: page || statePage,
                    sep: sep || stateSep
                }
            };
        default:
            return state;
    }
}
