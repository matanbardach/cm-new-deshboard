import * as types from '../const/actionTypes';
const initializeState = {
                            open: false,
                            textBut: 'Submit',
                            disableBut: false,
                            dialogReducer: null,
                            pageNumberArr: [{pageNum: 1, text: 1, active: true},
                                            {pageNum: 2, text: 2, active: false},
                                            {pageNum: 3, text: 3, active: true}]};

export default function dialogReducer(state = initializeState, action) {
    switch (action.type) {
        case types.OPEN_DIALOG:
        {
            // open only if there is dialogReducer
            if(state.dialogReducer){
                return Object.assign({}, state, {
                    open: true
                });
            }
            return Object.assign({}, state, {

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
        case types.CHANGE_DIALOG_REDUCER:
        {
            if(action.reducer){
                if(action.params){
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
            return Object.assign({}, state, {

            });
        }
        default:
            return state;
    }
}
