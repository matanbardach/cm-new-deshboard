import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PatientListItem from './patientListItem';
import * as FakeData from '../../common/fakeData';
const PatientList = ({myList}) => {
        /// <div><img src={'http://placehold.it/400x20&text=slide1'} alt="boohoo" className="img-responsive"/><span>Hello {this.props.name}</span></div>
        //const theArrList = [{id: 1, name: "the number 1", picture: 'https://app-2258.on-aptible.com/files?etag=b965f7200eb4bd1e9064857e60b0112c&key=users/55a376ec0cc0d10300bfa810/1480974455848_picture_filename'}];
        const theArrList = FakeData.patientList;
        //const theArrList = [];
        //for(let i = 1; i < 25; i++){
        //        let diagnosis = "";
        //        if(i%3 == 0){
        //                diagnosis = 'Diagnosis';
        //        }
        //        theArrList.push({id: i,
        //                        name: "the number "+ i+" ",
        //                        diagnosis: diagnosis,
        //                        picture: 'https://app-2258.on-aptible.com/files?etag=b965f7200eb4bd1e9064857e60b0112c&key=users/55a376ec0cc0d10300bfa810/1480974455848_picture_filename'})
        //}
        const listItems = theArrList.map(function(item){
           return(
               <div className="list-item ripple">
                                <PatientListItem item={item}/>
               </div>
           );
        });
    return (
        <div>
                {listItems}
        </div>
    );
};

PatientList.propTypes = {
    myList: PropTypes.array
};

export default PatientList;
