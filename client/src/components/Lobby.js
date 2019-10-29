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
      videoIds: [],
      startTime: 0,
      videoPlayer: null
    }

    // if (window.performance) {
    //   if (performance.navigation.type == 1) {
    //     alert( "This page is reloaded" );
    //   } else {
    //     alert( "This page is not reloaded");
    //   }
    // }

    this.socket = socketIOClient('http://localhost:8080');

    this.socket.on('updateRoom', (roomInfo) => {
      if (roomInfo.roomName !== 'world') {
        this.setState((prevState) => ({
          players: roomInfo.players
        }));
      }
      console.log(roomInfo);
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

    this.socket.on('getYoutubeData', () => {
      this.getLobbyInfo();
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
      this.getLobbyInfo();
    }
    localStorage.removeItem('reason');
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
        this.setYoutubeData(res.data.items[0].id.videoId);
        console.log(res.data);
      }
    })
  }

  setYoutubeData = (videoId) => {
    axios.post('http://localhost:8080/lobbys/video', { roomId: this.props.match.params.roomId, videoId: videoId })
      .then(res => {
        console.log(res.data);
        this.socket.emit('getYoutubeData');
      })
      .catch(error => {
        console.error(error)
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
        this.storeLobbyInfo(res.data.exists, res.data.lobby);
      })
      .catch(error => {
        console.error(error)
      })
  }

  getLobbyInfo = () => {
    axios.get('http://localhost:8080/lobbys/lobby', {params: { roomId: this.props.match.params.roomId }})
      .then(res => {
        console.log(res.data);
        this.storeLobbyInfo(res.data.exists, res.data.lobby);
      })
      .catch(error => {
        console.error(error)
      })
  }

  storeLobbyInfo = (exists, lobby) => {
    if (exists) {
      this.joinChatLobby();
      if (lobby.VideoIds[0] && this.state.videoPlayer) {
        if ((Date.now() > lobby.StartTime + this.state.videoPlayer.getDuration()) && (lobby.StartTime > 0)) {
          this.deleteWatchedId();
        }
      }
      console.log(lobby.StartTime);
      this.setState((prevState) => ({
        lobby: lobby,
        videoIds: lobby.VideoIds.length > 0 ? lobby.VideoIds : prevState.videoIds,
        startTime: lobby.StartTime
      }));
    } else {
      this.props.history.goBack();
    }
  }

  skipVideo = () => {
    this.deleteWatchedId();
  }

  deleteWatchedId = () => {
    axios.delete('http://localhost:8080/lobbys/video', {params: { roomId: this.props.match.params.roomId, videoId: this.state.videoIds[0] }})
      .then(res => {
        console.log(res.data);
        this.socket.emit('getYoutubeData');
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
      this.getYoutubeData(searchValue);
      this.setState({ searchValue: '' });
    }
  }

  onPlay = (event) => {
    console.log(event.target.getVideoData());
    // if (this.state.lobby.VideoIds[0] && this.state.videoPlayer) {
    //   console.log(this.getElapsedTime(this.state.startTime));
    //   console.log(this.state.videoPlayer);
    //   if (this.state.startTime > 0 && this.getElapsedTime(this.state.startTime) > this.state.videoPlayer.getDuration()) {
    //     this.deleteWatchedId();
    //     this.setState({ startTime: 0 });
    //   }
    // }
    const videoData = this.state.videoPlayer.getVideoData();
    const message = {
      where: 'chat',
      mess: `${videoData.title}`,
      name: 'Now Playing',
      time: `${event.target.getDuration()}s`
    }
    this.setState((prevState) => ({
      localMessages: prevState.localMessages.concat(message)
    }));
    this.scrollToBottom();
  }

  onReady = (event) => {
    this.setState({ videoPlayer: event.target });
    if (this.state.videoIds.length > 0) {
      window.setTimeout(() => {
        let elapsedTime = this.getElapsedTime(this.state.startTime) <= event.target.getDuration() ?
                          this.getElapsedTime(this.state.startTime) : event.target.getDuration();

        event.target.seekTo(elapsedTime);
      }, 1000);

      window.setTimeout(() => {
        let elapsedTime = this.getElapsedTime(this.state.startTime);
        if (event.target.getDuration() - elapsedTime > 5) {
          event.target.seekTo(elapsedTime);
        }
      }, 5000);
    }
    console.log(event.target);
  }

  onEnd = (event) => {
    this.deleteWatchedId();
    this.setState({ startTime: 0 });
  }

  onPause = (event) => {
    let elapsedTime = this.getElapsedTime(this.state.startTime) <= event.target.getDuration() ?
                      this.getElapsedTime(this.state.startTime) : event.target.getDuration();

    event.target.seekTo(elapsedTime);
    event.target.playVideo();
  }

  onLeaveClick = () => {
    this.leaveLobby();
    window.location.replace('/watch');
  }

  getElapsedTime = (startTime) => {
    return (Date.now() - startTime) / 1000;
  }

  render() {
    let height = window.innerWidth > 1024 ? window.innerHeight * .88 : window.innerHeight * .45;
    let width = window.innerWidth > 1024 ? window.innerWidth * .75 : window.innerWidth;
    let opts = {
      height,
      width,
      playerVars: {
        autoplay: 1,
        iv_load_policy: 3
      }
    }
    let videoId = (this.state.videoIds && this.state.videoIds.length > 0) ? this.state.videoIds[0] : '';
    return (
      <div className='App-header'>
        <Menu widths={3}>
          <Menu.Item>
            <Button primary onClick={this.onLeaveClick}>Leave</Button>
          </Menu.Item>
          <Menu.Item>
            <Searchbar
              onChange={this.onSearchChange}
              onKeyPress={this.onSearchKeyPress}
              value={this.state.searchValue}
            />
          </Menu.Item>
          <Menu.Item>
            <Button negative onClick={this.skipVideo}>Skip</Button>
          </Menu.Item>
        </Menu>
        <div className='server-browser'>
          <YouTube
            videoId={videoId}
            opts={opts}
            onPlay={this.onPlay}
            onReady={this.onReady}
            onEnd={this.onEnd}
            onPause={this.onPause}
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
