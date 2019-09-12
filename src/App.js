import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import Post from './component/Post';

function App() {
  return (
    <div className="container">
      <div className="content">
        <Router>
          <Switch>
            <Route  path='/home' component={Home} />
            <Route  path='/post/:id' component={Post} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
