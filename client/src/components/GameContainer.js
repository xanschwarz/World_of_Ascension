import React, { useState } from 'react';
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
import LoginModal from './LoginModal';
import ModalSwitcher from './ModalSwitcher';
// import LoginModal from './LoginModal';

export default function GameContainer() {
  const { username: userParam } = useParams();
  const [currentModal, setCurrentModal] = useState('LoginModal');

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  // If logged in...
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // If not logged in...
  // Display login modal. If user clicks login display button, display login, if user clicks signup display button, display signup. Not pretty but it works sans using useState.
  if (!user?.username) {
    const renderModal = () => {
      if (currentModal === 'LoginModal') {
        return <LoginModal />;
      }
      // if (currentModal === 'Contact') {
      //   return <Contact />;
      // }
      // if (currentModal === 'Portfolio') {
      //   return <Portfolio />;
      // }
      // return <Resume />;
    };

    // const handleModalChange = (modal) => setCurrentModal(modal);

    // Needs a separate component with buttons for login and signup that changes display based on which one is currentModal. See hw and activity for conditional rendering.
    return (
      <div>
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* <ModalSwitcher /> */}
          {renderModal()}
        </div>
        {/* <div>
          <Route path="/Home" component={Home} />
          <Route path="/MinionBattle" component={MinionBattle} />
          <Route path="/BossBattle" component={BossBattle} />
          <Route path="/Fighting" component={Fighting} />
          <Route path="/Gathering" component={Gathering} />
          <Route path="/Store" component={Store} />
          <Route path="/Profile" component={Profile} />
        </div> */}
      </div>
    );
  }

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
