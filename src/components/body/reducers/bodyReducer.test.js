import expect from 'expect';
import bodyReducer from './bodyReducer';
import * as actions from '../action';

//import * as errorTypes from '../constant/errorTypes';
//import * as errorText from '../constant/errorText';

describe('Body Reducer', () => {
    it('body show card SHOW_CARD', () => {
        const initialState = {
            showCard: false,
            showCardDetails: false,
            showFullBody: true
        };

        const actionHideCard = actions.showCard();
        const newState = bodyReducer(initialState, actionHideCard);

        expect(newState).toEqual({
            showCard: true,
            showCardDetails: false,
            showFullBody: true
        });
    });

    it('body hide card HIDE_CARD', () => {
        const initialState = {
            showCard: true,
            showCardDetails: false,
            showFullBody: true
        };

        const actionHideCard = actions.hideCard();
        const newState = bodyReducer(initialState, actionHideCard);

        expect(newState).toEqual({
            showCard: false,
            showCardDetails: false,
            showFullBody: true
        });
    });

    it('body show card details SHOW_CARD_DETAILS', () => {
        const initialState = {
            showCard: false,
            showCardDetails: false,
            showFullBody: true
        };

        const actionShowCardDetails = actions.showCardDetails();
        const newState = bodyReducer(initialState, actionShowCardDetails);

        expect(newState).toEqual({
            showCard: false,
            showCardDetails: true,
            showFullBody: true
        });
    });

    it('body hide card details HIDE_CARD_DETAILS', () => {
        const initialState = {
            showCard: true,
            showCardDetails: true,
            showFullBody: true
        };

        const actionHideCardDetails = actions.hideCardDetails();
        const newState = bodyReducer(initialState, actionHideCardDetails);

        expect(newState).toEqual({
            showCard: true,
            showCardDetails: false,
            showFullBody: true
        });
    });

});