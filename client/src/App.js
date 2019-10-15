import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Home from './components/Home';
import CommentsPage from './components/CommentsPage';
import GamePage from './components/GamePage';
import Lobby from './components/Lobby';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path = "/" component = {Home} />
          <Route exact path = "/soon" component = {GamePage} />
          <Route exact path = "/comments" component = {CommentsPage} />
          <Route exact path = "/watch/:roomId" component = {Lobby} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
