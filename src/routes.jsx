import React from 'react';
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import hashHistory from 'react-router/lib/hashHistory'
import IndexRedirect from 'react-router/lib/IndexRedirect'

var App = require('./components/App.jsx');
var BouncingBall = require('./components/BouncingBall.jsx');
var PaintBrush = require('./components/PaintBrush.jsx');
var Breakout = require('./components/BreakOut/Breakout.jsx');

module.exports = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route name="bouncingBall" path="/bouncingBall" component={BouncingBall} />
      <Route name="paintBrush" path="/paintBrush" component={PaintBrush} />
      <Route name="breakOut" path="/breakOut" component={Breakout} />
      <IndexRedirect to="/bouncingBall" />
    </Route>
  </Router>
)
