import * as types from './const/actionTypes';
export function openDialog() {
    return {type: types.OPEN_DIALOG, payload: {}};
}
export function closeDialog() {
    return {type: types.CLOSE_DIALOG, payload: {}};
}
export function changeBuText(butText) {
    return {type: types.CHANGE_DIALOG_BUT_TEXT, butText: butText};
}
export function changeBodyReducer(reducer, params) {
    return {type: types.CHANGE_DIALOG_REDUCER, reducer: reducer, params: params};
}
export function changePageNumActive(pageNum) {
    return {type: types.CHANGE_DIALOG_NUM_ACTIVE, pageNum: pageNum};
}
