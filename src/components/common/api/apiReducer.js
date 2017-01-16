import * as types from './apiTypes';
import _ from 'lodash';

const initializeState = {
    apiUrl: '',
    method: '',
    component: '',
    label: '',
    body: {}
};
export default function (state = initializeState, action) {
    switch (action.type) {
        case types.SERVER_REQUEST_SEND:
        {
            const details = action.details;
            if(!details){
                return state;
            }
            details.label = types.LABEL_SEND;
            return _.cloneDeep(details);
        }
        case types.SERVER_REQUEST_SUCCEEDED:
        {
            const details = action.details;
            if(!details){
                return state;
            }
            details.label = types.LABEL_SUCCEEDED;
            return _.cloneDeep(details);
        }
        //return _.cloneDeep(action.error);
        case types.SERVER_REQUEST_ERROR:
        {
            const details = action.details;
            if(!details){
                return state;
            }
            details.label = types.LABEL_ERROR;
            return _.cloneDeep(details);
        }
        default:
            return state;
    }
}