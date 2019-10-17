import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Icon, Menu, Button } from 'semantic-ui-react';
import axios from 'axios';
import PlayerList from './PlayerList';
import '../styles/Game.css';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lobby: {},
      players: [],
      chatType: 'global',
      chatInput: '',
      messages: [],
      localMessages: []
    }

    this.socket = socketIOClient('http://localhost:8080');

    this.socket.on('updateRoom', (players) => {
      this.setState((prevState) => ({
        players
      }));
      console.log(players);
    });

    this.socket.on('chatMessage', (message) => {
      if (message.where === 'world') {
        this.setState((prevState) => ({
          messages: prevState.messages.concat(message)
        }));
      } else {
        this.setState((prevState) => ({
          localMessages: prevState.localMessages.concat(message)
        }));
      }
      this.scrollToBottom();
    })
  }

  scrollToBottom = () => {
    let scrollElement = document.getElementsByClassName("chat-list");
    if (scrollElement[0]) {
      scrollElement[0].scrollTop = scrollElement[0].scrollHeight;
    }
  }

  componentDidMount = () => {
    this.joinChatLobby();
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
    this.leaveLobby();
  }

  leaveLobby = () => {
    const roomId = this.props.match.params.roomId;
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
    const globalInfo = {
      screenName: localStorage.getItem('screenName'),
      roomName: 'world'
    }
    const joinInfo = {
      screenName: localStorage.getItem('screenName'),
      roomName: this.props.match.params.roomId
    }
    this.socket.emit('joinRoom', (globalInfo));
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

  toggleChat = (type) => {
    this.setState({ chatType: type });
    setTimeout(() => {
        this.scrollToBottom()
    }, 0)
  }

  chatMessage = (event) => {
    if (event.key === 'Enter') {
      const message = {
        mess: this.state.chatInput
      }
      if (this.state.chatType === 'global') {
        message.where = 'world';
      } else {
        message.where = this.props.match.params.roomId;
      }
      this.socket.emit('chatMessage', message);
      this.setState({ chatInput: '' })
    }
  }

  chatChange = (event) => {
    this.setState({ chatInput: event.target.value});
  }

  render() {
    return (
      <div>
        <PlayerList
          players={this.state.players}
          toggleChat={this.toggleChat}
          chatType={this.state.chatType}
          chatMessage={this.chatMessage}
          chatChange={this.chatChange}
          chatInput={this.state.chatInput}
          messages={this.state.messages}
          localMessages={this.state.localMessages}
          inLobby={true}
        />
      </div>
    )
  }
}

export default Lobby;
