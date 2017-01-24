const initializeState = {};
export default function leftMenuReducer(state = initializeState, action) {
    switch (action.type) {
        case 'simpleType':
        {
            return Object.assign({}, state, {});
        }
        default:
            return state;
    }
}
