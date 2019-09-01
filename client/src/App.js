import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Home from './components/Home';
import CommentsPage from './components/CommentsPage';
import GamePage from './components/GamePage';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path = "/" component = {Home} />
          <Route exact path = "/soon" component = {GamePage} />
          <Route exact path = "/comments" component = {CommentsPage} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
