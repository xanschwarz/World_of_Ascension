// GameContainer (or individual displays -> what are currently pages) will, if not authenticated, render a modal container.

import React from 'react';
import Home from '../pages/Home';
import BossBattle from '../pages/Fighting/BossBattle';
import Gathering from '../pages/Gathering/Gathering';
import Fighting from '../pages/Fighting/Fighting';
import MinionBattle from '../pages/Fighting/MinionBattle';
import Store from '../pages/Store/Store';
import Profile from '../pages/Profile';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import ModalContainer from './Modal/ModalContainer';

export default function GameContainer() {
  // const { username: userParam } = useParams();

  // const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
  //   variables: { username: userParam },
  // });

  // const user = data?.me || data?.user || {};

  // // If logged in...
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Redirect to="/me" />;
  // }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // // If not logged in...
  // if (!user?.username) {
  //   return (
  //     <div>
  //       <ModalContainer />
  //     </div>
  //   );
  // }

  return (
    <div>
      {Auth.loggedIn() ? (
        <div>
          <Route path="/Home" component={Home} />
          <Route path="/MinionBattle" component={MinionBattle} />
          <Route path="/BossBattle" component={BossBattle} />
          <Route path="/Fighting" component={Fighting} />
          <Route path="/Gathering" component={Gathering} />
          <Route path="/Store" component={Store} />
          <Route path="/Profile" component={Profile} />
        </div>
      ) : (
        <div>
          <ModalContainer />
        </div>
      )}
    </div>
  );
}
