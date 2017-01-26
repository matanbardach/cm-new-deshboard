import * as types from './const/actionTypes';
export function openDialog(section) {
    return {type: types.OPEN_DIALOG, section: section};
}
export function closeDialog(section) {
    return {type: types.CLOSE_DIALOG, section: section};
}
export function changeBuText(butText) {
    return {type: types.CHANGE_DIALOG_BUT_TEXT, butText: butText};
}
