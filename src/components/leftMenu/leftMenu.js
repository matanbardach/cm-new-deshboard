import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';
import * as dialogAction from '../common/dialog/actions';
import ButtonIcon from '../common/button/buttonIcon';
import './styles/style.less';
import PatientList from '../common/List/List';
import PatientListItem from '../common/listItems/patientListItem';
import * as fakeData from '../common/fakeData';


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
        //console.log("The home screen clicked!");
        const actions = this.props.actions;
        actions.homeIconClicked();
        this.changeLayout('home');

        const dialogActions = this.props.dialogAction;

        // first set body reducer!
        const params = {
            myList: fakeData.patientList,
            ItemComponent: PatientListItem
        };
        dialogActions.changeBodyReducer(PatientList, params);

        dialogActions.openDialog('home');
    }
    alertScreenClick(){
        //console.log("The alert screen clicked!");
        const actions = this.props.actions;
        actions.alertIconClicked();
        this.changeLayout('alert');
    }
    patientScreenClick(){
        //console.log("The patient screen clicked!");
        const actions = this.props.actions;
        actions.patientIconClicked();
        this.changeLayout('patient');
    }
    massageScreenClick(){
        //console.log("The message screen clicked!");
        const actions = this.props.actions;
        actions.messageIconClicked();
        this.changeLayout('message');
    }
    carePlanScreenClick(){
        //console.log("The care plan screen clicked!");
        const actions = this.props.actions;
        actions.carePlanIconClicked();
        this.changeLayout('carePlan');
    }

    changeLayout(section){
        //console.log("Change layout to ", section, "'s layout");
        const actions = this.props.actions;
        actions.changeLayout(section);
        switch (section){
            case 'home': {
                break;
            }
            case 'alert': {
                actions.showCard();
                break;
            }
            case 'patient': {
                actions.hideCard();
                break;
            }
            case 'message': {
                actions.showDetails();
                break;
            }
            case 'carePlan': {
                actions.hideDetails();
                break;
            }
            default:
                break;
        }
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
    actions: PropTypes.object.isRequired,
    dialogAction: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
        dialogAction: bindActionCreators(dialogAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftMenu);
