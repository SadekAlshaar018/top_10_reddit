import React from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './component/home';
import Post from './component/post';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route  path='/home' component={Home} />
          <Route  path='/post/:id' component={Post} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
