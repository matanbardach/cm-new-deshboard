import React, {PropTypes} from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Icons from '../icons/icons';
import './variables.less';
import './icon-button.less';


const styles = {
    xsXsSmallIcon: {
        width: 15,
        height: 15
    },
    xsSmallIcon: {
        width: 30,
        height: 30
    },
    smallIcon: {
        width: 36,
        height: 36
    },
    mediumIcon: {
        width: 48,
        height: 48
    },
    largeIcon: {
        width: 60,
        height: 60
    },
    xsXsSmall: {
        width: 30,
        height: 30,
        padding: 6
    },
    xsSmall: {
        width: 60,
        height: 60,
        padding: 12
    },
    small: {
        width: 72,
        height: 72,
        padding: 16
    },
    medium: {
        width: 96,
        height: 96,
        padding: 24
    },
    large: {
        width: 120,
        height: 120,
        padding: 30
    }
};


const ButtonIcon = ({tooltipString, classN, disable, size, tooltipPosition, iconName, onClicked}) => {
    let theClass = classN;
    let myStyle = {
        iconStyle: styles.smallIcon,
        style: styles.small

    };
    let iconStyle = 'my-icons-style-small';
    switch (size){
        case 'xsXsSmall':{
            myStyle = {
                iconStyle: styles.xsXsSmallIcon,
                style: styles.xsXsSmall
            };
            iconStyle = 'my-icons-style-xs-xs-small';
            break;
        }
        case 'xsSmall':{
            myStyle = {
                iconStyle: styles.xsSmallIcon,
                style: styles.xsSmall

            };
            iconStyle = 'my-icons-style-xs-small';
            break;
        }
        case 'small':{
            myStyle = {
                iconStyle: styles.smallIcon,
                style: styles.small

            };
            iconStyle = 'my-icons-style-small';
            break;
        }
        case 'medium':{
            myStyle = {
                iconStyle: styles.mediumIcon,
                style: styles.medium
            };
            iconStyle = 'my-icons-style-medium';
            break;
        }
        case 'large':{
            myStyle = {
                iconStyle: styles.largeIcon,
                style: styles.large
            };
            iconStyle = 'my-icons-style-large';
            break;
        }
        default:{
            break;
        }
    }
    if(disable){
        theClass = 'bar_disable';
    }

    return(
        <div>
            <IconButton tooltip={tooltipString}
                        onClick={onClicked}
                        className={theClass}
                        iconStyle={myStyle.iconStyle}
                        tooltipPosition={tooltipPosition}
                        style={myStyle.style}>
                <div className={iconStyle}>
                    <Icons name={iconName} size={size}/>
                </div>
            </IconButton>
        </div>
    );
};
ButtonIcon.propTypes = {
    onClicked: PropTypes.func,
    tooltipString: PropTypes.string,
    disable: PropTypes.bool,
    classN: PropTypes.string.isRequired,
    size: PropTypes.string,
    tooltipPosition: PropTypes.string,
    iconName: PropTypes.string.isRequired
};

export default ButtonIcon;