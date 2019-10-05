import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Icon, Menu, Button } from 'semantic-ui-react';
import GameWindow from './GameWindow';
import CreateNameModal from './CreateNameModal';
import '../styles/Home.css';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      screenName: '',
      badInfo: false,
      badDesc: ''
    }
    this.socket = socketIOClient('http://localhost:8080');

    this.socket.on('updateRoom', (players) => {
      this.setState((prevState) => ({
        players
      }));
      console.log(players);
    });
  }

  componentDidMount = () => {
    const joinInfo = {
      screenName: localStorage.getItem('screenName'),
      roomName: 'world'
    }
    this.socket.emit('joinRoom', (joinInfo));
    localStorage.removeItem('screenName');
  }

  componentWillUnmount = () => {
    this.socket.disconnect();
  }

  onNameModalClose = () => {
    const screenName = this.state.screenName;
    const players = this.state.players;
    let nameInUse = false;
    if (screenName.length >= 3 && screenName.length <= 20) {
      players.forEach((player) => {
        console.log(player);
        if (player === screenName) {
          nameInUse = true;
          this.setState({ badInfo: true, badDesc: 'Name is already in use!' });
        }
      })
      if (!nameInUse) {
        this.setState({ badInfo: false });
        localStorage.setItem('screenName', screenName);
        this.socket.emit('updatePlayerName', localStorage.getItem('screenName'));
      }
    } else {
      this.setState({ badInfo: true, badDesc: 'Name needs to be between 3-20 characters!' });
    }
  }

  onSubmitName = () => {
    this.onNameModalClose();
  }

  onCancelNameClick = () => {
    this.props.history.goBack();
  }

  onNameChange = (event) => {
    this.setState({screenName: event.target.value});
    console.log(this.state.screenName);
  }

  render() {
    const hasSetName = localStorage.getItem('screenName') !== null;
    return (
      <div className='App-header'>
        <Menu widths={3}>
          <Menu.Item>
            <Button primary onClick={() => {this.props.history.push('/')} }>Home Page</Button>
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
            <Button secondary onClick={() => {this.props.history.push('/comments')} }>Comments Page</Button>
          </Menu.Item>
        </Menu>
        <GameWindow
          players={this.state.players}
        />
        <CreateNameModal
          open={!hasSetName}
          screenName={this.state.screenName}
          onNameChange={this.onNameChange}
          onClose={this.onNameModalClose}
          onSubmitName={this.onSubmitName}
          onCancelNameClick={this.onCancelNameClick}
          badInfo={this.state.badInfo}
          badDesc={this.state.badDesc}
        />
      </div>
    )
  }
}

export default GamePage;
