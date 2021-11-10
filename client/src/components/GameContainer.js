import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import BossBattle from '../pages/Fighting/BossBattle';
import Gathering from '../pages/Gathering/Gathering';
import Fighting from '../pages/Fighting/Fighting';
import MinionBattle from '../pages/Fighting/MinionBattle';
import Store from '../pages/Store';
import StatsBar from '../components/StatsBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';


export default function GameContainer() {

  return (
    <div>
      <h1>Game Container</h1>
      {/* <StatsBar /> */}
      {/* We are passing the currentPage from state and the function to update it */}
      {/* <Navbar currentPage={currentPage} handlePageChange={handlePageChange} /> */}
      {/* Here we are calling the renderPage method which will return a component  */}
      <Route path='/Home' component={Home} />
      <Route path='/MinionBattle' component={MinionBattle} />
      <Route path='/BossBattle' component={BossBattle} />
      <Route path='/Fighting' component={Fighting} />
      <Route path='/Gathering' component={Gathering} />
      <Route path='/Store' component={Store} />
      {/* {renderPage()} */}
    </div>
  );
}

