import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './action';
import './styles/styles.less';
import Icons from '../common/icons/icons';
import SvgIcon from 'material-ui/SvgIcon';


class shell extends React.Component {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        const urlItems = this.props.topShell.urlPath.map(function(item, i){

            if(i == 0){
                return(

                    <span className="path-url-item">
                        <span>{item}</span>
                    </span>
                );
            }
            const iconStyle = 'my-icons-style-small';
            /*

             <span className={iconStyle}>
             <Icons name={'right-arrow'} size={'xsSmall'}/>
             </span>

            * */

            return(
                <span className="path-url-item">
                    <span className="wrap-arrow">
                        <Icons name="right-arrow"/>
                    </span>
                    <span>
                        <span>{item}</span>
                    </span>
                </span>

            );
        });
        return (
            <div className="col-xs-12 top-shell">
                <div className="box light-theme">
                    <div className="primary">
                        {urlItems}
                    </div>
                </div>
            </div>
        );
    }
}

shell.propTypes = {
    topShell: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        topShell: state.topShellReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(shell);
