import React from 'react';
import { Route, IndexRoute } from 'react-router';
import body from './components/layoutItems/body1';
import App from './components/App';//eslint-disable-line import/no-named-as-default

export default (
  <Route path="/" component={App}>
    <IndexRoute component={body} realm="CareManager"/>
  </Route>
);
