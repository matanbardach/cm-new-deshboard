import expect from 'expect';
import * as actions from './apiAction';
import apiReducer from './apiReducer';
import * as apiTypes from './apiTypes';
//import * as errorTypes from '../';
//import * as errorText from '../errorText';
describe('Server Request', () => {
    it('Send request SERVER_REQUEST_SEND', () => {
        const initializeState = {
            apiUrl: 'bdforeUrl',
            method: 'get',
            component: 'login',
            label: 'beforeLogin',
            body: {}
        };
        const details = {
            apiUrl: 'login.checkUrl',
            method: 'get',
            component: 'login',
            body: {text: "tryText",
                    status: 200}
        };
        const action = actions.apiSend(details);
        const newState = apiReducer(initializeState, action);
        expect(newState).toEqual({
            apiUrl: 'login.checkUrl',
            method: 'get',
            component: 'login',
            label: apiTypes.LABEL_SEND,
            body: {text: "tryText",
                status: 200}
        });

    });
    it('Success request SERVER_REQUEST_SUCCEEDED', () => {
        const initializeState = {
            apiUrl: 'bdforeUrl',
            method: 'get',
            component: 'login',
            label: 'beforeLogin',
            body: {}
        };
        const details = {
            apiUrl: 'login.checkUrl',
            method: 'get',
            component: 'login',
            body: {text: "tryText",
                status: 200}
        };
        const action = actions.apiSuccess(details);
        const newState = apiReducer(initializeState, action);
        expect(newState).toEqual({
            apiUrl: 'login.checkUrl',
            method: 'get',
            component: 'login',
            label: apiTypes.LABEL_SUCCEEDED,
            body: {text: "tryText",
                status: 200}
        });
    });
    it('Error request SERVER_REQUEST_ERROR', () => {
        const initializeState = {
            apiUrl: 'bdforeUrl',
            method: 'get',
            component: 'login',
            label: 'beforeLogin',
            body: {}
        };
        const details = {
            apiUrl: 'login.checkUrl',
            method: 'get',
            component: 'login',
            body: {text: "tryText",
                status: 200}
        };
        const action = actions.apiError(details);
        const newState = apiReducer(initializeState, action);
        expect(newState).toEqual({
            apiUrl: 'login.checkUrl',
            method: 'get',
            component: 'login',
            label: apiTypes.LABEL_ERROR,
            body: {text: "tryText",
                status: 200}
        });
    });
    it('Error request details of null SERVER_REQUEST_ERROR', () => {
        const initializeState = {
            apiUrl: 'bdforeUrl',
            method: 'get',
            component: 'login',
            label: 'beforeLogin',
            body: {}
        };
        const details = null;
        const action = actions.apiError(details);
        const newState = apiReducer(initializeState, action);
        expect(newState).toEqual({
            apiUrl: 'bdforeUrl',
            method: 'get',
            component: 'login',
            label: 'beforeLogin',
            body: {}
        });
    });

});