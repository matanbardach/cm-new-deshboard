import * as types from '../const/actionTypes';
const initializeState = {open: false};

export default function dialogReducer(state = initializeState, action) {
    switch (action.type) {
        case types.OPEN_DIALOG:
        {
            return Object.assign({}, state, {
                open: true
            });
        }
        case types.CLOSE_DIALOG:
        {
            return Object.assign({}, state, {
                open: false
            });
        }
        default:
            return state;
    }
}
