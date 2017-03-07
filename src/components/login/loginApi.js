/**
 * Created by matan on 13/12/2016.
 */
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {browserHistory } from 'react-router';
import * as errorTypes from './constant/errorTypes';
import * as errorText from './constant/errorText';
import * as actions from '../common/api/apiAction';
import * as myStore from '../common/store.service';
import * as apiTypes from '../common/api/apiTypes';
const delay = 1000;
import * as configuration from '../config';
// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const users = [
    {
        id: 1,
        userName: 'aaaaaa',
        password: 'aaa',
        realm: 'CareManager',
        token: 'nr4ty3456tni34jk56tn',
        needChangePassword: true,
        locked: false
    },
    {
        id: 2,
        userName: 'bbbbbb',
        password: 'bbb',
        realm: 'CareManager',
        token: 'wero4nyt43oytn34tygn3hg',
        needChangePassword: true,
        locked: false
    },
    {
        id: 3,
        userName: 'cccccc',
        password: 'ccc',
        realm: 'House',
        token: '4w32tyh23u4nty234ntj423tg',
        needChangePassword: true,
        locked: false
    },
    {
        id: 4,
        userName: 'dddddd',
        password: 'ddd',
        realm: 'CareManager',
        token: '4i0t34tn349kjt34tkj34fs345gtg4',
        needChangePassword: false,
        locked: true
    },
    {
        id: 5,
        userName: 'eeeeee',
        password: 'eee',
        realm: 'CareManager',
        token: 'nswg43it234jt2tgj4',
        needChangePassword: false,
        locked: false
    }
];

function apiSend(details, dispatch) {
    //dispatch(actions.apiSend({type: apiTypes.SERVER_REQUEST_SEND, details: details}));
    dispatch(actions.apiSend(details));
}

function apiSuccess(details, dispatch) {
    //dispatch(actions.apiSuccess({type: apiTypes.SERVER_REQUEST_SUCCEEDED, details: details}));
    dispatch(actions.apiSuccess(details));
}

function apiError(details, dispatch) {
    //dispatch(actions.apiError({type: apiTypes.SERVER_REQUEST_ERROR, details: details}));
    dispatch(actions.apiError(details));
}


//This would be performed on the server in a real app. Just stubbing in.

// ,ock login pai
/*class Api {
 constructor(section) {
 this.section = section;
 }

 get (url) {
 dispatch(serverRequestSend(this.section));
 return new Promise((resolve, reject) => {
 //if success
 dispatch(serverRequestSucceeded(this.section));
 //If error
 dispatch(serverResponseError(this.section));
 });
 }

 post() {

 }
 }*/

class LoginApi {
//class LoginApi {
    static loginUser(loginUser) {
        const baseUrl = configuration.getConfig().baseUrl;
        const apiUrl = baseUrl+'/Users/login';
        function parseJSON(response) {
            return response.json();
        }
        const dispatch = myStore.getStore().dispatch;
        const sendDetails = {
            apiUrl: apiUrl,
            method: 'post',
            component: 'login',
            label: apiTypes.LABEL_SEND,
            body: loginUser
        };
        apiSend(sendDetails, dispatch);
        //myStore.getStore().dispatch(actions.apiSend('login'));

        function post(url, data){
            return request('POST', url, data);
        }

        function get(url){
            return request('GET', url);
        }

        function request(method, url, data) {
            return new Promise((resolve, reject) => {
                fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(parseJSON)
                .then(function(userResponse){
                    //return new Promise((resolve, reject) => {
                        //const statusCode = userResponse.status;
                        // user need change password
                        if(userResponse.resetPasswordRequired){
                            // set the user and the access token!
                            const successDetails = {
                                apiUrl: url,
                                method: method,
                                component: 'login',
                                label: apiTypes.LABEL_SUCCEEDED,
                                body: userResponse
                            };
                            apiSuccess(successDetails, dispatch);
                            // save the user at the localStorage
                            configuration.setUser(userResponse);
                            configuration.setAccessToken(userResponse.id);
                            // Todo need check if need save the token - need to save!
                            reject({
                                text: errorText.NEED_CHANGE_PASSWORD,//`need change password.`,
                                statusCode: errorTypes.NEED_CHANGE_PASSWORD,//301,
                                userId: userResponse.userId
                            });
                        }// user field to login - credential error
                        else if(userResponse.error && userResponse.error.status == 401){
                            // if user is locked!
                            if(userResponse.error.code == "ACCESS_LOCKED"){//"code":"ACCESS_LOCKED"
                                reject({
                                    text: errorText.USER_LOCKED,//`User is locked. Please contact your administrator.`,
                                    statusCode: errorTypes.USER_LOCKED//302
                                });
                            }
                            else{
                                reject({
                                    text: errorText.CREDENTIAL_ERROR,//`username or password incorrect.`,
                                    statusCode: errorTypes.CREDENTIAL_ERROR,//404,
                                    user: loginUser
                                });
                            }
                        }else if(userResponse.id){// success to login if there is access token!
                            const successDetails = {
                                apiUrl: 'LoginApi.loginUser',
                                method: 'get',
                                component: 'login',
                                label: apiTypes.LABEL_SUCCEEDED,
                                body: userResponse
                            };
                            apiSuccess(successDetails, dispatch);
                            // save the user at the localStorage
                            configuration.setUser(userResponse);
                            configuration.setAccessToken(userResponse.id);
                            // save this user at session.storage!
                            browserHistory.push('/home');
                        }
                        else{
                            /* eslint-disable no-console*/
                            console.log("There is else response: ", userResponse);
                        }

                    /*
                        if (statusCode >= 200 && statusCode < 300)
                        {
                            // if is success
                            // if need reset password
                            //console.log("The user from api: ", userResponse);
                            console.log("The api response userId: ", userResponse.userId);
                            if(userResponse.resetPasswordRequired){
                                reject({
                                    text: errorText.NEED_CHANGE_PASSWORD,//`need change password.`,
                                    statusCode: errorTypes.NEED_CHANGE_PASSWORD,//301,
                                    userId: userResponse.userId
                                });
                            }
                            else{ // login successfuly
                                // need also save the userResponse in seesion storage!!!!
                                const successDetails = {
                                    apiUrl: url,
                                    method: method,
                                    component: 'login',
                                    label: apiTypes.LABEL_SUCCEEDED,
                                    body: userResponse
                                };
                                apiSuccess(successDetails, dispatch);
                                console.log("Login succedd!!");
                                browserHistory.push('/home');
                            }

                        }
                        else
                        {
                            console.log("The api response is error: ", userResponse);
                            // if it failed
                            //let isReject = true;
                            const errDetails = {
                                apiUrl: url,
                                method: method,
                                component: 'login',
                                label: apiTypes.LABEL_ERROR,
                                body: {}
                            };
                            apiError(errDetails, dispatch);

                            if (userResponse.resetPasswordRequired) {
                                reject({
                                    text: errorText.NEED_CHANGE_PASSWORD,//`need change password.`,
                                    statusCode: errorTypes.NEED_CHANGE_PASSWORD,//301,
                                    userId: userResponse.id
                                });
                            }
                            if(userResponse && userResponse.data && userResponse.data.error && userResponse.data.error.code == 'ACCESS_LOCKED'){
                                reject({
                                    text: errorText.USER_LOCKED,//`User is locked. Please contact your administrator.`,
                                    statusCode: errorTypes.USER_LOCKED//302
                                });
                            }
                            else{
                                reject({
                                    text: errorText.CREDENTIAL_ERROR,//`username or password incorrect.`,
                                    statusCode: errorTypes.CREDENTIAL_ERROR,//404,
                                    user: loginUser
                                });
                            }
                        }
                    */
                });
            });
        }
        const data = {
            "password" : loginUser.password,
            "realm": loginUser.realm,
            "username": loginUser.userName

        };
        return post(apiUrl, data);

        //if(false){
        //    return new Promise((resolve, reject) => {
        //        setTimeout(() => {
        //
        //            let possibleUser = users.find(user => user.userName == loginUser.userName);
        //            if (possibleUser && possibleUser.realm == loginUser.realm && possibleUser.password == loginUser.password)
        //            {
        //                // locked  errorText errorTypes
        //                let isReject = false;
        //                if (possibleUser.needChangePassword) {
        //                    isReject = true;
        //                    reject({
        //                        text: errorText.NEED_CHANGE_PASSWORD,//`need change password.`,
        //                        statusCode: errorTypes.NEED_CHANGE_PASSWORD,//301,
        //                        userId: possibleUser.id
        //                    });
        //                }
        //                if (possibleUser.locked) {
        //                    isReject = true;
        //                    reject({
        //                        text: errorText.USER_LOCKED,//`User is locked. Please contact your administrator.`,
        //                        statusCode: errorTypes.USER_LOCKED//302
        //                    });
        //                }
        //                if (isReject) {
        //                    const errDetails = {
        //                        apiUrl: 'LoginApi.loginUser',
        //                        method: 'get',
        //                        component: 'login',
        //                        label: apiTypes.LABEL_ERROR,
        //                        body: {}
        //                    };
        //                    apiError(errDetails, dispatch);
        //                    //actions.apiError('login');
        //                    //apiError('login');
        //                } else {
        //                    const successDetails = {
        //                        apiUrl: 'LoginApi.loginUser',
        //                        method: 'get',
        //                        component: 'login',
        //                        label: apiTypes.LABEL_SUCCEEDED,
        //                        body: {}
        //                    };
        //                    apiSuccess(successDetails, dispatch);
        //                    //actions.apiSuccess('login');
        //                    //apiSuccess('login');
        //                }
        //                resolve(possibleUser);
        //            }
        //            else
        //            {
        //                const errDetails = {
        //                    apiUrl: 'LoginApi.loginUser',
        //                    method: 'get',
        //                    component: 'login',
        //                    label: apiTypes.LABEL_ERROR,
        //                    body: {}
        //                };
        //                // Todo need add down server error!
        //                //this.props.actions.apiError('login');
        //                apiError(errDetails, dispatch);
        //                //actions.apiError('login');
        //                reject({
        //                    text: errorText.CREDENTIAL_ERROR,//`username or password incorrect.`,
        //                    statusCode: errorTypes.CREDENTIAL_ERROR,//404,
        //                    user: loginUser
        //                });
        //            }
        //        }, delay);
        //    });
        //}




    }

    /**
     * userToChange = {userId: "..", newPassword: "...", oldPassword: "..."}
     **/
    static changePassword(userToChange) {   //{id: userId, newPassword: ..., oldPassword: ...}
        const dispatch = myStore.getStore().dispatch;
        const baseUrl = configuration.getConfig().baseUrl;
        const userId = userToChange.userId;
        const apiUrl = baseUrl+'/Users/'+userId+'/change-password';
        const sendDetails = {
            apiUrl: apiUrl,
            method: 'post',
            component: 'login',
            label: apiTypes.LABEL_SEND,
            body: userToChange
        };
        apiSend(sendDetails, dispatch);

        function post(url, data){
            return request('POST', url, data);
        }
        function request(method, url, data) {
            function parseJSON(response) {
                return response.json();
            }
            return new Promise((resolve, reject) => {
                fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': configuration.getAccessToken()
                    },
                    body: JSON.stringify(data)
                })
                .then(parseJSON)
                .then(function(response){
                            if (response.success) { // if is success
                                const successDetails = {
                                    apiUrl: url,
                                    method: method,
                                    component: 'login',
                                    label: apiTypes.LABEL_SUCCEEDED,
                                    body: {}
                                };
                                apiSuccess(successDetails, dispatch);
                                // Go to home screen!
                                resolve(response);

                            }// you used this password alredy!
                            else if(response.error && response.error.status == 409){
                                // if it failed
                                //let isReject = true;
                                const errDetails = {
                                    apiUrl: url,
                                    method: method,
                                    component: 'login',
                                    label: apiTypes.LABEL_ERROR,
                                    body: response
                                };
                                apiError(errDetails, dispatch);

                                reject({
                                    text: errorText.PASSWORD_USED,//`You already used this password, please choose deference one!`,
                                    statusCode: errorTypes.PASSWORD_USED//409
                                });
                            }else{
                                const errDetails = {
                                    apiUrl: url,
                                    method: method,
                                    component: 'login',
                                    label: apiTypes.LABEL_ERROR,
                                    body: response
                                };
                                apiError(errDetails, dispatch);

                                reject({
                                    text: errorText.GENERAL_ERROR,//`You already used this password, please choose deference one!`,
                                    statusCode: errorTypes.GENERAL_ERROR//409
                                });
                            }
                    });
            });
        }

        const data = {
            "confirmation": userToChange.newPassword,
            "password": userToChange.newPassword

        };
        return post(apiUrl, data);

        //if(false){
        //    return new Promise((resolve, reject) => {
        //        setTimeout(() => {
        //            let isReject = false;
        //            let possibleUser = users.find(user => user.id == userToChange.userId);
        //            if (!possibleUser) {
        //                isReject = true;
        //                reject({
        //                    text: errorText.USER_ID__NOT_EXIST,//`user id not exist`,
        //                    statusCode: errorTypes.USER_ID__NOT_EXIST//401
        //                });
        //            }
        //            if (userToChange.newPassword == possibleUser.password) {
        //                isReject = true;
        //                reject({
        //                    text: errorText.PASSWORD_USED,//`You already used this password, please choose deference one!`,
        //                    statusCode: errorTypes.PASSWORD_USED//402
        //                });
        //            }
        //            possibleUser.password = userToChange.newPassword;
        //            possibleUser.needChangePassword = userToChange.needChangePassword;
        //            resolve({
        //                possibleUser
        //            });
        //            if(isReject){
        //                const errDetails = {
        //                    apiUrl: 'LoginApi.changePassword',
        //                    method: 'post',
        //                    component: 'login',
        //                    label: apiTypes.LABEL_ERROR,
        //                    body: {}
        //                };
        //                apiError(errDetails, dispatch);
        //            }else{
        //                const successDetails = {
        //                    apiUrl: 'LoginApi.changePassword',
        //                    method: 'post',
        //                    component: 'login',
        //                    label: apiTypes.LABEL_SUCCEEDED,
        //                    body: {}
        //                };
        //                apiSuccess(successDetails, dispatch);
        //            }
        //
        //        }, delay);
        //    });
        //}

    }

    static forgotPassword(detail) {
        const baseUrl = configuration.getConfig().baseUrl;
        const apiUrl = baseUrl+'/Users/reset';
        const dispatch = myStore.getStore().dispatch;
        function parseJSON(response) {
            //return response.json();
            return response;
        }
        const sendDetails = {
            apiUrl: apiUrl,
            method: 'post',
            component: 'login',
            label: apiTypes.LABEL_SEND,
            body: detail
        };
        apiSend(sendDetails, dispatch);
        function request(method, url, data) {
            return new Promise((resolve, reject) => {
                fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(parseJSON)
                    .then(function(resetResponse){
                        //return new Promise((resolve, reject) => {
                        if (resetResponse.status >= 200 && resetResponse.status < 300){
                            const successDetails = {
                                apiUrl: url,
                                method: method,
                                component: 'login',
                                label: apiTypes.LABEL_SUCCEEDED,
                                body: resetResponse
                            };
                            apiSuccess(successDetails, dispatch);
                            resolve(resetResponse);
                        }else{
                            reject(resetResponse);
                        }
                    });
            });
        }
        function post(url, data){
            return request('POST', url, data);
        }
        const data = {
            "email" : detail.email,
            "realm": detail.realm
        };
        return post(apiUrl, data);
        //if(false){
        //    return new Promise((resolve, reject) => {
        //        setTimeout(() => {
        //            if (detail.email) {
        //                const successDetails = {
        //                    apiUrl: 'LoginApi.forgotPassword',
        //                    method: 'post',
        //                    component: 'login',
        //                    label: apiTypes.LABEL_SUCCEEDED,
        //                    body: {}
        //                };
        //                apiSuccess(successDetails, dispatch);
        //                resolve({
        //                    responseText: "Recovery mail send to above email"
        //                });
        //            } else {
        //                const errDetails = {
        //                    apiUrl: 'LoginApi.forgotPassword',
        //                    method: 'post',
        //                    component: 'login',
        //                    label: apiTypes.LABEL_ERROR,
        //                    body: {}
        //                };
        //                apiError(errDetails, dispatch);
        //                reject({
        //                    responseText: errorText.GENERAL_ERROR,//"Server error please contact with your supervisor",
        //                    statusCode: errorTypes.GENERAL_ERROR//403
        //                });
        //            }
        //
        //        }, delay);
        //    });
        //}

    }

}

LoginApi.propTypes = {
    actions: PropTypes.object.isRequired
};
function mapStateToProps(state, ownProps) {
    return {
        api: state.apiReducer
    };
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginApi);
//export default LoginApi;
