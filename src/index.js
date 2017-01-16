import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import * as myStore from './components/common/store.service';
// Those two line for the react-grid-system
//import '../node_modules/react-grid-layout/css/styles.css';
//import '../node_modules/react-resizable/css/styles.css';
import './components/layoutItems/styles.css';
import '../node_modules/flexboxgrid/css/flexboxgrid.min.css';
const store = configureStore();
myStore.setStore(store);
// initial the init state!

render(
    <Provider store={store}>
        <Router history={browserHistory} routes={routes}/>
    </Provider>,
    document.getElementById('app')
);
//export default store.dispatch;