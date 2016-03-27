import React from 'react';
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import hashHistory from 'react-router/lib/hashHistory'
import IndexRedirect from 'react-router/lib/IndexRedirect'

var App = require('./components/App.jsx');
var bouncingBall = require('./components/BouncingBall.jsx');

module.exports = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route name="bouncingBall" path="/bouncingBall" component={bouncingBall} />
      <IndexRedirect to="/bouncingBall" />
    </Route>
  </Router>
)
