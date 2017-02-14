import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BindDotText from '../uiComponent/bindDotText';
import _ from 'lodash';
import ProfileImage from '../../../images/user_male.png';


const patientListItem = ({item}) => {
    let mainDiagnosis = "";
    let diagnosisList = [];// = item.diagnosis;
    let picture = item.picture;
    if (item.diagnosis) {
        diagnosisList = _.uniq(item.diagnosis, function (data) {
            return data;
        });
        if (_.size(diagnosisList) > 2) {
            mainDiagnosis = diagnosisList[0] + ", " + diagnosisList[1] + "...";
        } else if (_.size(diagnosisList) === 2) {
            mainDiagnosis = diagnosisList[0] + ", " + diagnosisList[1];
        } else if (_.size(diagnosisList) === 1) {  // ===1
            mainDiagnosis = diagnosisList[0];
        }
    }
    if(!picture || !picture.startsWith("https://")){
        picture = ProfileImage;
    }
    return (
        <div className="row">
                <span>
                    <img src={picture} alt="boohoo" className="my-avatar"/>
                </span>
                <span>
                    <div>{item.lastName + " " + item.firstName}</div>
                    <BindDotText dotText={mainDiagnosis} dotItem={item.recentAlert}/>
                </span>
        </div>
    );
};

patientListItem.propTypes = {
    item: PropTypes.object.isRequired
};

export default patientListItem;
