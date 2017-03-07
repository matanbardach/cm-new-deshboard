/**
 * Created by matan on 28/12/2016.
 */
import expect from 'expect';
import loginReducer from './loginReducer';
import * as actions from '../action';
import * as errorTypes from '../constant/errorTypes';
import * as errorText from '../constant/errorText';


describe('Login Reducer', () => {
    it('login change user name LOGIN_USER_NAME_CHANGED', () => {
        const initialState = {
            login: {
                loading: false,
                userName: "",
                password: "",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            }
        };
        /////1111111111111
        const actionUserNameChange1 = actions.loginChangeUsername("chaneTo");
        // act
        const newState1 = loginReducer(initialState, actionUserNameChange1);
        expect(newState1.login).toEqual({
            loading: false,
            userName: "chaneTo",
            password: "",
            userNameErrorText: "",
            passwordErrorText: "",
            loginFailedText: ""
        });

        ////////22222222222222222222222222222
        const actionUserNameChange2 = actions.loginChangeUsername("");
        // act
        const newState2 = loginReducer(newState1, actionUserNameChange2);
        expect(newState2.login).toEqual({
            loading: false,
            userName: "",
            password: "",
            userNameErrorText: "",
            passwordErrorText: "",
            loginFailedText: ""
        });

    });
    it('login change password LOGIN_PASSWORD_CHANGED', () => {
        const initialState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            }
        };
        /////1111111111111
        const actionUserNameChange1 = actions.loginChangePassword("tryPassword");
        // act
        const newState1 = loginReducer(initialState, actionUserNameChange1);
        expect(newState1.login).toEqual({
            loading: false,
            userName: "simple userName",
            password: "tryPassword",
            userNameErrorText: "",
            passwordErrorText: "",
            loginFailedText: ""
        });
        ////////22222222222222222222222222222
        const actionUserNameChange2 = actions.loginChangePassword("");
        // act
        const newState2 = loginReducer(newState1, actionUserNameChange2);
        expect(newState2.login).toEqual({
            loading: false,
            userName: "simple userName",
            password: "",
            userNameErrorText: "",
            passwordErrorText: "",
            loginFailedText: ""
        });

    });
    it('login validation error LOGIN_VALIDATION_ERROR', () => {
        const initialState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            }
        };
        let error = {
            userName: "Please insert userName.",
            password: "Please insert password"
        };
        /////1111111111111
        const actionUserNameChange1 = actions.loginValidationError(error);
        // act
        const newState1 = loginReducer(initialState, actionUserNameChange1);
        expect(newState1.login).toEqual({
            loading: false,
            userName: "simple userName",
            password: "user password!",
            userNameErrorText: "Please insert userName.",
            passwordErrorText: "Please insert password",
            loginFailedText: ""
        });
        ////22222222222222222222
        let error1 = {
            password: "Please insert password"
        };
        const actionUserNameChange2 = actions.loginValidationError(error1);
        // act
        const newState2 = loginReducer(newState1, actionUserNameChange2);
        expect(newState2.login).toEqual({
            loading: false,
            userName: "simple userName",
            password: "user password!",
            userNameErrorText: "",
            passwordErrorText: "Please insert password",
            loginFailedText: ""
        });

    });
});


describe('Login error handler', () => {
    it('login error credential LOGIN_CREDENTIAL_ERROR', () => {
        const initialState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            currentSection: 'login'
        };
        let error =
        {
            text: errorText.CREDENTIAL_ERROR,//`username or password incorrect.`,
            statusCode: errorTypes.CREDENTIAL_ERROR//404
        };

        /////1111111111111
        const actionServerRequest = actions.loginErrorCredential(error);
        // act
        const newState1 = loginReducer(initialState, actionServerRequest);
        expect(newState1).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: error.text
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            currentSection: 'login'
        });

    });
    it('login error user locked LOGIN_USER_LOCKED', () => {
        const initialState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            currentSection: 'login'
        };
        let error =
        {
            text: errorText.USER_LOCKED,//`User is locked. Please contact your administrator.`,
            statusCode: errorTypes.USER_LOCKED//302
        };

        /////1111111111111
        const actionServerRequest = actions.loginErrorUserLocked(error);
        // act
        const newState1 = loginReducer(initialState, actionServerRequest);
        expect(newState1).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: error.text
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            currentSection: 'login'
        });
    });
    it('login error user need change password LOGIN_NEED_CHANGE_PASSWORD', () => {
        const initialState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            currentSection: 'login'
        };
        let error =
        {
            text: errorText.NEED_CHANGE_PASSWORD,//`need change password.`,
            statusCode: errorTypes.NEED_CHANGE_PASSWORD,//301,
            userId: 4
        };

        /////1111111111111
        const actionServerRequest = actions.loginErrorNeedChangePassword(error.userId);
        // act
        const newState1 = loginReducer(initialState, actionServerRequest);
        expect(newState1).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: error.userId,
                newPassword: '',
                confirmNewPassword: '',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: ""
                }
            },
            currentSection: 'changePassword'
        });
    });
    it("login form's errors to null", () => {
        const initializeState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "user name error...",
                passwordErrorText: "password error ... ",
                loginFailedText: "global error ..."
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            currentSection: 'login'
        };
        const action = actions.loginInitializeFormErrors();
        const newState = loginReducer(initializeState, action);
        expect(newState).toEqual(
            {
                login: {
                    loading: false,
                    userName: "simple userName",
                    password: "user password!",
                    userNameErrorText: "",
                    passwordErrorText: "",
                    loginFailedText: ""
                },
                changePassword: {
                    loading: false,
                    changePasswordFailedText: ""
                },
                currentSection: 'login'
            }
        );

    });
});

// FORGOT_PASSWORD_CLICKED
describe('Forgot password', () => {
    it('forgot password clicked FORGOT_PASSWORD_CLICKED', () => {
        const initialState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            currentSection: 'login'
        };

        /////1111111111111
        const actionServerRequest = actions.forgotPasswordClicked();
        // act
        const newState1 = loginReducer(initialState, actionServerRequest);
        expect(newState1).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            forgotPassword: {
                email: "",
                loading: false,
                recoveryPasswordError: ""
            },
            currentSection: 'forgotPassword'
        });
        ///////// 2222222222222222222222222
        const initialState2 = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            forgotPassword: {
                email: "sdfrkghs@ersdgsd.com",
                loading: false,
                recoveryPasswordError: ""
            },
            currentSection: 'login'
        };
        const actionServerRequest1 = actions.forgotPasswordClicked();
        const newState2 = loginReducer(initialState2, actionServerRequest1);
        expect(newState2).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            forgotPassword: {
                email: "sdfrkghs@ersdgsd.com",
                loading: false,
                recoveryPasswordError: ""
            },
            currentSection: 'forgotPassword'
        });

    });
    it('forgot password email changed FORGOT_PASSWORD_EMAIL_CHANGED', () => {
        const initialState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            currentSection: 'forgotPassword',
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: ""
            }
        };

        /////1111111111111
        const actionServerRequest = actions.forgotPasswordEmailChange("adfbfsbds@bfdsbf.com");
        // act
        const newState1 = loginReducer(initialState, actionServerRequest);
        expect(newState1).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            currentSection: 'forgotPassword',
            forgotPassword: {
                email: "adfbfsbds@bfdsbf.com",
                loading: false,
                recoveryPasswordError: ""
            }
        });
        ////  22222222222const actionServerRequest = actions.forgotPasswordEmailChange("adfbfsbds@bfdsbf.com");
        const actionServerRequest1 = actions.forgotPasswordEmailChange();
        // act
        const newState2 = loginReducer(initialState, actionServerRequest1);
        expect(newState2).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            currentSection: 'forgotPassword',
            forgotPassword: {
                email: "",
                loading: false,
                recoveryPasswordError: ""
            }
        });


    });
    it('forgot password back to login FORGOT_PASSWORD_BACK_TO_LOGIN', () => {
        const initialState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            currentSection: 'forgotPassword',
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: ""
            }
        };

        /////1111111111111
        const actionServerRequest = actions.forgotPasswordBackToLogin();
        // act
        const newState1 = loginReducer(initialState, actionServerRequest);
        expect(newState1).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            currentSection: 'login',
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: ""
            }
        });
    });
    it("forgot password form's errors to null", () => {
        const initializeState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            currentSection: 'forgotPassword',
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: "recovery password error"
            }
        };
        const action = actions.forgotPasswordInitializeFormErrors();
        const newState = loginReducer(initializeState, action);
        expect(newState).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            currentSection: 'forgotPassword',
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: ""
            }
        });
    });
});

describe('Change Password', () => {
    it('change password new password change CHANGE_PASSWORD_MEW_CHANGED', () => {
        const initialState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: 'onsdggsdg',
                confirmNewPassword: '',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: ""
                }
            },
            currentSection: 'changePassword'
        };
        let changeTo = "ksdgdmsdg";
        /////1111111111111
        const actionServerRequest = actions.changePasswordNewPasswordChange(changeTo);
        // act
        const newState1 = loginReducer(initialState, actionServerRequest);
        expect(newState1).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: changeTo,
                confirmNewPassword: '',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: ""
                }
            },
            currentSection: 'changePassword'
        });
        //// 22222222222222222222222222
        const initialState1 = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: 'onsdggsdg',
                confirmNewPassword: 'sfdbsdfbgv',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: ""
                }
            },
            currentSection: 'changePassword'
        };
        let changeTo1 = null;
        /////1111111111111
        const actionServerRequest1 = actions.changePasswordNewPasswordChange(changeTo1);
        // act
        const newState2 = loginReducer(initialState1, actionServerRequest1);
        expect(newState2).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: "",
                confirmNewPassword: 'sfdbsdfbgv',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: ""
                }
            },
            currentSection: 'changePassword'
        });


    });
    it('change password confirm new password change CHANGE_PASSWORD_CONFIRM_CHANGED', () => {


        const initialState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: 'onsdggsdg',
                confirmNewPassword: 'fdsbgdfsgbv',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: ""
                }
            },
            currentSection: 'changePassword'
        };
        let changeTo = "ksdgdmsdg";
        /////1111111111111
        const actionServerRequest = actions.changePasswordConfirmPasswordChange(changeTo);
        // act
        const newState1 = loginReducer(initialState, actionServerRequest);
        expect(newState1).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: 'onsdggsdg',
                confirmNewPassword: changeTo,
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: ""
                }
            },
            currentSection: 'changePassword'
        });

        //// 22222222222222222222222222
        const initialState1 = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: 'fdghjdfjnmdfjhn',
                confirmNewPassword: 'thjdgertfhdeh',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: ""
                }
            },
            currentSection: 'changePassword'
        };
        let changeTo1 = null;
        /////1111111111111
        const actionServerRequest1 = actions.changePasswordConfirmPasswordChange(changeTo1);
        // act
        const newState2 = loginReducer(initialState1, actionServerRequest1);
        expect(newState2).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: 'fdghjdfjnmdfjhn',
                confirmNewPassword: '',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: ""
                }
            },
            currentSection: 'changePassword'
        });


    });
    it('change password validation error CHANGE_PASSWORD_VALIDATION_ERROR', () => {
        /////1111111111111
        const initialState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: 'hdfhdfhgd',
                confirmNewPassword: '',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: ""
                }
            },
            currentSection: 'changePassword'
        };
        let error = {
            confirmNewPassword: "you must confirm your new password"
        };
        const actionServerRequest = actions.changePasswordValidationError(error);
        // act
        const newState1 = loginReducer(initialState, actionServerRequest);
        expect(newState1).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: 'hdfhdfhgd',
                confirmNewPassword: '',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "you must confirm your new password",
                    changePasswordFailedText: ""
                }
            },
            currentSection: 'changePassword'
        });

        ////222222222222222222222222222222222222

        const initialState1 = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: '',
                confirmNewPassword: 'fhgfsdghs',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: ""
                }
            },
            currentSection: 'changePassword'
        };
        let error1 = {
            newPassword: "your newPassword can't be empty."
        };
        const actionServerRequest1 = actions.changePasswordValidationError(error1);
        // act
        const newState2 = loginReducer(initialState1, actionServerRequest1);
        expect(newState2).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: '',
                confirmNewPassword: 'fhgfsdghs',
                loading: false,
                error: {
                    newPassword: "your newPassword can't be empty.",
                    confirmNewPassword: "",
                    changePasswordFailedText: ""
                }
            },
            currentSection: 'changePassword'
        });

        /// 333333333333333333333333333333333333333
        const initialState2 = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: 'fsdhsdfhfsdhfs',
                confirmNewPassword: 'fsdhsdfhfsdhfs',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: ""
                }
            },
            currentSection: 'changePassword'
        };
        let error2 = null;
        const actionServerRequest2 = actions.changePasswordValidationError(error2);
        // act
        const newState3 = loginReducer(initialState2, actionServerRequest2);
        expect(newState3).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: 'fsdhsdfhfsdhfs',
                confirmNewPassword: 'fsdhsdfhfsdhfs',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: ""
                }
            },
            currentSection: 'changePassword'
        });

    });
    // set change error change password form to null!
    it("change password form's errors to null", () => {
        const initializeState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                "error": {
                    changePasswordFailedText: "change password error...",
                    "confirmNewPassword": "",
                    "newPassword": ""
                }
            },
            currentSection: 'changePassword',
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: ""
            }
        };
        const action = actions.changePasswordInitializeFormErrors();
        const newState = loginReducer(initializeState, action);
        expect(newState).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                "error": {
                    "changePasswordFailedText": "",
                    "confirmNewPassword": "",
                    "newPassword": ""
                }
            },
            currentSection: 'changePassword',
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: ""
            }
        });
    });
});

describe('Change Password error handler', () => {
    it('Change Password password used already CHANGE_PASSWORD_PASSWORD_USED', () => {
        const initialState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: "theNewPassword",
                confirmNewPassword: 'theNewPassword',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: ""
                }
            },
            currentSection: 'changePassword'
        };
        let error =
        {
            text: errorText.PASSWORD_USED,//`You already used this password, please choose deference one!`,
            statusCode: errorTypes.PASSWORD_USED//402
        };

        /////1111111111111
        const actionServerRequest = actions.changePasswordErrorPasswordUsedAlready(error);
        // act
        const newState = loginReducer(initialState, actionServerRequest);
        expect(newState).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: "theNewPassword",
                confirmNewPassword: 'theNewPassword',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: error.text
                }
            },
            currentSection: 'changePassword'
        });

    });
    it('Change Password userId not exist CHANGE_PASSWORD_ID_UNEXIST', () => {
        const initialState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: "theNewPassword",
                confirmNewPassword: 'theNewPassword',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: ""
                }
            },
            currentSection: 'changePassword'
        };
        let error =
        {
            text: errorText.USER_ID__NOT_EXIST,//`user id not exist!`,
            statusCode: errorTypes.USER_ID__NOT_EXIST//401
        };

        /////1111111111111
        const actionServerRequest = actions.changePasswordErrorUserIdNotExist(error);
        // act
        const newState = loginReducer(initialState, actionServerRequest);
        expect(newState).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: "theNewPassword",
                confirmNewPassword: 'theNewPassword',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: error.text
                }
            },
            currentSection: 'changePassword'
        });

    });
    it('Change Password server error CHANGE_PASSWORD_SERVER_ERROR', () => {
        const initialState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: "theNewPassword",
                confirmNewPassword: 'theNewPassword',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: ""
                }
            },
            currentSection: 'changePassword'
        };
        let error =
        {
            text: errorText.USER_ID__NOT_EXIST,//`user id not exist!`,
            statusCode: errorTypes.USER_ID__NOT_EXIST//401
        };

        /////1111111111111
        const actionServerRequest = actions.changePasswordErrorUserIdNotExist(error);
        // act
        const newState = loginReducer(initialState, actionServerRequest);
        expect(newState).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                userId: 5,
                newPassword: "theNewPassword",
                confirmNewPassword: 'theNewPassword',
                loading: false,
                error: {
                    newPassword: "",
                    confirmNewPassword: "",
                    changePasswordFailedText: error.text
                }
            },
            currentSection: 'changePassword'
        });

    });
});

describe('Forgot password error handler', () => {
    it('Forgot password error validation error FORGOT_PASSWORD_VALIDATION_ERROR', () => {
        const initialState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: ""
            },
            currentSection: 'forgotPassword'
        };
        let error =
        {
            text: `pleas insert valid email.`
        };

        /////1111111111111
        const actionServerRequest = actions.forgotPasswordValidationError(error);
        // act
        const newState1 = loginReducer(initialState, actionServerRequest);
        expect(newState1).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: error.text
            },
            currentSection: 'forgotPassword'
        });

    });
    it('Forgot password error server error FORGOT_PASSWORD_ERROR', () => {
        const initialState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: ""
            },
            currentSection: 'forgotPassword'
        };
        let error =
        {
            text: errorText.GENERAL_ERROR,//`error from server, please contact with supervisor.`,
            statusCode: errorTypes.GENERAL_ERROR//404
        };

        /////1111111111111
        const actionServerRequest = actions.forgotPasswordErrorServerError(error);
        // act
        const newState1 = loginReducer(initialState, actionServerRequest);
        expect(newState1).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: error.text
            },
            currentSection: 'forgotPassword'
        });

    });
});

describe('Loading flag check', () => {
    it('start loading ', () => {
        // 11111111111111
        const initialState = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: ""
            },
            currentSection: 'forgotPassword'
        };
        const section = 'login';
        /////1111111111111
        const startLoadingAction = actions.loginStartLoading(section);
        // act
        const newState = loginReducer(initialState, startLoadingAction);
        expect(newState).toEqual({
            login: {
                loading: true,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: ""
            },
            currentSection: 'forgotPassword'
        });
        //2222222222222222
        const initialState1 = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: ""
            },
            currentSection: 'forgotPassword'
        };
        const section1 = 'changePassword';
        /////1111111111111
        const startLoadingAction1 = actions.loginStartLoading(section1);
        // act
        const newState1 = loginReducer(initialState1, startLoadingAction1);
        expect(newState1).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: true,
                changePasswordFailedText: ""
            },
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: ""
            },
            currentSection: 'forgotPassword'
        });
    });
    it('stop loading ', () => {
        /////1111111111111
        const initialState = {
            login: {
                loading: true,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: ""
            },
            currentSection: 'forgotPassword'
        };
        const section = 'login';
        const startLoadingAction = actions.loginStopLoading(section);
        // act
        const newState = loginReducer(initialState, startLoadingAction);
        expect(newState).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: ""
            },
            currentSection: 'forgotPassword'
        });


        //222222222222222222
        const initialState1 = {
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: true,
                changePasswordFailedText: ""
            },
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: ""
            },
            currentSection: 'forgotPassword'
        };
        const section1 = 'changePassword';
        const startLoadingAction1 = actions.loginStopLoading(section1);
        // act
        const newState1 = loginReducer(initialState1, startLoadingAction1);
        expect(newState1).toEqual({
            login: {
                loading: false,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: false,
                changePasswordFailedText: ""
            },
            forgotPassword: {
                email: "adfbfsbds",
                loading: false,
                recoveryPasswordError: ""
            },
            currentSection: 'forgotPassword'
        });


        ////3333333333333333333333333333333333333333
        const initialState2 = {
            login: {
                loading: true,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: true,
                changePasswordFailedText: ""
            },
            forgotPassword: {
                email: "adfbfsbds",
                loading: true,
                recoveryPasswordError: ""
            },
            currentSection: 'forgotPassword'
        };
        const section2 = null;
        const startLoadingAction2 = actions.loginStopLoading(section2);
        // act
        const newState2 = loginReducer(initialState2, startLoadingAction2);
        expect(newState2).toEqual({
            login: {
                loading: true,
                userName: "simple userName",
                password: "user password!",
                userNameErrorText: "",
                passwordErrorText: "",
                loginFailedText: ""
            },
            changePassword: {
                loading: true,
                changePasswordFailedText: ""
            },
            forgotPassword: {
                email: "adfbfsbds",
                loading: true,
                recoveryPasswordError: ""
            },
            currentSection: 'forgotPassword'
        });
    });
});