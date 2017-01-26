import * as types from '../const/actionTypes';
const initializeState = {
                            open: false,
                            textBut: 'Submit',
                            disableBut: false,
                            pageNumberArr: [{pageNum: 1, text: 1, active: true},
                                            {pageNum: 2, text: 2, active: false},
                                            {pageNum: 3, text: 3, active: true}]};

export default function dialogReducer(state = initializeState, action) {
    switch (action.type) {
        case types.OPEN_DIALOG:
        {
            return Object.assign({}, state, {
                open: true
            });
        }
        case types.CLOSE_DIALOG:
        {
            return Object.assign({}, state, {
                open: false
            });
        }
        case types.CHANGE_DIALOG_BUT_TEXT:
        {
            if(action.butText){
                return Object.assign({}, state, {
                    textBut: action.butText
                });
            }
            return Object.assign({}, state, {

            });
        }
        default:
            return state;
    }
}
