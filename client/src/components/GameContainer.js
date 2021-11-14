import React, { useState } from 'react';
import Home from '../pages/Home';
import BossBattle from '../pages/Fighting/BossBattle';
import Gathering from '../pages/Gathering/Gathering';
import Fighting from '../pages/Fighting/Fighting';
import MinionBattle from '../pages/Fighting/MinionBattle';
import Store from '../pages/Store/Store';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Profile from '../pages/Profile';
import { Redirect, useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import Auth from '../utils/auth';



export default function GameContainer() {
  const { username: userParam } = useParams();


  // Query for mageAttributes
  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME , {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/home" />;
  }
  console.log(data);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <Route path='/Home' component={Home} />
      <Route path='/MinionBattle' component={MinionBattle} />
      <Route path='/BossBattle' component={BossBattle} />
      <Route path='/Fighting' component={Fighting} />
      <Route path='/Gathering' component={Gathering} />
      <Route path='/Store' component={Store} />
      <Route path='/Profile' component={Profile} />
    </div>
  );
}