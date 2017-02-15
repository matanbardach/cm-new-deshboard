/**
 * Created by matan on 13/12/2016.
 */
import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as errorTypes from './constant/errorTypes';
import * as errorText from './constant/errorText';
import * as actions from '../common/api/apiAction';
import * as myStore from '../common/store.service';
import * as apiTypes from '../common/api/apiTypes';
const delay = 1000;
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
        const dispatch = myStore.getStore().dispatch;
        const sendDetails = {
            apiUrl: 'LoginApi.loginUser',
            method: 'get',
            component: 'login',
            label: apiTypes.LABEL_SEND,
            body: {}
        };
        apiSend(sendDetails, dispatch);
        //myStore.getStore().dispatch(actions.apiSend('login'));
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                let possibleUser = users.find(user => user.userName == loginUser.userName);
                if (possibleUser && possibleUser.realm == loginUser.realm && possibleUser.password == loginUser.password) {
                    // locked  errorText errorTypes
                    let isReject = false;
                    if (possibleUser.needChangePassword) {
                        isReject = true;
                        reject({
                            text: errorText.NEED_CHANGE_PASSWORD,//`need change password.`,
                            statusCode: errorTypes.NEED_CHANGE_PASSWORD,//301,
                            userId: possibleUser.id
                        });
                    }
                    if (possibleUser.locked) {
                        isReject = true;
                        reject({
                            text: errorText.USER_LOCKED,//`User is locked. Please contact your administrator.`,
                            statusCode: errorTypes.USER_LOCKED//302
                        });
                    }
                    if (isReject) {
                        const errDetails = {
                            apiUrl: 'LoginApi.loginUser',
                            method: 'get',
                            component: 'login',
                            label: apiTypes.LABEL_ERROR,
                            body: {}
                        };
                        apiError(errDetails, dispatch);
                        //actions.apiError('login');
                        //apiError('login');
                    } else {
                        const successDetails = {
                            apiUrl: 'LoginApi.loginUser',
                            method: 'get',
                            component: 'login',
                            label: apiTypes.LABEL_SUCCEEDED,
                            body: {}
                        };
                        apiSuccess(successDetails, dispatch);
                        //actions.apiSuccess('login');
                        //apiSuccess('login');
                    }
                    resolve(possibleUser);
                } else {
                    const errDetails = {
                        apiUrl: 'LoginApi.loginUser',
                        method: 'get',
                        component: 'login',
                        label: apiTypes.LABEL_ERROR,
                        body: {}
                    };
                    // Todo need add down server error!
                    //this.props.actions.apiError('login');
                    apiError(errDetails, dispatch);
                    //actions.apiError('login');
                    reject({
                        text: errorText.CREDENTIAL_ERROR,//`username or password incorrect.`,
                        statusCode: errorTypes.CREDENTIAL_ERROR,//404,
                        user: loginUser
                    });
                }
            }, delay);
        });


    }

    /**
     * userToChange = {userId: "..", newPassword: "...", oldPassword: "..."}
     **/
    static changePassword(userToChange) {   //{id: userId, newPassword: ..., oldPassword: ...}
        const dispatch = myStore.getStore().dispatch;
        const sendDetails = {
            apiUrl: 'LoginApi.changePassword',
            method: 'post',
            component: 'login',
            label: apiTypes.LABEL_SEND,
            body: {}
        };
        apiSend(sendDetails, dispatch);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let isReject = false;
                let possibleUser = users.find(user => user.id == userToChange.userId);
                if (!possibleUser) {
                    isReject = true;
                    reject({
                        text: errorText.USER_ID__NOT_EXIST,//`user id not exist`,
                        statusCode: errorTypes.USER_ID__NOT_EXIST//401
                    });
                }
                if (userToChange.newPassword == possibleUser.password) {
                    isReject = true;
                    reject({
                        text: errorText.PASSWORD_USED,//`You already used this password, please choose deference one!`,
                        statusCode: errorTypes.PASSWORD_USED//402
                    });
                }
                possibleUser.password = userToChange.newPassword;
                possibleUser.needChangePassword = userToChange.needChangePassword;
                resolve({
                    possibleUser
                });
                if(isReject){
                    const errDetails = {
                        apiUrl: 'LoginApi.changePassword',
                        method: 'post',
                        component: 'login',
                        label: apiTypes.LABEL_ERROR,
                        body: {}
                    };
                    apiError(errDetails, dispatch);
                }else{
                    const successDetails = {
                        apiUrl: 'LoginApi.changePassword',
                        method: 'post',
                        component: 'login',
                        label: apiTypes.LABEL_SUCCEEDED,
                        body: {}
                    };
                    apiSuccess(successDetails, dispatch);
                }

            }, delay);
        });
    }

    static forgotPassword(detail) {
        const dispatch = myStore.getStore().dispatch;
        const sendDetails = {
            apiUrl: 'LoginApi.forgotPassword',
            method: 'post',
            component: 'login',
            label: apiTypes.LABEL_SEND,
            body: {}
        };
        apiSend(sendDetails, dispatch);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (detail.email) {
                    const successDetails = {
                        apiUrl: 'LoginApi.forgotPassword',
                        method: 'post',
                        component: 'login',
                        label: apiTypes.LABEL_SUCCEEDED,
                        body: {}
                    };
                    apiSuccess(successDetails, dispatch);
                    resolve({
                        responseText: "Recovery mail send to above email"
                    });
                } else {
                    const errDetails = {
                        apiUrl: 'LoginApi.forgotPassword',
                        method: 'post',
                        component: 'login',
                        label: apiTypes.LABEL_ERROR,
                        body: {}
                    };
                    apiError(errDetails, dispatch);
                    reject({
                        responseText: errorText.GENERAL_ERROR,//"Server error please contact with your supervisor",
                        statusCode: errorTypes.GENERAL_ERROR//403
                    });
                }

            }, delay);
        });
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
