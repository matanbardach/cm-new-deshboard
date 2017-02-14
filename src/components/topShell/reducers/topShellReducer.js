import * as types from '../constant/actionTypes';

const initializeState = {
    urlPath: ['home', 'details']
};
export default function topShellReducer(state = initializeState, action) {
    switch (action.type) {
        case types.SET_URL_PATH:
        {
            return Object.assign({}, state, {
                urlPath: action.initPath
            });
        }
        case types.ADD_TO_URL_PATH:
        {
            return Object.assign({}, state, {
                urlPath: state.urlPath.push(action.addPath)
            });
        }
        default:
            return state;
    }
}
