import * as types from './constant/actionType';
export function cmCallPatient(patientId) {
    return {type: types.CM_CALL_PATIENT, patientId: patientId};
}
export function cmDecline() {
    return {type: types.CM_DECLINE, payload: {}};
}
export function cmHungUp() {
    return {type: types.CM_HUNG_UP, payload: {}};
}
export function patientAnser() {
    return {type: types.PATIENT_ANSWER_VIDEO, payload: {}};
}

export function patientDecline() {
    return {type: types.PATIENT_DECLINE, payload: {}};
}
export function patientHungUp() {
    return {type: types.PATIENT_HUNG_UP, payload: {}};
}
