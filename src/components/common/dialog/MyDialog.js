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
        this.clickTry = this.clickTry.bind(this);
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
    clickTry(but){
        const action = this.props.actions;
        if(but){
            action.changePageNumActive(but.pageNum);
        }
    }

    render() {
        const styles = {
            radioButton: {
                marginTop: 16
            }
        };
        const primary = true;
        const keyboardFocused = true;
        const actions = [
            <FlatButton
                label="Cancel"
                primary={primary}
                onClick={this.chengText}
                onTouchTap={this.handleOpen}
            />,
            <FlatButton
                label="Submit"
                primary={primary}
                keyboardFocused={keyboardFocused}
                onClick={this.handleClose}
                onTouchTap={this.handleClose}
            />
        ];


        // <RaisedButton label="Scrollable Dialog" onTouchTap={this.handleOpen} onClick={this.handleOpen} />


        //const BodyComponent =  this.props.myBodyComponent;
        // Todo need pass dialog props to body component!
        const BodyComponent = this.props.dialog.dialogReducer;
        const params = this.props.dialog.params;
        const styleHeightInherit = {height: 'inherit'};
        const stylePaddingNam = {paddingTop: '20px'};

        const butClick = this.clickTry;
        const numList = this.props.dialog.pageNumberArr;
        //debugger;
        const listItems = numList.map(function (item, i) {
            if (item.active) {
                return (
                    <span className="dialog-num-progress active">{item.text}</span>
                );
            }
            return (
                <span className="dialog-num-progress" onClick={() => butClick(item)}>{item.text}</span>
            );
        });

        return (
            <div>
                <Dialog
                    actions={actions}
                    modal={false}
                    bodyClassName="dialog-box"
                    open={this.props.dialog.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={false}>

                    <div className="row dialog-top">

                        <div className="col-xs-4 section-left" style={styleHeightInherit}>
                            <div className="box" style={styleHeightInherit}>
                                <div className="row" style={styleHeightInherit}>
                                    <div className="col-xs-2">
                                        <div className="box">
                                            <div className="">
                                                <ButtonIcon
                                                    onClicked={this.closeDialog}
                                                    classN="grey_bar"
                                                    tooltipPosition="top-right"
                                                    size="xsXsSmall"
                                                    iconName="close-x"
                                                    disable={false}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-10" style={stylePaddingNam}>
                                        <div className="box">
                                            {listItems}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xs-6 section-center headline">
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
                        <BodyComponent
                            {...params}
                        />



                    </div>

                </Dialog>
            </div>
        );
    }
}

MyDialog.propTypes = {
    dialog: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
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
