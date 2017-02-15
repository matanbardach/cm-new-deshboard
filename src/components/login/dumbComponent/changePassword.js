import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextInput from '../../common/TextInput';
//import '../styles/styles.css';


const ChangePassword = ({change, onChange, errors, changePassword}) => {
    return (
        <div className="login_container">
            <h1>Change Password</h1>

            <TextInput
                name="newPassword"
                label="New Password"
                value={change.newPassword}
                onChange={onChange}
                error={errors.newPassword}
                type="password"/>

            <TextInput
                name="confirmNewPassword"
                label="Confirm Password"
                value={change.confirmNewPassword}
                onChange={onChange}
                error={errors.confirmNewPassword}
                type="password"/>

            {errors.changePasswordFailedText && <div className="alert alert-danger">{errors.changePasswordFailedText}</div>}

            {!change.loading && <input
                type="button"
                value="Change Password"
                onClick={changePassword}
                className="btn btn-primary input_button"
            />}
            {change.loading && <div className="loader"></div>}
        </div>
    );
};

ChangePassword.propTypes = {
    change: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    changePassword: PropTypes.func

};

export default ChangePassword;
