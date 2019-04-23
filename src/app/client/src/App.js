import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "reactstrap";

import Navigation from "./components/Navigation";
import Profile from "./containers/Profile";

import Discover from "./containers/Discover";
import Schedule from "./containers/Schedule";
import Sessions from "./containers/Sessions";

const App = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Navigation />
      <Profile />
      <Container>
        <Route exact path="/" component={Schedule} />
        <Route path="/sessions" component={Sessions} />
        <Route path="/discover" component={Discover} />
      </Container>
    </Router>
  </Provider>
);

App.propTypes = {
  store: PropTypes.object.isRequired
};

export default App;
