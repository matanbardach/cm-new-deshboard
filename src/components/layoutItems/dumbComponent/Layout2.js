import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LeftMenu from '../../leftMenu/leftMenu';
import MyDialog from '../../common/dialog/MyDialog';
import Layout1 from './Layout1';
import List from '../../common/List/List';
import * as FakeData from '../../common/fakeData';
import ItemComponent from '../../common/listItems/patientListItem';
import Body from '../../body/body';

const Layout2 = ({layoutClassName}) => {
    return (
        <div className="body-big">
            <MyDialog/>
            <div className="row">

                <div className="left-menu box">
                    <LeftMenu/>
                </div>

                <div className={"body-right col-xs "+ layoutClassName}>
                    <Body/>
                </div>
            </div>
        </div>
    );  // <List myList={FakeData.patientList} ItemComponent={ItemComponent}/>
};

Layout2.propTypes = {
    layoutClassName: PropTypes.string.isRequired
};

export default Layout2;
