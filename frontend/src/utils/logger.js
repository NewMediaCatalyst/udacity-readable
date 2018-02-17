// logging for Redux Middleware
const logger = (store) => (next) => (action) => {

    switch (action.type) {
        case undefined:
            console.group("Thunking...");
            let resultUndef = next(action);
            console.groupEnd("...END Thunk");
            return resultUndef;
        default:
            console.group(action.type);
            console.info('dispatching: ', action);
            let result = next(action);
            console.log('next state: ', store.getState());
            console.groupEnd(action.type);
            return result;
    }
}

export default logger;