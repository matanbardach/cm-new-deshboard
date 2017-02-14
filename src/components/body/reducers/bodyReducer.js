import * as types from '../constant/actionTypes';
const initializeState = {
    showCard: false,
    showCardDetails: false,
    showFullBody: true
};
export default function bodyReducer(state = initializeState, action) {
    switch (action.type) {
        case types.SHOW_CARD:
        {
            return Object.assign({}, state, {
                showCard: true
            });
        }
        case types.HIDE_CARD:
        {
            return Object.assign({}, state, {
                showCard: false
            });
        }
        case types.SHOW_CARD_DETAILS:
        {
            return Object.assign({}, state, {
                showCardDetails: true
            });
        }
        case types.HIDE_CARD_DETAILS:
        {
            return Object.assign({}, state, {
                showCardDetails: false
            });
        }
        default:
            return state;
    }
}
