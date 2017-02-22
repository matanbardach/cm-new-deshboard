import expect from 'expect';
import dialogReducer from './dialogReducer';
import * as actions from '../actions';


describe('Dialog Reducer', () => {
    it('open dialog and there is no reducer OPEN_DIALOG', () => {
        const initialState = {
            open: false,
            textBut: 'Submit',
            disableBut: false,
            dialogReducer: null,
            pageNumberArr: [
                {pageNum: 1, text: 1, active: true},
                {pageNum: 2, text: 2, active: false},
                {pageNum: 3, text: 3, active: true}
            ]
        };

        const actionOpenDialog = actions.openDialog();
        const newState = dialogReducer(initialState, actionOpenDialog);

        expect(newState).toEqual({
            open: false,
            textBut: 'Submit',
            disableBut: false,
            dialogReducer: null,
            pageNumberArr: [
                {pageNum: 1, text: 1, active: true},
                {pageNum: 2, text: 2, active: false},
                {pageNum: 3, text: 3, active: true}
            ]
        });
    });
    it('open dialog and reducer exist OPEN_DIALOG', () => {
        const initialState = {
            open: false,
            textBut: 'Submit',
            disableBut: false,
            dialogReducer: {reducerName: "Try reducer", id: 2465},
            pageNumberArr: [
                {pageNum: 1, text: 1, active: true},
                {pageNum: 2, text: 2, active: false},
                {pageNum: 3, text: 3, active: true}
            ]
        };

        const actionOpenDialog = actions.openDialog();
        const newState = dialogReducer(initialState, actionOpenDialog);

        expect(newState).toEqual({
            open: true,
            textBut: 'Submit',
            disableBut: false,
            dialogReducer: {reducerName: "Try reducer", id: 2465},
            pageNumberArr: [
                {pageNum: 1, text: 1, active: true},
                {pageNum: 2, text: 2, active: false},
                {pageNum: 3, text: 3, active: true}
            ]
        });
    });

    it('close dialog CLOSE_DIALOG', () => {
        const initialState = {
            open: true,
            textBut: 'Submit',
            disableBut: false,
            dialogReducer: {reducerName: "Try reducer", id: 2465},
            pageNumberArr: [
                {pageNum: 1, text: 1, active: true},
                {pageNum: 2, text: 2, active: false},
                {pageNum: 3, text: 3, active: true}
            ]
        };

        const actionOpenDialog = actions.closeDialog();
        const newState = dialogReducer(initialState, actionOpenDialog);

        expect(newState).toEqual({
            open: false,
            textBut: 'Submit',
            disableBut: false,
            dialogReducer: {reducerName: "Try reducer", id: 2465},
            pageNumberArr: [
                {pageNum: 1, text: 1, active: true},
                {pageNum: 2, text: 2, active: false},
                {pageNum: 3, text: 3, active: true}
            ]
        });
    });

    it('change dialog button text CHANGE_DIALOG_BUT_TEXT', () => {
        const initialState = {
            open: false,
            textBut: 'Submit',
            disableBut: false,
            dialogReducer: {reducerName: "Try reducer", id: 2465},
            pageNumberArr: [
                {pageNum: 1, text: 1, active: true},
                {pageNum: 2, text: 2, active: false},
                {pageNum: 3, text: 3, active: true}
            ]
        };

        const actionOpenDialog = actions.changeBuText("Next");
        const newState = dialogReducer(initialState, actionOpenDialog);

        expect(newState).toEqual({
            open: false,
            textBut: 'Next',
            disableBut: false,
            dialogReducer: {reducerName: "Try reducer", id: 2465},
            pageNumberArr: [
                {pageNum: 1, text: 1, active: true},
                {pageNum: 2, text: 2, active: false},
                {pageNum: 3, text: 3, active: true}
            ]
        });
    });
    it('change dialog button text with null CHANGE_DIALOG_BUT_TEXT', () => {
        const initialState = {
            open: false,
            textBut: 'Submit',
            disableBut: false,
            dialogReducer: {reducerName: "Try reducer", id: 2465},
            pageNumberArr: [
                {pageNum: 1, text: 1, active: true},
                {pageNum: 2, text: 2, active: false},
                {pageNum: 3, text: 3, active: true}
            ]
        };

        const actionOpenDialog = actions.changeBuText();
        const newState = dialogReducer(initialState, actionOpenDialog);

        expect(newState).toEqual({
            open: false,
            textBut: 'Submit',
            disableBut: false,
            dialogReducer: {reducerName: "Try reducer", id: 2465},
            pageNumberArr: [
                {pageNum: 1, text: 1, active: true},
                {pageNum: 2, text: 2, active: false},
                {pageNum: 3, text: 3, active: true}
            ]
        });
    });

    it('change dialog reducer CHANGE_DIALOG_REDUCER', () => {
        const initialState = {
            open: true,
            textBut: 'Submit',
            disableBut: false,
            dialogReducer: {reducerName: "Try reducer", id: 2465},
            pageNumberArr: [
                {pageNum: 1, text: 1, active: true},
                {pageNum: 2, text: 2, active: false},
                {pageNum: 3, text: 3, active: true}
            ]
        };

        const bodyReducer = {otherObject: [1,2,3,4,5], text: "New Reducer", id: 3463467};
        const params = {list: [23,43265,3456,2345]};
        const actionOpenDialog = actions.changeBodyReducer(bodyReducer, params);
        const newState = dialogReducer(initialState, actionOpenDialog);

        expect(newState).toEqual({
            open: true,
            textBut: 'Submit',
            disableBut: false,
            dialogReducer: bodyReducer,
            params: params,
            pageNumberArr: [
                {pageNum: 1, text: 1, active: true},
                {pageNum: 2, text: 2, active: false},
                {pageNum: 3, text: 3, active: true}
            ]
        });
    });

    it('change dialog num page active num exist CHANGE_DIALOG_NUM_ACTIVE', () => {
        const initialState = {
            open: true,
            textBut: 'Submit',
            disableBut: false,
            dialogReducer: {reducerName: "Try reducer", id: 2465},
            pageNumberArr: [
                {pageNum: 1, text: 1, active: true},
                {pageNum: 2, text: 2, active: false},
                {pageNum: 3, text: 3, active: false}
            ]
        };

        const numChangeTo = 3;
        const actionOpenDialog = actions.changePageNumActive(numChangeTo);

        const newState = dialogReducer(initialState, actionOpenDialog);
        expect(newState).toEqual({
            open: true,
            textBut: 'Submit',
            disableBut: false,
            dialogReducer: {reducerName: "Try reducer", id: 2465},
            pageNumberArr: [
                {pageNum: 1, text: 1, active: false},
                {pageNum: 2, text: 2, active: false},
                {pageNum: 3, text: 3, active: true}
            ]
        });
    });

    it('change dialog num page active num not exist CHANGE_DIALOG_NUM_ACTIVE', () => {
        const initialState = {
            open: true,
            textBut: 'Submit',
            disableBut: false,
            dialogReducer: {reducerName: "Try reducer", id: 2465},
            pageNumberArr: [
                {pageNum: 1, text: 1, active: true},
                {pageNum: 2, text: 2, active: false},
                {pageNum: 3, text: 3, active: false}
            ]
        };

        const numChangeTo = 4;
        const actionOpenDialog = actions.changePageNumActive(numChangeTo);

        const newState = dialogReducer(initialState, actionOpenDialog);
        expect(newState).toEqual(initialState);
    });
});