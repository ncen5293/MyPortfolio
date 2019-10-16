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

    this.socket = socketIOClient('http://localhost:8080');
  }

  componentDidMount = () => {
    // this.joinChatLobby();
    if (localStorage.getItem('reason') === 'createLobby') {
      console.log('hosting');
      localStorage.removeItem('reason');
      this.getLobbyInfo();
    } else {
      console.log('joining');
      this.joinLobby();
    }
  }

  componentWillUnmount = () => {
    // this.socket.disconnect();
    console.log(this.state.lobby);
    const roomId = this.props.match.params.roomId;
    console.log(roomId);
    if (this.state.lobby.Users.length === 1) {
      axios.delete('http://localhost:8080/lobbys/lobby', {params: { roomId }})
        .then(res => {
          //join lobby
          console.log(res);
        })
        .catch(error => {
          console.error(error)
        })
    } else {
      axios.put('http://localhost:8080/lobbys/lobby',
        {
          roomId,
          user: localStorage.getItem('screenName'),
          reason: 'disconnect'
        })
        .then(res => {
          //join lobby
          console.log(res);
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  joinChatLobby = () => {
    const joinInfo = {
      screenName: localStorage.getItem('screenName'),
      roomName: 'world'
    }
    this.socket.emit('joinRoom', (joinInfo));
    joinInfo.roomName = this.props.match.params.roomId;
    this.socket.emit('joinRoom', (joinInfo));
  }

  joinLobby = () => {
    axios.put('http://localhost:8080/lobbys/lobby',
      {
        roomId: this.props.match.params.roomId,
        user: localStorage.getItem('screenName'),
        reason: 'join'
      })
      .then(res => {
        //join lobby
        console.log(res.data);
        this.setState({ lobby: res.data.lobby });
      })
      .catch(error => {
        console.error(error)
      })
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
