import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LeftMenu from '../../leftMenu/leftMenu';


const Layout1 = ({layoutClassName}) => {
    //const layoutClassName = this.props.layout.className;
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


                            <div className="col-xs full-screen">
                                <div className="box">

                                    <div className="full-tool-bar">Toolbar</div>
                                    <div className="full-body-with-toolbar">
                                        <ul>
                                            <li>fhbdfghdfshgdfhd1111</li>
                                            <li>fhvbdfghdfshgfojbfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssssendddddddd</li>
                                        </ul>
                                    </div>
                                    <div className="full-body-without-toolbar">
                                        <ul>
                                            <li>fhbdfghdfshgdfhd1111</li>
                                            <li>fhvbdfghdfshgfojbfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssssendddddddd</li>
                                        </ul>
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
                                        <ul>
                                            <li>fhbdfghdfshgdfhd1111</li>
                                            <li>fhvbdfghdfshgfojbfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>fhbdfghdfshgdfhd</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssss</li>
                                            <li>ssssssssssssssssendddddddd</li>
                                        </ul>
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

Layout1.propTypes = {
    layoutClassName: PropTypes.string.isRequired
};

export default Layout1;
