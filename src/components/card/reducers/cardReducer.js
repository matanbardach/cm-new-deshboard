import * as types from '../constant/actionTypes';
const initializeState = {
    sowMe: true
};
export default function cardReducer(state = initializeState, action) {
    switch (action.type) {
        //case types.SHOW_CARD:
        //{
        //    return Object.assign({}, state, {
        //        sowMe: true
        //    });
        //}
        //case types.HIDE_CARD:
        //{
        //    return Object.assign({}, state, {
        //        sowMe: false
        //    });
        //}
        default:
            return state;
    }
}
