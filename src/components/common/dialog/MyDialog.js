import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ButtonIcon from '../../common/button/buttonIcon';
import * as actions from './actions';
import './styles/styles.less';

class MyDialog extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.chengText = this.chengText.bind(this);
    }

    handleOpen(){
        const action = this.props.actions;
        action.openDialog('tryOpen');
    }

    handleClose(){
        const action = this.props.actions;
        action.closeDialog('tryClose');
    }
    closeDialog(){
        //debugger;
        const action = this.props.actions;
        action.closeDialog('tryClose');
    }
    chengText(){
        const action = this.props.actions;
        action.changeBuText('Next');
    }

    render() {
        const styles = {
            radioButton: {
                marginTop: 16
            }
        };
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.chengText}
                onTouchTap={this.handleOpen}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
                onTouchTap={this.handleClose}
            />
        ];


        //console.log("hhhhhhhhhhhhhhhhhhhhhh: ",this.props.myBodyCmpo);
        const BodyComponent =  this.props.myBodyComponent;
        return (
            <div>
                <RaisedButton label="Scrollable Dialog" onTouchTap={this.handleOpen} onClick={this.handleOpen} />
                <Dialog
                    actions={actions}
                    modal={false}
                    bodyClassName="dialog-box"
                    open={this.props.dialog.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={false}>

                        <div className="row dialog-top">
                            <div className="col-xs-2 section-left">
                                <div className="box">
                                    <ButtonIcon
                                        onClicked={this.closeDialog}
                                        classN="grey_bar"
                                        tooltipPosition="top-right"
                                        size="xsXsSmall"
                                        iconName="close-x"
                                        disable={false}/>
                                </div>
                            </div>
                            <div className="col-xs-8 section-center headline">
                                <div className="box">
                                    This is dialog title
                                </div>
                            </div>
                            <div className="col-xs-2 section-right">
                                <div className="box">
                                    <button className="dialogButton"  onClick={this.closeDialog}>{this.props.dialog.textBut}</button>
                                </div>
                            </div>
                        </div>
                        <div className="dialog-body">
                            <BodyComponent></BodyComponent>
                        </div>

                </Dialog>
            </div>
        );
    }
}

MyDialog.propTypes = {
    //myProp: PropTypes.string.isRequired
    myTextButton: PropTypes.string.isRequired,
    myBodyComponent: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        myBodyComponent: ownProps.bodyComponent,
        dialog: state.dialogReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDialog);
