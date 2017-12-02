// Actions
import {SET_MATCH} from '../actions/meta';


// Reducers
export const meta = (state = { title: {}, match: {}}, action) => {

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
        default:
            return state;
    }
}
