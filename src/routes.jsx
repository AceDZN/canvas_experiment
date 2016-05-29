import React from 'react';
import Route from 'react-router/lib/Route'
import Router from 'react-router/lib/Router'
import hashHistory from 'react-router/lib/hashHistory'
import IndexRedirect from 'react-router/lib/IndexRedirect'

import App from './components/App.jsx';
import BouncingBall from './components/BouncingBall.jsx';
import PaintBrush from './components/PaintBrush.jsx';
import Breakout from './components/BreakOut/Breakout.jsx';
import VideoManipulation from './components/VideoManipulation.jsx';


module.exports = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route name="bouncingBall" path="/bouncingBall" component={BouncingBall} />
      <Route name="paintBrush" path="/paintBrush" component={PaintBrush} />
      <Route name="breakOut" path="/breakOut" component={Breakout} />
      <Route name="videoManipulation" path="/videoManipulation" component={VideoManipulation} />
      <IndexRedirect to="/bouncingBall" />
    </Route>
  </Router>
)
