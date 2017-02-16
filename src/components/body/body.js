import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import * as actions from './action';
import './styles/style.less';
import Card from '../card/card';
import CardDetails from '../cardDetails/cardDetails';
import Shell from '../topShell/topShell';
import LineChart from '../common/chart/chart';
import StickChart from '../common/chart/chartSticksLine';
import TwoLineChart from '../common/chart/charTwoLine';
import moment from 'moment';
import _ from 'lodash';
//import ProfileImage from '../../images/user_male.png';
//import ProfileImage1 from '../../images/user_male.jpeg';
//import LineChart from '../lineChart/lineChart';

class body extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let cardDetailsClass = 'col-xs card-details';
        const showCard = this.props.body.showCard;
        if(!showCard){
            cardDetailsClass = 'col-xs-12 card-details';
        }
        const nature = 'original';
        const type = 'location';
        const type2 = ['location', 'glocus'];
        const type3 = 'meds';

        const clickGraph = function(){return;};
        const dataLineChart = [];
        const dataTwoLineChart = {arr1: [], arr2: []};
        const dataStickChart = [];
        const domain = [new Date("Thu Jun 5 2016 21:29:55 GMT+0300 (Jerusalem Daylight Time)"), new Date("Wed Jun 09 2017 14:08:53 GMT+0200 (Jerusalem Standard Time)")];
        const allData = [{x: new Date('Thu Jun 30 2016 21:29:55 GMT+0300 (Jerusalem Daylight Time)'), y: 50},
            {x: new Date('Fri Jul 08 2016 17:47:10 GMT+0300 (Jerusalem Daylight Time)'), y: 30},
            {x: new Date('Wed Aug 17 2016 20:46:03 GMT+0300 (Jerusalem Daylight Time)'), y: 10},
            {x: new Date('Wed Nov 09 2016 14:08:53 GMT+0200 (Jerusalem Standard Time)'), y: 90},
            {x: new Date('Wed Jun 01 2017 14:08:53 GMT+0200 (Jerusalem Standard Time)'), y: 50}];

        const allDataTwoChart = {arr1: [
            {x: new Date('Thu Jun 30 2016 21:29:55 GMT+0300 (Jerusalem Daylight Time)'), y: 50},
            {x: new Date('Fri Jul 08 2016 17:47:10 GMT+0300 (Jerusalem Daylight Time)'), y: 30},
            {x: new Date('Wed Aug 17 2016 20:46:03 GMT+0300 (Jerusalem Daylight Time)'), y: 15},
            {x: new Date('Wed Nov 09 2016 14:08:53 GMT+0200 (Jerusalem Standard Time)'), y: 90},
            {x: new Date('Wed Jun 01 2017 14:08:53 GMT+0200 (Jerusalem Standard Time)'), y: 70}],
            arr2: [
                {x: new Date('Thu Jun 30 2016 21:29:55 GMT+0300 (Jerusalem Daylight Time)'), y: 40},
                {x: new Date('Fri Jul 08 2016 17:47:10 GMT+0300 (Jerusalem Daylight Time)'), y: 60},
                {x: new Date('Wed Aug 17 2016 20:46:03 GMT+0300 (Jerusalem Daylight Time)'), y: 30},
                {x: new Date('Wed Nov 09 2016 14:08:53 GMT+0200 (Jerusalem Standard Time)'), y: 50},
                {x: new Date('Wed Jun 01 2017 14:08:53 GMT+0200 (Jerusalem Standard Time)'), y: 30}]};

        const allDataStickChart = [
            {x: new Date('Thu Jun 30 2016 21:29:55 GMT+0300 (Jerusalem Daylight Time)'), y: 120, total: 25},
            {x: new Date('Fri Jul 08 2016 17:47:10 GMT+0300 (Jerusalem Daylight Time)'), y: 100, total: 20},
            {x: new Date('Wed Aug 17 2016 20:46:03 GMT+0300 (Jerusalem Daylight Time)'), y: 110, total: 30},
            {x: new Date('Wed Nov 09 2016 14:08:53 GMT+0200 (Jerusalem Standard Time)'), y: 90, total: 20},
            {x: new Date('Wed Jun 01 2017 14:08:53 GMT+0200 (Jerusalem Standard Time)'), y: 130, total: 55}];

        const dateLimit = moment(domain[1]);

        _.forEach(allData, function(dot){
            if(moment(dot.x).isBefore(dateLimit)){
                dataLineChart.push(dot);
            }
        });
        _.forEach(allDataTwoChart.arr1, function(dot){
            if(moment(dot.x).isBefore(dateLimit)){
                dataTwoLineChart.arr1.push(dot);
            }
        });
        _.forEach(allDataTwoChart.arr2, function(dot){
            if(moment(dot.x).isBefore(dateLimit)){
                dataTwoLineChart.arr2.push(dot);
            }
        });
        _.forEach(allDataStickChart, function(dot){
            if(moment(dot.x).isBefore(dateLimit)){
                dataStickChart.push(dot);
            }
        });
        const lineChart = {
            data: dataLineChart,
            domain: domain,
            nature: nature,
            type: type,
            clickGraph: clickGraph

        };
        const TwolineChart = {
            data: dataTwoLineChart,
            domain: domain,
            nature: nature,
            type: type2,
            clickGraph: clickGraph

        };
        const StickChartProps = {
            data: dataStickChart,
            domain: domain,
            nature: nature,
            type: type3,
            clickGraph: clickGraph

        };
        //let sss = require('/src/images/user_male.png');
        //console.log(sss);
        /*

        * */
        return (
            <div className="box">
                <div className="row body-row">

                    <Shell/>
                    <div className="body-deep">
                        <div className="chart-wrap">
                            <LineChart
                                data={lineChart.data}
                                domain={lineChart.domain}
                                nature={lineChart.nature}
                                type={lineChart.type}
                                click={lineChart.clickGraph}
                            />


                            <TwoLineChart
                                data={TwolineChart.data}
                                domain={TwolineChart.domain}
                                nature={TwolineChart.nature}
                                type={TwolineChart.type}
                                click={TwolineChart.clickGraph}
                            />

                            <StickChart
                                data={StickChartProps.data}
                                domain={StickChartProps.domain}
                                nature={StickChartProps.nature}
                                type={StickChartProps.type}
                                click={StickChartProps.clickGraph}
                            />


                        </div>
                    </div>

                    {this.props.body.showCard ? <Card/> : <div></div>}


                    {this.props.body.showCardDetails ? <div className={cardDetailsClass}>
                        <CardDetails/>
                    </div> : <div></div>}

                </div>
            </div>
        );
    }
}

body.propTypes = {
    body: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        body: state.bodyReducer
    };
}

function mapDispatchToProps(dispatch) {
    return {
        //actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(body);
