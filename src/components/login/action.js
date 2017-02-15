/**
 * Created by matan on 13/12/2016.
 */
import * as types from './constant/actionTypes';
import loginApi from './loginApi';
import * as errorTypes from './constant/errorTypes';


/*
 * action creators
 */
/// the new action !!!!
export function loginChangeUsername(username) {
    return {type: types.LOGIN_USER_NAME_CHANGED, username: username};
}
export function loginChangePassword(password) {
    return {type: types.LOGIN_PASSWORD_CHANGED, password: password};
}
export function loginValidationError(error) {
    return {type: types.LOGIN_VALIDATION_ERROR, error: error};
}
export function loginStartLoading(section) {
    return {type: types.START_LOADING, section: section};
}

export function loginStopLoading(section) {
    return {type: types.STOP_LOADING, section: section};
}

export function loginErrorCredential(error) {
    return {type: types.LOGIN_CREDENTIAL_ERROR, error: error};
}
export function loginErrorUserLocked(error) {
    return {type: types.LOGIN_USER_LOCKED, error: error};
}
export function forgotPasswordClicked() {
    return {type: types.FORGOT_PASSWORD_CLICKED, payload: {}};
}
export function forgotPasswordBackToLogin() {
    return {type: types.FORGOT_PASSWORD_BACK_TO_LOGIN, payload: {}};
}
export function forgotPasswordEmailChange(email) {
    return {type: types.FORGOT_PASSWORD_EMAIL_CHANGED, email: email};
}
export function loginErrorNeedChangePassword(userId) {
    return {type: types.LOGIN_NEED_CHANGE_PASSWORD, userId: userId};
}
export function changePasswordNewPasswordChange(newPassword) {
    return {type: types.CHANGE_PASSWORD_MEW_CHANGED, newPassword: newPassword};
}
export function changePasswordConfirmPasswordChange(confirmNewPassword) {
    return {type: types.CHANGE_PASSWORD_CONFIRM_CHANGED, confirmNewPassword: confirmNewPassword};
}
export function changePasswordValidationError(error) {
    return {type: types.CHANGE_PASSWORD_VALIDATION_ERROR, error: error};
}
export function changePasswordErrorPasswordUsedAlready(error) {
    return {type: types.CHANGE_PASSWORD_PASSWORD_USED, error: error};
}
export function changePasswordErrorUserIdNotExist(error) {
    return {type: types.CHANGE_PASSWORD_ID_UNEXIST, error: error};
}
export function forgotPasswordValidationError(error) {
    return {type: types.FORGOT_PASSWORD_VALIDATION_ERROR, error: error};
}
export function forgotPasswordErrorServerError(error) {
    return {type: types.FORGOT_PASSWORD_ERROR, error: error};
}
export function loginInitializeFormErrors() {
    return {type: types.LOGIN_INIT_ERROR, payload: {}};
}
export function changePasswordInitializeFormErrors() {
    return {type: types.CHANGE_PASSWORD_INIT_ERROR, payload: {}};
}
export function forgotPasswordInitializeFormErrors() {
    return {type: types.FORGOT_PASSWORD_INIT_ERROR, payload: {}};
}
// TODO TEST UNTIL HERE

export function changePassword(loginUser) {
    /**
     *  loginUser = {userId: this.props.changePassword.userId,
     *               newPassword: this.props.changePassword.newPassword,
     *               oldPassword: this.props.login.password}
     **/
    return dispatch => {
        dispatch(loginStartLoading('changePassword'));
        //dispatch(serverRequestSend('changePassword'));
        return loginApi.changePassword(loginUser) // This is return a promise!
            .then(user => {
                dispatch(loginStopLoading('changePassword'));
                //dispatch(serverRequestSucceeded('changePassword'));
                return {
                    user: user
                };
                //return user;
            }).catch(err => {
                dispatch(loginStopLoading('changePassword'));
                //dispatch(serverResponseError('changePassword'));
                const error = {
                    text: err.text,
                    statusCode: err.statusCode
                };
                switch (error.statusCode) {
                    case errorTypes.USER_ID__NOT_EXIST://401: // user id not exist!
                    {
                        dispatch(changePasswordErrorUserIdNotExist(error));
                        break;
                    }
                    case errorTypes.PASSWORD_USED://402: // error password used already!
                    {
                        dispatch(changePasswordErrorPasswordUsedAlready(error));
                        break;
                    }
                    default:
                        break;
                }
                throw error;
                //return error;
            });
    };
}

export function loginMain(loginUser) {
    return dispatch => {
        dispatch(loginStartLoading('login'));
        return loginApi.loginUser(
            {
                userName: loginUser.userName,
                password: loginUser.password,
                realm: loginUser.realm
            }) // This is return a promise!
            .then(user => {
                dispatch(loginStopLoading('login'));
                // stop loading loading
                //dispatch(serverRequestSucceeded('login'));
                return {
                    user: user
                };
            }).catch((err) => {
                dispatch(loginStopLoading('login'));
                // stop loading loading
                /// Todo dispatch serverRequest failed
                let error = {
                    text: err.text,
                    statusCode: err.statusCode
                };
                //dispatch(serverResponseError('login'));
                switch (err.statusCode) {
                    case errorTypes.NEED_CHANGE_PASSWORD://301: // need change password
                        /**
                         get error like this: {text: "..", statusCode: "...", userId: "..."}
                         **/
                        dispatch(loginErrorNeedChangePassword(err.userId));
                        break;
                    case errorTypes.USER_LOCKED://302: // user is locked!
                        error = {
                            text: err.text,
                            statusCode: err.statusCode
                        };
                        dispatch(loginErrorUserLocked(error));
                        break;
                    case errorTypes.CREDENTIAL_ERROR://404: // userName or password incorrect.
                        error = {
                            text: err.text,
                            statusCode: err.statusCode
                        };
                        dispatch(loginErrorCredential(error));
                        break;
                    default:
                        break;
                }
                throw error;
            });
    };
}

/***
 * forgotDetails = {
 *                  email: forgotPassSection.email,
 *                  realm: "careManager"
 *              }
 * */
export function forgotPassword(forgotDetails) {
    return dispatch => {
        dispatch(loginStartLoading('forgotPassword'));
        return loginApi.forgotPassword(forgotDetails) // This is return a promise!
            /**
             * the err/response lock like: {responseText: "...", statusCode: "..."}
             **/
            .then(response => {
                dispatch(loginStopLoading('forgotPassword'));
                return {
                    response: response.responseText,
                    statusCode: response.statusCode
                };
                //return user;
            }).catch(err => {
                dispatch(loginStopLoading('forgotPassword'));
                let error = {
                    text: err.responseText,
                    statusCode: err.statusCode
                };
                switch (error.statusCode) {
                    case errorTypes.GENERAL_ERROR:
                    {
                        dispatch(forgotPasswordErrorServerError(error));
                        break;
                    }
                    default:
                        break;
                }
                throw error;
            });
    };
}
