import React from 'react';
import "tailwindcss/tailwind.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
// import BossBattle from "./components/pages/BossBattle"
// import MinionBattle from "./components/pages/MinionBattle"
import Gathering from "./pages/Gathering"
// import Puzzle from "./components/pages/Puzzle"
// import Store from "./components/pages/Store"
// import Fighting from "./components/pages/Fighting"
import { QUERY_MAGE_ATTRIBUTES } from "./utils/queries"
import { useQuery } from '@apollo/client';



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
        <Navbar />
        <Switch>
          {/* <Route path='/' exact component={Home} /> */}
          {/* <Route path='/MinionBattle' component={MinionBattle} />
          <Route path='/BossBattle' component={BossBattle} />
          <Route path='/Fighting' component={Fighting} /> */}
          <Route path='/Gathering' /*mageData={mageData}*/ component={Gathering} />
          {/* <Route path='/Puzzle' component={Puzzle} />
          <Route path='/Store' component={Store} /> */}
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;

