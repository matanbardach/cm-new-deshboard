import React, {PropTypes} from 'react';
import * as SvgConst from './constSvgLocal';
import ActionHome from 'material-ui/svg-icons/action/home';
import Help from 'material-ui/svg-icons/action/help';
import Alert from 'material-ui/svg-icons/alert/warning';
import Patient from 'material-ui/svg-icons/social/person';
import SvgIcon from 'material-ui/SvgIcon';

const icons = ({name, size}) => {
    let sizeViewBox = '0 0 36 36';   // this is the size of the most small...

    switch (name){
        case 'home':{
            return (<svg xmlns="http://www.w3.org/2000/svg" viewBox={sizeViewBox}>
                <path d={SvgConst.HOME}></path>
            </svg>);
        }
        case 'alert':{
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox={sizeViewBox}>
                    <path d={SvgConst.ALERT}></path>
                </svg>
            );
        }
        case 'patient':{
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox={sizeViewBox}>
                    <path d={SvgConst.PATIENT}></path>
                </svg>
            );
        }
        case 'message':{
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox={sizeViewBox}>
                    <path d={SvgConst.MESSAGE}></path>
                </svg>
            );
        }
        case 'carePlan':{
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox={sizeViewBox}>
                    <path d={SvgConst.CAREPLAN}></path>
                </svg>
            );
        }// 'close-x'
        case 'close-x':{
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox={sizeViewBox}>
                    <path d={SvgConst.CLOSE_WINDOW}></path>
                </svg>
            );
        }
        case 'right-arrow':{
            return (
                <SvgIcon>
                    <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                    <path d="M0-.25h24v24H0z" fill="none"/>
                </SvgIcon>
            );
        }
        default:
            return (<div></div>);
    }
};

icons.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.string
};

export default icons;
