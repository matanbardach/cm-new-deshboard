import {combineReducers} from 'redux';
import apiReducer from './components/common/api/apiReducer';
import leftMenuReducer from './components/leftMenu/reducers/leftMenuReducer';
import layoutReducer from './components/layoutItems/reducers/layoutReducer';
import dialogReducer from './components/common/dialog/reducers/dialogReducer';
// To this file we add the all reducers of the project.
const rootReducer = combineReducers({
    apiReducer,
    leftMenuReducer,
    layoutReducer,
    dialogReducer
});


export default rootReducer;
