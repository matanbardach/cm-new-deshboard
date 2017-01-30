import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BindDiagnosis from '../../common/uiComponent/bindDiagnosis';
//import '/src/images/user_male.png';
import '../../../images/user_male.jpeg';
//import EmptyProfile from './user_male.jpeg';
import _ from 'lodash';
//import myPicture from '../../../images/user_male.jpeg';


const patientListItem = ({item}) => {
    item.mainDiagnosis = "";
    if (item.diagnosis) {
        item.diagnosis = _.uniq(item.diagnosis, function (data) {
            return data;
        });
        if (_.size(item.diagnosis) > 2) {
            item.mainDiagnosis = item.diagnosis[0] + ", " + item.diagnosis[1] + "...";
        } else if (_.size(item.diagnosis) === 2) {
            item.mainDiagnosis = item.diagnosis[0] + ", " + item.diagnosis[1];
        } else if (_.size(item.diagnosis) === 1) {  // ===1
            item.mainDiagnosis = item.diagnosis[0];
        }
    }
    if(!item.picture){
        item.picture = '../../../images/user_male.jpeg';
    }else if(!item.picture.startsWith("https://")){
        item.picture = '../../../images/user_male.jpeg';
    }
    return (
        <div className="row">
            <span>
                <img src={item.picture} alt="boohoo" className="my-avatar"/>
            </span>
            <span>
                <div>{item.lastName + " " + item.firstName}</div>
                <BindDiagnosis diagnosis={item.mainDiagnosis} recentAlert={item.recentAlert}/>
            </span>
        </div>
    );
};

patientListItem.propTypes = {
    item: PropTypes.object.isRequired
};

export default patientListItem;
