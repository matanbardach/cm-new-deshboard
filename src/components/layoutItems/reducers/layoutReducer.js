import * as types from '../const/actionsType';
const initializeState = {section: 'home', className: 'home-background'};
export default function layoutReducer(state = initializeState, action) {
    switch (action.type) {
        case types.CHANGE_LAYOUT_SECTION:
        {
            switch (action.section){
                case 'home': {
                    return Object.assign({}, state, {
                        section: 'home', className: 'home-background'
                    });
                }
                case 'alert': {
                    return Object.assign({}, state, {
                        section: 'alert', className: 'alert-background'
                    });
                }
                case 'patient': {
                    return Object.assign({}, state, {
                        section: 'patient', className: 'patient-background'
                    });
                }
                case 'message': {
                    return Object.assign({}, state, {
                        section: 'message', className: 'message-background'
                    });
                }
                case 'carePlan': {
                    return Object.assign({}, state, {
                        section: 'carePlan', className: 'care-plan-background'
                    });
                }
                default: {
                    return Object.assign({}, state, {

                    });
                }
            }
        }
        default:
            return state;
    }
}
