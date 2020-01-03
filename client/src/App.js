import React, { Component } from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Home from './components/Home';
import CommentsPage from './components/CommentsPage';
import LobbiesPage from './components/LobbiesPage';
import Lobby from './components/Lobby';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route exact path = "/" component = {Home} />
          <Route exact path = "/comments" component = {CommentsPage} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
