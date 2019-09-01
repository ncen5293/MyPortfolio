import React, { Component } from 'react';
import { Grid, Image, Segment, Header, Transition } from 'semantic-ui-react';
import takeyourtime from '../images/takeyourtime.gif'
import '../styles/Home.css';

class GameWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
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
