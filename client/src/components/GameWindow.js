import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Image, Segment, Header } from 'semantic-ui-react';
import takeyourtime from '../images/takeyourtime.gif';
import '../styles/Home.css';

class GameWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.socket = socketIOClient('http://localhost:8080');
  }

  componentDidMount = () => {

  }

  render() {
    return (
      <Segment inverted>
        <Header as='h2' textAlign='center' dividing>
          <Header.Content>Coming Soon</Header.Content>
        </Header>
        <Image centered src={takeyourtime}/>
      </Segment>
    )
  }
}

export default GameWindow;
