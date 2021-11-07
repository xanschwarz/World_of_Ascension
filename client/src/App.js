import React from 'react';
import "tailwindcss/tailwind.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import NavBar from './components/NavBar.js';
import StatsBar from './components/StatsBar.js';
import MinionBattle from './pages/Fighting/MinionBattle';
import BossBattle from './pages/Fighting/BossBattle';
import Gathering from './pages/Gathering/Gathering';
import Fighting from './pages/Fighting/Fighting';
import Store from './pages/Store';



// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div
          className="col-12 w-screen mb-3 bg-gray-800 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <StatsBar />
        </div>
        <div className="col-12 mb-3"> <NavBar /> 
        
          <div className="container">
            {/* <Route exact path="/">
              <Home />
            </Route> */}
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/me">
              <Profile />
            </Route>
            <Route path='/Home' component={Home} />
            <Route path='/MinionBattle' component={MinionBattle} />
            <Route path='/BossBattle' component={BossBattle} />
            <Route path='/Fighting' component={Fighting} />
            <Route path='/Gathering' component={Gathering} />
            <Route path='/Store' component={Store} />

            <Route exact path="/profiles/:username">
              <Profile />
            </Route>
            <Route exact path="/thoughts/:thoughtId">
            </Route>
          </div>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

