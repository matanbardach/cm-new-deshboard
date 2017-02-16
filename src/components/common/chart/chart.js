import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as lineChart from './chartsCreator';
import * as hashConst from './const';
//import '../styles/style.less';

import ReactDOM from 'react-dom';


class Chart extends React.Component {
    constructor(props, context) {
        super(props, context);
        //this.chart = null;
    }

    componentWillMount() {
        this.updateResize();

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
            type: scope.type,
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
            this.chart = new lineChart.LineChart(el, options, scope.nature, el.clientWidth);
            this.chart.setData(data);
            this.chart.render();
            //this.setState({chart: this.chart});
            //window.addEventListener("resize", this.updateResize);
        }
        window.addEventListener("resize", this.updateResize);
    }
    componentDidUpdate(){
        //console.log("componentDidUpdate");
        const props = this.props;
        if(this.chart){
            this.chart.setDataDomain(props.domain)
                      .setData(props.data)
                      .update();
        }
    }
    componentWillUnmount(){
        window.removeEventListener("resize", this.updateResize);
        //console.log("componentWillUnmount");
    }
    updateResize() {

        //console.log("the width: ", window.outerWidth);
        //console.log("the hight: ", window.outerHeight);

        //this.setState({width: window.innerWidth});
        //if(this.state && this.state.chart){
        //    console.log("char exisat!!");
        //    this.state.chart.resize(window.innerWidth);
        //}
        //debugger;


        //let fff = window;
        //debugger;
        //this.setState({width: $(window).width(), height: $(window).height()});

    }
    render() {
        //console.log("the state is: ", this.state);
        //if(this.state && this.state.chart){
        //    debugger;
        //    this.state.chart.resize(window.innerWidth);
        //}
        return (
            <div className="new-line-chart"></div>
        );
    }
}

Chart.propTypes = {
    data: PropTypes.array,
    domain: PropTypes.array,
    nature: PropTypes.string,
    type: PropTypes.string.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Chart);