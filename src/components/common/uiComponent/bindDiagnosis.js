import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './bindDiagnosis.style.less';


const bindDiagnosis = ({diagnosis, recentAlert}) => {
    if(recentAlert.id){
        if(diagnosis){
            return(
                <div>
                    <div className="alert-dot"></div>
                    <span className="item-list-diagnosis">{diagnosis}</span>
                </div>
            );
        }
        return(
                <div>
                    <div className="alert-dot"></div>
                </div>); // if(!diagnosis)
    }
    // if !recentAlert
    if(diagnosis){
        return(
            <div>
                <div className="alert-dot no-alert"></div>
                <span className="item-list-diagnosis">{diagnosis}</span>
            </div>
        );
    }
    return(
            <div>
                <div className="alert-dot no-alert"></div>
            </div>);
};

bindDiagnosis.propTypes = {
    diagnosis: PropTypes.string,
    recentAlert:PropTypes.object
};

export default bindDiagnosis;
