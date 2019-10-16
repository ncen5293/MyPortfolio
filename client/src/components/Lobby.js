import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Icon, Menu, Button } from 'semantic-ui-react';
import axios from 'axios';
import '../styles/Game.css';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lobby: {}
    }
  }

  componentDidMount = () => {
    console.log(this.props.match.params.roomId);
    this.getLobbyInfo();
  }

  getLobbyInfo = () => {
    axios.get('http://localhost:8080/lobbys/lobby', {params: { roomId: this.props.match.params.roomId }})
      .then(res => {
        console.log(res.data);
        this.setState({ lobby: res.data.lobby });
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
