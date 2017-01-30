import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';
import LeftMenu from '../leftMenu/leftMenu';
import Layout1 from './dumbComponent/Layout1';
import Layout2 from './dumbComponent/Layout2';


class Layout extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {

        //const layoutClassName = this.props.layout.className;
        return (
           <Layout2 layoutClassName={this.props.layout.className}/>
        );
    }
}

Layout.propTypes = {
    //myProp: PropTypes.string.isRequired
    layout: PropTypes.object.isRequired,
    state: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        layout: state.layoutReducer,
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
