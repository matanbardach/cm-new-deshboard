import * as types from '../const/actionTypes';
import _ from 'lodash';
const initializeState = {
        open: false,
        textBut: 'Submit',
        disableBut: false,
        dialogReducer: null,
        pageNumberArr: [
                            {pageNum: 1, text: 1, active: true},
                            {pageNum: 2, text: 2, active: false},
                            {pageNum: 3, text: 3, active: false},
                            {pageNum: 4, text: 4, active: false},
                            {pageNum: 5, text: 5, active: false}
                        ]
};

export default function dialogReducer(state = initializeState, action) {
    switch (action.type) {
        case types.OPEN_DIALOG:
        {
            // open only if there is dialogReducer
            if (state.dialogReducer) {
                return Object.assign({}, state, {
                    open: true
                });
            }
            return Object.assign({}, state, {});

        }
        case types.CLOSE_DIALOG:
        {
            return Object.assign({}, state, {
                open: false
            });
        }
        case types.CHANGE_DIALOG_BUT_TEXT:
        {
            if (action.butText) {
                return Object.assign({}, state, {
                    textBut: action.butText
                });
            }
            return Object.assign({}, state, {});
        }
        case types.CHANGE_DIALOG_REDUCER:
        {
            if (action.reducer) {
                if (action.params) {
                    return Object.assign({}, state, {
                        dialogReducer: action.reducer,
                        params: action.params
                    });
                }
                return Object.assign({}, state, {
                    dialogReducer: action.reducer,
                    params: {}
                });

            }
            return Object.assign({}, state, {});
        }
        case types.CHANGE_DIALOG_NUM_ACTIVE:
        {
            let newNumArr = _.cloneDeep(state.pageNumberArr);
            // check first if page exist
            let pageExist = false;
            _.forEach(newNumArr, function(page){
                if(page.pageNum == action.pageNum){
                    pageExist = true;
                }
            });
            // if page exist so change the active!
            if(pageExist){
                _.forEach(newNumArr, function(page){
                    if(page.pageNum == action.pageNum){
                        page.active = true;
                    }else{
                        page.active = false;
                    }
                });
            }
            return Object.assign({}, state, {
                pageNumberArr: newNumArr
            });
        }
        default:
            return state;
    }
}
