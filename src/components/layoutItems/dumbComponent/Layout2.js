import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LeftMenu from '../../leftMenu/leftMenu';
import MyDialog from '../../common/dialog/MyDialog';
import Layout1 from './Layout1';
import PatientList from '../../common/listPatient/PatientList';

const Layout2 = ({layoutClassName}) => {
    const theList = [{id: 1, name: 'first'},{id: 2, name: 'second'},{id: 1, name: 'third'}];
    return (
        <div className="body-big">
            <div className="row">
                <div className="left-menu box">
                    <LeftMenu/>
                </div>
                <div className={"body-right col-xs "+ layoutClassName}>
                    <div className="box">

                        <div className="row body-row">
                            <div className="col-xs-12 top-shell">
                                <div className="box light-theme">
                                    <div className="primary">
                                        Top shell!
                                    </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="box">
                                    <div className="red-back top-body top-corner-radius">Card</div>
                                    <div className="green-back top-body"></div>
                                    <div className="red-back top-body"></div>
                                    <div className="green-back top-body"></div>
                                    <div className="red-back top-body"></div>


                                </div>
                            </div>
                            <div className="col-xs card-details">
                                <div className="box">
                                    <div className="top-toolbar-body">
                                        Top toolbar
                                    </div>
                                    <div className="body-scroll">
                                            <MyDialog bodyComponent={PatientList}></MyDialog>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

Layout2.propTypes = {
    layoutClassName: PropTypes.string.isRequired
};

export default Layout2;
