import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as FakeData from '../../common/fakeData';
const List = ({myList, ItemComponent}) => {
    const theArrList = myList;
        const listItems = theArrList.map(function (item, i) {
            if (item.id) {
                return (
                    <div key={item.id} className="list-item ripple">
                        <ItemComponent item={item}/>
                    </div>
                );
            }
            return (
                <div key={i} className="list-item ripple">
                    <ItemComponent item={item}/>
                </div>
            );
        });
        return (
            <div>
                {listItems}
            </div>
        );
};

List.propTypes = {
    myList: PropTypes.array.isRequired,
    ItemComponent: PropTypes.func.isRequired
};

export default List;
