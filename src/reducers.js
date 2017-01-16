import {combineReducers} from 'redux';
import apiReducer from './components/common/api/apiReducer';

// To this file we add the all reducers of the project.
const rootReducer = combineReducers({
    apiReducer
});


export default rootReducer;
