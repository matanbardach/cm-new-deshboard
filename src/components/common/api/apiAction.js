import * as apiTypes from './apiTypes';

export function apiSend(details){
    return {type: apiTypes.SERVER_REQUEST_SEND, details: details};
}
export function apiSuccess(details){
    return {type: apiTypes.SERVER_REQUEST_SUCCEEDED, details: details};
}
export function apiError(details){
    return {type: apiTypes.SERVER_REQUEST_ERROR, details: details};
}
