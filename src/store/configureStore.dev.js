import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import * as configuration from '../components/config';

export default function configureStore(initialState) {
  console.log("Configure store of test");
  var config = {
    chatURL: 'https://app-2168.on-aptible.com',
    baseUrl: 'https://app-2258.on-aptible.com/api',
    timeOut: 60*1000*60*12
  };
  configuration.setConfig(config);

  return createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk, reduxImmutableStateInvariant())
    )
  );
}

