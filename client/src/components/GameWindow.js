import React, { Component } from 'react';
import { Image, Segment, Header } from 'semantic-ui-react';
import takeyourtime from '../images/takeyourtime.gif';
import '../styles/Home.css';

class GameWindow extends Component {
  render() {
    return (
      <Segment inverted>
        <Header as='h2' textAlign='center' dividing>
          <Header.Content>Coming Soon</Header.Content>
        </Header>
        <Image centered src={takeyourtime}/>
        {this.props.players}
      </Segment>
    )
  }
}

export default GameWindow;
