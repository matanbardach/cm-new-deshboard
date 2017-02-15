import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextInput from '../../common/TextInput';
//import '../styles/styles.css';


const ForgotPassword = ({forgot, onChange, errors, onForgot, backToLogin}) => {
    return (
        <div className="login_container">
            <h1>Password recovery</h1>
            <TextInput
                name="email"
                label="Email"
                value={forgot.email}
                onChange={onChange}
                error={errors.email}/>

            <div className="forgot_password_link" onClick={backToLogin}>Go back to login</div>


            {!forgot.loading && <input
                type="button"
                value="Send Email"
                onClick={onForgot}
                className="btn btn-primary input_button"
            />}
            {forgot.loading && <div className="loader"></div>}
        </div>
    );
};

ForgotPassword.propTypes = {
    forgot: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onForgot: PropTypes.func.isRequired,
    backToLogin: PropTypes.func.isRequired
};

export default ForgotPassword;
