import * as types from './constant/actionTypes'
export function homeIconClicked() {
    return {type: types.HOME_CLICK, payload: {}};
}
export function alertIconClicked() {
    return {type: types.ALERT_CLICK, payload: {}};
}
export function patientIconClicked() {
    return {type: types.PATIENT_CLICK, payload: {}};
}
export function messageIconClicked() {
    return {type: types.MESSAGE_CLICK, payload: {}};
}
export function carePlanIconClicked() {
    return {type: types.CARE_PLAN_CLICK, payload: {}};
}
//changeLayout
export function changeLayout(section) {
    return {type: types.CHANGE_LAYOUT_SECTION, section: section};
}
