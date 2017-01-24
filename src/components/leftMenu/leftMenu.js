import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';
import ButtonIcon from '../common/button/buttonIcon';
import './styles/style.less';


class LeftMenu extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.homeScreenClick = this.homeScreenClick.bind(this);
        this.alertScreenClick = this.alertScreenClick.bind(this);
        this.patientScreenClick = this.patientScreenClick.bind(this);
        this.massageScreenClick = this.massageScreenClick.bind(this);
        this.carePlanScreenClick = this.carePlanScreenClick.bind(this);
        this.changeLayout = this.changeLayout.bind(this);
    }

    homeScreenClick(){
        console.log("The home screen clicked!");
        const actions = this.props.actions;
        actions.homeIconClicked();
        this.changeLayout('home');
    }
    alertScreenClick(){
        console.log("The alert screen clicked!");
        const actions = this.props.actions;
        actions.alertIconClicked();
        this.changeLayout('alert');
    }
    patientScreenClick(){
        console.log("The patient screen clicked!");
        const actions = this.props.actions;
        actions.patientIconClicked();
        this.changeLayout('patient');
    }
    massageScreenClick(){
        console.log("The message screen clicked!");
        const actions = this.props.actions;
        actions.messageIconClicked();
        this.changeLayout('message');
    }
    carePlanScreenClick(){
        console.log("The care plan screen clicked!");
        const actions = this.props.actions;
        actions.carePlanIconClicked();
        this.changeLayout('carePlan');
    }

    changeLayout(section){
        console.log("Change layout to ", section, "'s layout");
        const actions = this.props.actions;
        actions.changeLayout(section);
    }

    render() {
        return (
            <div className="menu_bar">
                <div className="top_section">

                </div>
                <div className="center_section">
                    <ButtonIcon
                        onClicked={this.homeScreenClick}
                        tooltipString="home"
                        classN="blue_bar"
                        tooltipPosition="bottom-right"
                        size="xsSmall"
                        iconName="home"
                        disable={false}
                    />
                    <ButtonIcon
                        onClicked={this.alertScreenClick}
                        tooltipString="alert"
                        classN="red_bar"
                        tooltipPosition="top-right"
                        size="xsSmall"
                        iconName="alert"
                        disable={false}
                    />
                    <ButtonIcon
                        onClicked={this.patientScreenClick}
                        tooltipString="patient"
                        classN="grey_bar"
                        tooltipPosition="top-right"
                        size="xsSmall"
                        iconName="patient"
                        disable={false}
                    />
                    <ButtonIcon
                        onClicked={this.massageScreenClick}
                        tooltipString="message"
                        classN="green_bar"
                        tooltipPosition="top-right"
                        size="xsSmall"
                        iconName="message"
                        disable={false}
                    />
                    <ButtonIcon
                        onClicked={this.carePlanScreenClick}
                        tooltipString="carePlan"
                        classN="blue_bar"
                        tooltipPosition="top-right"
                        size="xsSmall"
                        iconName="carePlan"
                        disable={false}
                    />
                </div>
                <div className="bottom_section">

                </div>
            </div>
        );
    }
}

LeftMenu.propTypes = {
    //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
