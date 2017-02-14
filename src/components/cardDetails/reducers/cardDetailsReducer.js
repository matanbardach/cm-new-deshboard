const initializeState = {};
export default function cardDetailsReducer(state = initializeState, action) {
    switch (action.type) {
        case 'simpleType':
        {
            return Object.assign({}, state, {});
        }
        default:
            return state;
    }
}
