import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import * as actions from './actions';
import './styles/styles.less';

class MyDialog extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        //this.setState({open: false});
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
                onClick={this.handleOpen}
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

        const radios = [];
        for (let i = 0; i < 30; i++) {
            radios.push(
                <RadioButton
                    key={i}
                    value={`value${i + 1}`}
                    label={`Option ${i + 1}`}
                    style={styles.radioButton}
                />
            );
        }
        const self = this;
        const topSectionHtml = '<div class="row">' +
                                    '<div class="col-xs-4">' +
                                        '<div class="box">' +
                                            'Left'+
                                        '</div>' +
                                    '</div>' +
                                   '<div class="col-xs-6">' +
                                        '<div class="box">' +
                                            'Center'+
                                        '</div>' +
                                    '</div>' +
                                   '<div class="col-xs-2">' +
                                         '<div class="box">' +
                                            '<button class="dialogButton" onclick={this.closeDialog}>Submit</button>'+
                                         '</div>' +
                                   '</div>' +
                               '</div>';

        const topSectionHtm2 = '<div class="my-row arrange-horizontally">' +
                                        '<div class="section left">' +
                                                'Left'+
                                        '</div>' +
                                        '<div class="section center">' +
                                                'Center'+
                                        '</div>' +
                                        '<div class="section right">' +
                                            '<button class="dialogButton" onclick={this.closeDialog}>Submit</button>'+
                                        '</div>' +
                                '</div>';
        return (
            <div>
                <RaisedButton label="Scrollable Dialog1" onTouchTap={this.handleOpen} onClick={this.handleOpen} />
                <Dialog
                    actions={actions}
                    modal={false}
                    bodyClassName="dialog-box"
                    open={this.props.dialog.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={false}>

                        <div className="my-row arrange-horizontally dialog-top">
                            <div className="section-left">
                                Left
                            </div>
                            <div className="section-center">
                                Center
                            </div>
                            <div className="section-right">
                                    <button className="dialogButton"  onClick={this.closeDialog}>Submit</button>
                            </div>
                        </div>
                        <RadioButtonGroup name="shipSpeed" defaultSelected="not_light" className="dialog-body">
                            This is the body. it is scrol outo...
                        </RadioButtonGroup>

                </Dialog>
            </div>
        );
    }
}

MyDialog.propTypes = {
    //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        dialog: state.dialogReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyDialog);
