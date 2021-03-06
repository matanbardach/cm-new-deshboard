import React from 'react';
import { Route, IndexRoute } from 'react-router';
import layout from './components/layoutItems/Layout';
import App from './components/App';//eslint-disable-line import/no-named-as-default
import buttonIcon from './components/common/button/buttonIcon';
import login from './components/login/login';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={layout}/>
    <Route path="login" component={login}/>
  </Route>
);
