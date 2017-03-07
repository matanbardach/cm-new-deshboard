const initializeState = {
    cm: {
        status: 'off'
    },
    patient: {
        status: 'off'
    }
};
export default function videoChatReducer(state = initializeState, action) {
    switch (action.type) {
        case 'simpleType':
        {
            return Object.assign({}, state, {});
        }
        default:
            return state;
    }
}
