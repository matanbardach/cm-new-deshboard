import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextInput from '../../common/TextInput';
//import '../styles/styles.css';


const LoginPage = ({user, onChange, errors, onLogin, forgotPassword}) => {
        //debugger;
        return (
            <div className="login_container">
                <h1>Login page</h1>
                <TextInput
                    name="userName"
                    label="Username"
                    value={user.userName}
                    onChange={onChange}
                    error={errors.userName}/>

                <TextInput
                    name="password"
                    label="password"
                    value={user.password}
                    onChange={onChange}
                    error={errors.password}
                    type="password"/>

                <div className="forgot_password_link" onClick={forgotPassword}>Forgot password</div>
                {errors.loginFailedText && <div className="alert alert-danger">{errors.loginFailedText}</div>}

                {!user.loading && <input
                    type="button"
                    value="Login"
                    onClick={onLogin}
                    className="btn btn-primary input_button"
                />}
                {user.loading && <div className="loader"></div>}


            </div>
        );
};

LoginPage.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onLogin: PropTypes.func.isRequired,
    forgotPassword: PropTypes.func
};

export default LoginPage;
