import {combineReducers} from 'redux';
import apiReducer from './components/common/api/apiReducer';
import leftMenuReducer from './components/leftMenu/reducers/leftMenuReducer';
import layoutReducer from './components/layoutItems/reducers/layoutReducer';

// To this file we add the all reducers of the project.
const rootReducer = combineReducers({
    apiReducer,
    leftMenuReducer,
    layoutReducer
});


export default rootReducer;
