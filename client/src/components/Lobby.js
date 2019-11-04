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

    this.socket = socketIOClient('');

    this.socket.on('updateRoom', (roomInfo) => {
      if (roomInfo.roomName !== 'world' && roomInfo.players) {
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
      this.getVideoIds();
    })

    this.socket.on('getNextYoutubeData', () => {
      axios.get('/lobbys/video', {params: { roomId: this.props.match.params.roomId }})
        .then(res => {
          console.log(res.data);
          this.setState((prevState) => ({
            videoIds: res.data.videoIds,
            startTime: res.data.startTime
          }));
          const videoPlayer = this.state.videoPlayer;
          this.playNextVideo(this.state.videoPlayer, res.data.videoIds);
          if (videoPlayer.getPlayerState() === 1 && res.data.videoIds.length === 0) {
            this.getCorrectTimestamp(videoPlayer);
          }
        })
        .catch(error => {
          console.error(error)
        })
    })

    this.socket.on('enqueueMessage', (message) => {
      this.setVideoPlayerMessage(message.mess, message.name, '');
    })
  }

  getVideoIds = () => {
    axios.get('/lobbys/video', {params: { roomId: this.props.match.params.roomId }})
      .then(res => {
        console.log(res.data);
        this.setState((prevState) => ({
          videoIds: res.data.videoIds,
          startTime: res.data.startTime
        }));
        const videoPlayer = this.state.videoPlayer;
        console.log(videoPlayer.getPlayerState());
        if (videoPlayer && videoPlayer.getPlayerState() !== 1) {
          this.playNextVideo(this.state.videoPlayer, res.data.videoIds);
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  scrollToBottom = () => {
    let scrollElement = document.getElementsByClassName("chat-list");
    if (scrollElement[0]) {
      scrollElement[0].scrollTop = scrollElement[0].scrollHeight;
    }
  }

  componentDidMount = () => {
    this.joinLobby();
  }

  getSearchData = (searchValue) => {
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
      if (res.data.items[0] !== null) {
        this.setYoutubeData(res.data.items[0].id.videoId);
        console.log(res.data);
      } else {
        this.setVideoPlayerMessage('Try searching for something else!', 'No Videos Found', '');
      }
    })
  }

  setYoutubeData = (videoId) => {
    axios.post('/lobbys/video', { roomId: this.props.match.params.roomId, videoId: videoId })
      .then(res => {
        console.log(res.data);
        this.socket.emit('getYoutubeData');
        this.queuedVideoMessage(videoId);
      })
      .catch(error => {
        console.error(error)
      })
  }

  queuedVideoMessage = (videoId) => {
    const KEY = 'AIzaSyD2yIRUZp5tQxt8o06cIRuGgKTJbNksNjA';
    axios.get('https://www.googleapis.com/youtube/v3/videos', {
      params: {
          id: videoId,
          part: 'snippet',
          key: KEY
      }
    })
    .then(res => {
      const videoData = res.data.items[0];
      if (videoData) {
        const message = {
          mess: videoData.snippet.title,
          name: 'Enqueue'
        }
        this.socket.emit('enqueueMessage', message);
      }
    })
  }

  componentWillUnmount = () => {
    this.socket.disconnect();
  }

  joinLobby = () => {
    axios.put('/lobbys/lobby',
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

  storeLobbyInfo = (exists, lobby) => {
    if (exists) {
      this.joinChatLobby();
      console.log(lobby.StartTime);
      this.setState((prevState) => ({
        lobby: lobby,
        videoIds: lobby.VideoIds,
        startTime: lobby.StartTime
      }));
    } else {
      this.props.history.goBack();
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

  skipVideo = () => {
    if (this.state.videoIds.length > 0) {
      this.deleteWatchedId();
    }
  }

  deleteWatchedId = () => {
    axios.delete('/lobbys/video', {params: { roomId: this.props.match.params.roomId, videoId: this.state.videoIds[0] }})
      .then(res => {
        console.log(res.data);
        this.socket.emit('getNextYoutubeData');
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
      if (this.state.chatInput === '!queue') {

      } else if (this.state.chatInput === '!help') {

      } else if (this.state.chatType === 'global') {
        message.where = 'world';
      } else {
        message.where = this.props.match.params.roomId;
      }
      this.socket.emit('chatMessage', message);
      this.setState({ chatInput: '' })
    }
  }

  getVideoQueue = () => {

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
      this.getSearchData(searchValue);
      this.setState({ searchValue: '' });
    }
  }

  setVideoPlayerMessage = (mess, name, time) => {
    const message = {
      where: 'chat',
      mess,
      name,
      time
    }
    this.setState((prevState) => ({
      localMessages: prevState.localMessages.concat(message)
    }));
    this.scrollToBottom();
  }

  onPlay = (event) => {
    console.log(event.target.getVideoData());
    const videoData = this.state.videoPlayer.getVideoData();
    this.setVideoPlayerMessage(`${videoData.title}`, 'Now Playing', `${event.target.getDuration()}s`);
  }

  playNextVideo = (videoPlayer, videoIds) => {
    if (videoIds.length > 0) {
      console.log('playing video');
      let elapsedTime = this.getElapsedTime(this.state.startTime);
      videoPlayer.loadVideoById(videoIds[0], elapsedTime);
    }
  }

  onReady = async (event) => {
    this.setState({ videoPlayer: event.target });
    this.getVideoIds();
    console.log(event.target);
  }

  onEnd = (event) => {
    this.deleteWatchedId();
    this.setState({ startTime: 0 });
  }

  onPause = (event) => {
    this.getCorrectTimestamp(event.target);
  }

  getCorrectTimestamp = (videoPlayer) => {
    let elapsedTime = this.state.startTime != 0 ? this.getElapsedTime(this.state.startTime) : videoPlayer.getDuration() - 1;
    console.log(elapsedTime, this.state.startTime);
    videoPlayer.seekTo(elapsedTime);
    videoPlayer.playVideo();
  }

  onLeaveClick = () => {
    this.socket.disconnect();
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
      width
    }
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
