import React, {Component} from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';

import Home from './pages/Home';

import './App.css';
import 'milligram';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Home path="/" component={Home} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
