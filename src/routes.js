import React from 'react';
import { Route, IndexRoute } from 'react-router';
import layout from './components/layoutItems/Layout';
import App from './components/App';//eslint-disable-line import/no-named-as-default
import buttonIcon from './components/common/button/buttonIcon';
import login from './components/login/login';

//<IndexRoute component={layout}/>
export default (
  <Route path="/" component={App}>
    <IndexRoute component={login} realm="careManager"/>
    <Route path="login" component={login} realm="careManager"/>
    <Route path="home" component={layout}/>
  </Route>
);
