import * as types from './constant/actionTypes';
export function hideCard() {
    return {type: types.HIDE_CARD, payload: {}};
}
export function showCard() {
    return {type: types.SHOW_CARD, payload: {}};
}
export function hideCardDetails() {
    return {type: types.HIDE_CARD_DETAILS, payload: {}};
}
export function showCardDetails() {
    return {type: types.SHOW_CARD_DETAILS, payload: {}};
}