import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './bindDiagnosis.style.less';


const bindDotToText = ({dotText, dotItem}) => {
    if(dotItem.id){
        if(dotText){
            return(
                <div>
                    <div className="alert-dot"></div>
                    <span className="item-list-diagnosis">{dotText}</span>
                </div>
            );
        }
        return(
                <div>
                    <div className="alert-dot"></div>
                </div>); // if(!dotText)
    }
    // if !dotItem
    if(dotText){
        return(
            <div>
                <div className="alert-dot no-alert"></div>
                <span className="item-list-diagnosis">{dotText}</span>
            </div>
        );
    }
    return(
            <div>
                <div className="alert-dot no-alert"></div>
            </div>);
};

bindDotToText.propTypes = {
    dotText: PropTypes.string,
    dotItem:PropTypes.object
};

export default bindDotToText;
