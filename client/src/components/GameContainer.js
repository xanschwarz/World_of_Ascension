import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import BossBattle from '../pages/Fighting/BossBattle';
import Gathering from '../pages/Gathering/Gathering';
import Fighting from '../pages/Fighting/Fighting';
import MinionBattle from '../pages/Fighting/MinionBattle';
import Store from '../pages/Store/Store';
import StatsBar from '../components/StatsBar';

export default function GameContainer() {
  const [currentPage, setCurrentPage] = useState('Home');

  // This method is checking to see what the value of `currentPage` is. Depending on the value of currentPage, we return the corresponding component to render.
  const renderPage = () => {
    if (currentPage === 'Home') {
      return <Home />;
    }
    if (currentPage === 'Gathering') {
      return <Gathering />;
    }
    if (currentPage === 'BossBattle') {
      return <BossBattle />;
    }
    if (currentPage === 'Fighting') {
      return <Fighting />;
    }
    if (currentPage === 'MinionBattle') {
      return <MinionBattle />;
    }
    if (currentPage === 'Store') {
      return <Store />;
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div>
      <h1>Game Container</h1>
      <StatsBar />
      {/* We are passing the currentPage from state and the function to update it */}
      <Navbar currentPage={currentPage} handlePageChange={handlePageChange} />
      {/* Here we are calling the renderPage method which will return a component  */}
      {renderPage()}
      <Footer></Footer>
    </div>
  );
}
