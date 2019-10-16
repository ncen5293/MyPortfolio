import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Icon, Menu, Button } from 'semantic-ui-react';
import axios from 'axios';
import '../styles/Game.css';

class Lobby extends Component {

  componentDidMount = () => {
    console.log(this.props.match.params.roomId);
    this.getLobbyInfo();
  }

  getLobbyInfo = () => {
    axios.get('http://localhost:8080/lobbys/lobby', {params: { roomId: this.props.match.params.roomId }})
      .then(res => {
        console.log(res.data);
        this.setState({ lobbyList: res.data.lobbies });
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default Lobby;
