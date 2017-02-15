import {combineReducers} from 'redux';
import apiReducer from './components/common/api/apiReducer';
import leftMenuReducer from './components/leftMenu/reducers/leftMenuReducer';
import layoutReducer from './components/layoutItems/reducers/layoutReducer';
import dialogReducer from './components/common/dialog/reducers/dialogReducer';
import cardReducer from './components/card/reducers/cardReducer';
import bodyReducer from './components/body/reducers/bodyReducer';
import cardDetailsReducer from './components/cardDetails/reducers/cardDetailsReducer';
import topShellReducer from './components/topShell/reducers/topShellReducer';
import loginReducer from './components/login/reducers/loginReducer';


// To this file we add the all reducers of the project.
const rootReducer = combineReducers({
    apiReducer,
    leftMenuReducer,
    layoutReducer,
    dialogReducer,
    bodyReducer,
    cardReducer,
    cardDetailsReducer,
    topShellReducer,
    loginReducer
});


export default rootReducer;
