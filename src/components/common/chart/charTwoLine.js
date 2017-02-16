import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import * as actions from './action';
import * as lineChart from './chartsCreator';
import * as hashConst from './const';
//import '../styles/style.less';

import ReactDOM from 'react-dom';


class CharTwoLine extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.chart = null;
    }

    componentDidMount(){
        const hash = hashConst.HASH;

        const props = this.props;
        let scope = {
            type: props.type,
            static: undefined,
            bgColor: props.bgColor,
            dotColor: props.dotColor,
            height: undefined,
            nature: props.nature,
            dateDomain: props.domain
        };
        let options = {
            hash: hash,
            type: scope.type[0],
            type2: scope.type[1],
            clickable: true,
            isHover: !scope.static,
            bgColor: scope.bgColor || "#ffffff",
            dotColor: scope.dotColor || hash[scope.type],
            maxWidth: 300,
            height: scope.height || 280,
            margin: {top: 50, right: 20, bottom: 50, left: 50},
            dateDomain: scope.dateDomain
        };
        let el = ReactDOM.findDOMNode(this);//this.getDOMNode();
        let data = props.data;

        if(!this.chart){
            this.chart = new lineChart.TwoLineChart(el, options, scope.nature, el.clientWidth);
            this.chart.setData(data);
            this.chart.render();
        }
    }
    componentDidUpdate(){
        const props = this.props;
        if(this.chart){
            this.chart.setDataDomain(props.domain)
                      .setData(props.data)
                      .update();
        }
    }
    componentWillUnmount(){
        //console.log("componentWillUnmount");
    }
    render() {
        return (
            <div className="new-line-chart"></div>
        );
    }
}

CharTwoLine.propTypes = {
    data: PropTypes.object,
    domain: PropTypes.array,
    nature: PropTypes.string,
    type: PropTypes.array.isRequired,
    click: PropTypes.func


};

function mapStateToProps(state, ownProps) {
    return {
        state: state.state,
        data: ownProps.data,
        domain: ownProps.domain,
        nature: ownProps.nature,
        type: ownProps.type,
        click: ownProps.click
    };
}

function mapDispatchToProps(dispatch) {
    return {
        //actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CharTwoLine);