import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import * as actions from './action';


class card extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
            return (
                <div className="card">
                    <div className="red-back top-body top-corner-radius">Card</div>
                    <div className="green-back top-body"></div>
                    <div className="red-back top-body"></div>
                    <div className="green-back top-body"></div>
                    <div className="red-back top-body"></div>
                </div>
            );

    }
}

card.propTypes = {
    //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        bodyShow: state.cardReducer.sowMe
    };
}

function mapDispatchToProps(dispatch) {
    return {
        //actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(card);
