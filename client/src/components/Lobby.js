import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Icon, Menu, Button, Input } from 'semantic-ui-react';
import axios from 'axios';
import YouTube from 'react-youtube';
import PlayerList from './PlayerList';
import Searchbar from './Searchbar';
import '../styles/Game.css';

class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lobby: {},
      players: [],
      chatType: 'chat',
      chatInput: '',
      messages: [],
      localMessages: [],
      searchValue: '',
      videoIds: []
    }

    // if (window.performance) {
    //   if (performance.navigation.type == 1) {
    //     alert( "This page is reloaded" );
    //   } else {
    //     alert( "This page is not reloaded");
    //   }
    // }

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

    this.socket.on('getYoutubeData', (searchValue) => {
      this.getYoutubeData(searchValue);
    })
  }

  scrollToBottom = () => {
    let scrollElement = document.getElementsByClassName("chat-list");
    if (scrollElement[0]) {
      scrollElement[0].scrollTop = scrollElement[0].scrollHeight;
    }
  }

  componentDidMount = () => {
    if (localStorage.getItem('reason') === 'joinLobby') {
      console.log('joining');
      this.joinLobby();
    } else {
      console.log('hosting');
      localStorage.removeItem('reason');
      this.getLobbyInfo();
    }
  }

  getYoutubeData = (searchValue) => {
    const KEY = 'AIzaSyD2yIRUZp5tQxt8o06cIRuGgKTJbNksNjA';
    axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
          q: searchValue,
          part: 'snippet',
          maxResults: 1,
          key: KEY
      }
    })
    .then(res => {
      if (res.data.items[0]) {
        this.setState((prevState) => ({
          videoIds: prevState.videoIds.concat(res.data.items[0].id.videoId)
        }));
        console.log(res.data);
      }

    })
  }

  componentWillUnmount = () => {
    this.socket.disconnect();
    this.leaveLobby();
  }

  leaveLobby = () => {
    const roomId = this.props.match.params.roomId;
    if (Object.entries(this.state.lobby).length !== 0) {
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
        if (res.data.exists) {
          this.joinChatLobby();
          this.setState({ lobby: res.data.lobby });
        } else {
          this.props.history.goBack();
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  getLobbyInfo = () => {
    axios.get('http://localhost:8080/lobbys/lobby', {params: { roomId: this.props.match.params.roomId }})
      .then(res => {
        console.log(res.data);
        if (res.data.exists) {
          this.joinChatLobby();
          this.setState({ lobby: res.data.lobby });
        } else {
          this.props.history.goBack();
        }
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

  onSearchChange = (event) => {
    this.setState({ searchValue: event.target.value});
  }

  onSearchKeyPress = (event) => {
    if (event.key === 'Enter') {
      const searchValue = this.state.searchValue;
      this.socket.emit('getYoutubeData', searchValue);
      this.setState({ searchValue: '' });
    }
  }

  render() {
    let height = window.innerWidth > 1024 ? window.innerHeight * .88 : window.innerHeight * .45;
    let width = window.innerWidth > 1024 ? window.innerWidth * .75 : window.innerWidth;
    let opts = {
      height,
      width,
      playerVars: {
        autoplay: 1,
        controls: 0,
        disablekb: 1,
        iv_load_policy: 3,
        playlist: this.state.videoIds
      }
    }
    let videoId = this.state.videoIds[0] ? this.state.videoIds[0] : '';
    return (
      <div className='App-header'>
        <Menu widths={3}>
          <Menu.Item>
            <Button primary onClick={() => {this.props.history.push('/watch')} }>Leave</Button>
          </Menu.Item>
          <Menu.Item>
            <h2>
              Nicky Cen
              <a href='https://www.linkedin.com/in/nicky-cen/'>
                <Icon link name='linkedin' />
              </a>
              <a href='https://github.com/ncen5293'>
                <Icon link name='github' />
              </a>
            </h2>
          </Menu.Item>
          <Menu.Item>
            <Searchbar
              onChange={this.onSearchChange}
              onKeyPress={this.onSearchKeyPress}
              value={this.state.searchValue}
            />
          </Menu.Item>
        </Menu>
        <div className='server-browser video-player'>
          <YouTube
            videoId={videoId}
            opts={opts}
          />
        </div>
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
