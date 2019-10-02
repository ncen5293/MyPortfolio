import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Icon, Menu, Button } from 'semantic-ui-react';
import GameWindow from './GameWindow';
import '../styles/Home.css';

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    }
    this.socket = socketIOClient('http://localhost:8080');

    this.socket.on('joinRoom', (message) => {
      this.setState((prevState) => ({
        players: prevState.players.concat(message)
      }));
      console.log(message);
    });
  }

  componentDidMount = () => {
    const roomName = 'world';
    this.socket.emit('joinRoom', (roomName));
  }

  render() {
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
        />
      </div>
    )
  }
}

export default GamePage;
