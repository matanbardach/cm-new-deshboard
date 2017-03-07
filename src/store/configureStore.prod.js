import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import * as configuration from '../components/config';

export default function configureStore(initialState) {
  console.log("Configure store of production");
  var config = {
    chatURL: 'https://chat-api.valerahealth.com/',
    baseUrl: 'https://api.valerahealth.com/api',
    timeOut: 60*1000*60*12
  };
  configuration.setConfig(config);
  //window.sessionStorage.setItem("config", JSON.stringify(config));
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
}

