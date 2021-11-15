import React from 'react';
import Home from '../pages/Home';
import BossBattle from '../pages/Fighting/BossBattle';
import Gathering from '../pages/Gathering/Gathering';
import Fighting from '../pages/Fighting/Fighting';
import MinionBattle from '../pages/Fighting/MinionBattle';
import Store from '../pages/Store/Store';
import Profile from '../pages/Profile';
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function GameContainer() {
  return (
    <div>
      <Route path="/Home" component={Home} />
      <Route path="/MinionBattle" component={MinionBattle} />
      <Route path="/BossBattle" component={BossBattle} />
      <Route path="/Fighting" component={Fighting} />
      <Route path="/Gathering" component={Gathering} />
      <Route path="/Store" component={Store} />
      <Route path="/Profile" component={Profile} />
    </div>
  );
}
