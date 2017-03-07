import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import * as actions from './action';
import LoginPage from './dumbComponent/LoginPage';
import ChangePassword from './dumbComponent/changePassword';
import ForgotPassword from './dumbComponent/forgotPassword';
import _ from 'lodash';
import * as errorTypes from './constant/errorTypes';
import './styles/style.less';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onChangeRecovery = this.onChangeRecovery.bind(this);
        this.onChangePasswordChange = this.onChangePasswordChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.forgotPassword = this.forgotPassword.bind(this);
        this.onForgot = this.onForgot.bind(this);
        this.backToLogin = this.backToLogin.bind(this);
    }

    /**
     * Event when input fields change at login form
     * */
    onChange(event) {
        const field = event.target.name;
        const actions = this.props.actions;
        const newVal = event.target.value;
        switch (field) {
            case 'userName':
                actions.loginChangeUsername(newVal);
                break;
            case 'password':
                actions.loginChangePassword(newVal);
                break;
            default:
                break;
        }
    }

    /**
     * Event when input fields change at forgot password form
     * */
    onChangeRecovery(event) {
        const field = event.target.name;
        const actions = this.props.actions;
        const newVal = event.target.value;
        switch (field) {
            case 'email':
                actions.forgotPasswordEmailChange(newVal);
                break;
            default:
                break;
        }
    }

    /**
     * Event when input fields change at change password form
     * */
    onChangePasswordChange(event) {
        const field = event.target.name;
        const actions = this.props.actions;
        const newVal = event.target.value;
        switch (field) {
            case 'newPassword':
                actions.changePasswordNewPasswordChange(newVal);
                break;
            case 'confirmNewPassword':
                actions.changePasswordConfirmPasswordChange(newVal);
                break;
            default:
                break;
        }
    }

    /**
     * Main login function - when user clicked on login button.
     * */
    onLogin() {
        const actions = this.props.actions;
        const loginSection = this.props.login;
        const realm = this.props.realm;
        const errors = login_validation();
        const loginDetails = {
            userName: loginSection.userName,
            password: loginSection.password,
            realm: realm
        };
        // set error to null
        actions.loginInitializeFormErrors();
        if (_.size(errors)) {
            return actions.loginValidationError(errors);
        }
        actions.loginMain(loginDetails)
            .then(function (retUser) {
                /* eslint-disable no-console */
                console.log("login success The user is: ", retUser);
            })
            .catch((err) => {
                /* eslint-disable no-console */
                console.log("There is login error! ", err);
            });

        /**
         * Validation the user input data!
         * */
        function login_validation() {
            let err = {};
            if (!_.size(loginSection.userName)) {
                err.userName = 'Please insert User Name!';
            }
            if (!_.size(loginSection.password)) {
                err.password = 'Please insert Password!';
            }
            return err;
        }
    }

    /**
     * Main change password function - when user submit change password form.
     * */
    changePassword() {
        const actions = this.props.actions;
        const changePassSection = this.props.changePassword;
        const loginSection = this.props.login;
        const changeDetails = {
            userId: changePassSection.userId,
            newPassword: changePassSection.newPassword,
            oldPassword: loginSection.password
        };
        const errors = change_password_validation();
        // set error to null
        actions.changePasswordInitializeFormErrors();
        if (_.size(errors)) {
            return actions.changePasswordValidationError(errors);
        }
        actions.changePassword(changeDetails)
            .then((retUser) =>{
                /* eslint-disable no-console */
                // Todo if success go to home screen.
                console.log("The user is: ", retUser);
                browserHistory.push('/home');
                //this.backToLogin();
            })
            .catch((err) => {
                /* eslint-disable no-console */
                console.log("There is error at changePassword function! ", err);
            });
        /**
         * This function check if
         * the change password are valid,
         * if not return the error object.
         * */
        function change_password_validation() {
            let err = {};
            if (!_.size(changePassSection.newPassword)) {
                err.newPassword = 'Please insert new password';
            }
            if (!_.size(err) && !_.size(changePassSection.confirmNewPassword)) {
                err.confirmNewPassword = 'Please confirm the new password';
            }
            if (!_.size(err) && changePassSection.newPassword != changePassSection.confirmNewPassword) {
                err.changePasswordFailedText = 'Your new password and the confirm password are unIdentical';
            }
            return err;
        }
    }

    /**
     * Main forgot password function - when user submit forgot password form.
     * */
    onForgot() {
        const actions = this.props.actions;
        const forgotPassword = this.props.forgotPassword;
        const forgotDetails = {
            email: forgotPassword.email,
            realm: this.props.realm
        };
        actions.forgotPasswordInitializeFormErrors();
        const error = forgot_validation(actions);
        // set error to null

        if(_.size(error)) {
            return actions.forgotPasswordValidationError(error);
        }

        //actions.loginStartLoading('forgotPassword');
        actions.forgotPassword(forgotDetails)
            .then((response) => {
                actions.loginStopLoading('forgotPassword');
                /* eslint-disable no-console */
                console.log("Email send to recovery!");
                this.backToLogin();
            })
            .catch((err) => {
                actions.loginStopLoading('forgotPassword');
                /* eslint-disable no-console */
                console.log("Something get error: ", err);
            });


        /**
         * This function check if
         * the user insert valid email,
         * if not return the error object.
         * */
        function forgot_validation() {
            if (!_.size(forgotPassword.email)) {
                return {
                    text: "Please insert email address!"
                };
            }

            if (!forgotPassword.email.includes("@")) {
                return {
                    text: "Please insert valid email address!"
                };
            }
        }
    }

    /**
     * This function return go to login screen.
     * */
    backToLogin() {
        this.props.actions.forgotPasswordBackToLogin();
    }

    /**
     * This function return go to forgot password screen.
     * */
    forgotPassword() {
        this.props.actions.forgotPasswordClicked();
    }

    render() {
        const currentSection = this.props.currentSection;
        switch (currentSection) {
            case 'forgotPassword':
            {
                const forgotPasswordError = {
                    email: this.props.forgotPassword.recoveryPasswordError
                };
                return (
                    <div className="login-wraper">
                        <ForgotPassword
                            forgot={this.props.forgotPassword}
                            errors={forgotPasswordError}
                            onChange={this.onChangeRecovery}
                            onForgot={this.onForgot}
                            backToLogin={this.backToLogin}
                        />
                    </div>
                );
            }
            case 'changePassword':
            {

                const changePassword = this.props.changePassword;
                const error = changePassword && changePassword.error;
                return (
                    <div className="login-wraper">
                        <ChangePassword
                            change={changePassword}
                            onChange={this.onChangePasswordChange}
                            errors={error}
                            changePassword={this.changePassword}
                        />
                    </div>
                );
            }
            case 'login':
            {

                const login = this.props.login;
                const loginError = {
                    userName: login.userNameErrorText,
                    password: login.passwordErrorText,
                    loginFailedText: login.loginFailedText
                };
                const loginUser = login;

                return (
                    <div className="login-wraper">
                        <LoginPage
                            user={loginUser}
                            onChange={this.onChange}
                            errors={loginError}
                            onLogin={this.onLogin}
                            forgotPassword={this.forgotPassword}
                        />
                    </div>
                );
            }
            default:
            {
                return (<div>Something get wrong!</div>);
            }
        }
    }
}

Login.propTypes = {
    realm: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired,
    login: PropTypes.object.isRequired,
    forgotPassword: PropTypes.object,
    currentSection: PropTypes.string.isRequired,
    changePassword: PropTypes.object

};

/**
 * Pull in the React Router context so router is available on this.context.router.
 **/
Login.contextTypes = {
    router: PropTypes.object
};

function mapStateToProps(state, ownProps) {

    const reducer = state.loginReducer;
    return {
        realm: ownProps.route.realm,
        login: reducer.login,
        currentSection: reducer.currentSection,
        forgotPassword: reducer.forgotPassword,
        changePassword: reducer.changePassword
    };
}

function mapDispatchToProps(dispatch) {
    /**
     * This actually wrap the all action with dispatch so we don't need used dispatch function!
     * */
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
