import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import * as actions from './action';
import LineChart from '../common/chart/chart';
import moment from 'moment';
import _ from 'lodash';


class CardDetails extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const dataLineChart = [];
        const domain = [new Date("Thu Jun 5 2016 21:29:55 GMT+0300 (Jerusalem Daylight Time)"), new Date("Wed Jun 09 2017 14:08:53 GMT+0200 (Jerusalem Standard Time)")];
        const dateLimit = moment(domain[1]);
        const allDataLine = [{x: new Date('Thu Jun 30 2016 21:29:55 GMT+0300 (Jerusalem Daylight Time)'), y: 50},
            {x: new Date('Fri Jul 08 2016 17:47:10 GMT+0300 (Jerusalem Daylight Time)'), y: 30},
            {x: new Date('Wed Aug 17 2016 20:46:03 GMT+0300 (Jerusalem Daylight Time)'), y: 10},
            {x: new Date('Wed Nov 09 2016 14:08:53 GMT+0200 (Jerusalem Standard Time)'), y: 90}];
        _.forEach(allDataLine, function(dot){
            if(moment(dot.x).isBefore(dateLimit)){
                dataLineChart.push(dot);
            }
        });
        const nature = 'original';
        const type = 'location';
        const clickGraph = function(){return;};
        const lineChart = {
            data: dataLineChart,
            domain: domain,
            nature: nature,
            type: type,
            clickGraph: clickGraph

        };
        return (
            <div className="box">
                <div className="top-toolbar-body">
                    Top toolbar
                </div>

                <div className="body-scroll">
                    <LineChart
                        data={lineChart.data}
                        domain={lineChart.domain}
                        nature={lineChart.nature}
                        type={lineChart.type}
                        click={lineChart.clickGraph}/>
                    <LineChart
                        data={lineChart.data}
                        domain={lineChart.domain}
                        nature={lineChart.nature}
                        type={lineChart.type}
                        click={lineChart.clickGraph}/>
                    <LineChart
                        data={lineChart.data}
                        domain={lineChart.domain}
                        nature={lineChart.nature}
                        type={lineChart.type}
                        click={lineChart.clickGraph}/>
                </div>
            </div>
        );
    }
}

CardDetails.propTypes = {
    //myProp: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        state: state
    };
}

function mapDispatchToProps(dispatch) {
    return {
        //actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDetails);
