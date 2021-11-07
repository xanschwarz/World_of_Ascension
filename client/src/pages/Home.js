import React from 'react';
import { useQuery } from '@apollo/client';

import NavBar from '../components/NavBar.js';
import StatsBar from '../components/StatsBar.js';

import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 w-screen mb-3 bg-gray-800 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <StatsBar />
        </div>
        <div className="col-12 col-md-8  mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <NavBar
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
