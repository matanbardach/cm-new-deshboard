import * as types from './constant/actionTypes';
export function addToPath(addPath) {
    return {type: types.ADD_TO_URL_PATH, addPath: addPath};
}
export function initializePath(initPath) {
    return {type: types.SET_URL_PATH, initPath: initPath};
}