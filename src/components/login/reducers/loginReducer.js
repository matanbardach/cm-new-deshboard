import * as types from '../constant/actionTypes';
import _ from 'lodash';

const initializeState = {
    loading: false,
    userName: "",
    password: "",
    userNameErrorText: "",
    passwordErrorText: "",
    loginFailedText: ""
};
export default function loginReducer(state = {}, action) {
    /**
     * Initialize login state.
     * */
    if (!state.login) {
        state.login = initializeState;
    }
    if (!state.currentSection) {
        state.currentSection = 'login';
    }
    let login, section, forgotPassword, changePassword;
    switch (action.type) {
        //// new action
        case types.LOGIN_USER_NAME_CHANGED:
        {
            login = _.cloneDeep(state.login);
            login.userName = action.username;
            return Object.assign({}, state, {
                login: login
            });
        }
        case types.LOGIN_PASSWORD_CHANGED:
        {
            login = _.cloneDeep(state.login);
            login.password = action.password;
            return Object.assign({}, state, {
                login: login
            });
        }
        case types.LOGIN_INIT_ERROR:
        {
            login = _.cloneDeep(state.login);
            login.userNameErrorText = "";
            login.passwordErrorText = "";
            login.loginFailedText = "";
            return Object.assign({}, state, {
                login: login
            });
        }
        case types.LOGIN_VALIDATION_ERROR:
        {
            login = _.cloneDeep(state.login);
            //login.loading = false;
            login.userNameErrorText = "";
            login.passwordErrorText = "";
            if (action.error) {
                if (action.error.userName) {
                    login.userNameErrorText = action.error.userName;
                }
                if (action.error.password) {
                    login.passwordErrorText = action.error.password;
                }
            }
            return Object.assign({}, state, {
                login: login
            });
        }
        //case types.SERVER_REQUEST_SEND:
        //{
        //    section = _.cloneDeep(state[action.section]);
        //    if (section) {
        //        section.loading = true;
        //    } else {
        //        return state;
        //    }
        //
        //    const a = {};
        //    a[action.section] = section;
        //
        //    return  Object.assign({}, state, a);
        //
        //}
        //case types.SERVER_REQUEST_SUCCEEDED:
        //{
        //    section = _.cloneDeep(state[action.section]);
        //    if (section) {
        //        section.loading = false;
        //    } else {
        //        return state;
        //    }
        //
        //    const a = {};
        //    a[action.section] = section;
        //
        //    return  Object.assign({}, state, a);
        //}
        case types.START_LOADING: {
            section = _.cloneDeep(state[action.section]);
            if (section) {
                section.loading = true;
            } else {
                return state;
            }

            const a = {};
            a[action.section] = section;

            return  Object.assign({}, state, a);
        }
        case types.STOP_LOADING: {
            section = _.cloneDeep(state[action.section]);
            if (section) {
                section.loading = false;
            } else {
                return state;
            }

            const a = {};
            a[action.section] = section;

            return  Object.assign({}, state, a);
        }
        //case types.SERVER_REQUEST_ERROR:
        //{
        //    section = _.cloneDeep(state[action.section]);
        //    if (section) {
        //        section.loading = false;
        //    } else {
        //        return state;
        //    }
        //
        //    const a = {};
        //    a[action.section] = section;
        //
        //    return  Object.assign({}, state, a);
        //}
        //return state;
        case types.LOGIN_CREDENTIAL_ERROR:
        {
            section = _.cloneDeep(state['login']);
            if (section) {
                section.loginFailedText = action.error.text;
            }
            return Object.assign({}, state, {
                login: section
            });
        }
        case types.LOGIN_USER_LOCKED:
        {
            login = _.cloneDeep(state.login);
            login.loginFailedText = action.error.text;
            return Object.assign({}, state, {
                login: login
            });
        }
        case types.FORGOT_PASSWORD_CLICKED:
        {
            // moved to forgot password section
            let email = "";
            if(state.forgotPassword && state.forgotPassword.email){
                email = state.forgotPassword.email;
            }
            return Object.assign({}, state, {
                currentSection: 'forgotPassword',
                forgotPassword: {
                    email: email,
                    loading: false,
                    recoveryPasswordError: ""
                }
            });
        }
        case types.FORGOT_PASSWORD_EMAIL_CHANGED:
        {
            forgotPassword = _.cloneDeep(state.forgotPassword);
            forgotPassword.email = "";
            if (action.email) {
                forgotPassword.email = action.email;
            }
            return Object.assign({}, state, {
                forgotPassword: forgotPassword
            });
        }
        case types.FORGOT_PASSWORD_BACK_TO_LOGIN:
        {
            return Object.assign({}, state, {
                currentSection: 'login'
            });
        }
        case types.LOGIN_NEED_CHANGE_PASSWORD:
        {
            //changePassword = _.cloneDeep(state['changePassword']);
            changePassword = {
                userId: action.userId,
                newPassword: '',
                confirmNewPassword: '',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: ""
                }
            };
            return Object.assign({}, state, {
                currentSection: 'changePassword',
                changePassword: changePassword
            });
        }
        case types.CHANGE_PASSWORD_MEW_CHANGED:
        {
            changePassword = _.cloneDeep(state.changePassword);
            if (!changePassword) {
                return state;
            }
            changePassword.newPassword = "";
            if (action.newPassword) {
                changePassword.newPassword = action.newPassword;
            }
            return Object.assign({}, state, {
                changePassword: changePassword
            });
        }
        case types.CHANGE_PASSWORD_CONFIRM_CHANGED:
        {
            changePassword = _.cloneDeep(state.changePassword);
            if (!changePassword) {
                return state;
            }
            changePassword.confirmNewPassword = "";
            if (action.confirmNewPassword) {
                changePassword.confirmNewPassword = action.confirmNewPassword;
            }
            return Object.assign({}, state, {
                changePassword: changePassword
            });
        }
        case types.CHANGE_PASSWORD_INIT_ERROR:
        {
            changePassword = _.cloneDeep(state.changePassword);
            changePassword.error = {
                newPassword: "",
                confirmNewPassword: "",
                changePasswordFailedText: ""
            };
            return Object.assign({}, state, {
                changePassword: changePassword
            });
        }
        case types.CHANGE_PASSWORD_VALIDATION_ERROR:
        {
            changePassword = _.cloneDeep(state.changePassword);
            if (action.error) {
                if (action.error.newPassword) {
                    changePassword.error.newPassword = action.error.newPassword;
                }
                if (action.error.confirmNewPassword) {
                    changePassword.error.confirmNewPassword = action.error.confirmNewPassword;
                }
                if (action.error.changePasswordFailedText) {
                    changePassword.error.changePasswordFailedText = action.error.changePasswordFailedText;
                }
            }
            return Object.assign({}, state, {
                changePassword: changePassword
            });
        }
        case types.CHANGE_PASSWORD_PASSWORD_USED:
        {
            changePassword = _.cloneDeep(state.changePassword);
            if(!changePassword.error){
                changePassword.error = {};
            }
            changePassword.error.changePasswordFailedText = action.error.text;
            return Object.assign({}, state, {
                changePassword: changePassword
            });

        }
        case types.CHANGE_PASSWORD_SERVER_ERROR:
        {
            changePassword = _.cloneDeep(state.changePassword);
            if(!changePassword.error){
                changePassword.error = {};
            }
            changePassword.error.changePasswordFailedText = action.error.text;
            return Object.assign({}, state, {
                changePassword: changePassword
            });
        }
        case types.CHANGE_PASSWORD_ID_UNEXIST:
        {
            changePassword = _.cloneDeep(state.changePassword);
            if(!changePassword.error){
                changePassword.error = {};
            }
            changePassword.error.changePasswordFailedText = action.error.text;
            return Object.assign({}, state, {
                changePassword: changePassword
            });

        } // FORGOT_PASSWORD_FORM_SUBMITTED
        case types.FORGOT_PASSWORD_INIT_ERROR:
        {
            forgotPassword = _.cloneDeep(state.forgotPassword);
            forgotPassword.recoveryPasswordError = "";
            return Object.assign({}, state, {
                forgotPassword: forgotPassword
            });
        }//
        case types.FORGOT_PASSWORD_VALIDATION_ERROR:
        {
            forgotPassword = _.cloneDeep(state.forgotPassword);
            forgotPassword.recoveryPasswordError = action.error.text;
            return Object.assign({}, state, {
                forgotPassword: forgotPassword
            });
        }
        case types.FORGOT_PASSWORD_ERROR:
        {
            forgotPassword = _.cloneDeep(state.forgotPassword);
            forgotPassword.recoveryPasswordError = action.error.text;
            return Object.assign({}, state, {
                forgotPassword: forgotPassword
            });
        }
        default:
            return state;
    }
}
