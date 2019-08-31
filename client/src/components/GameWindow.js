import React, { Component } from 'react';
import { Grid, Icon, Image, Segment, Menu, Header, Button, Transition } from 'semantic-ui-react';
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
      <Segment>
        <Header as='h2' textAlign='center' dividing>
          <Header.Content>Game Page</Header.Content>
        </Header>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Transition>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              </Transition>
            </Grid.Column>
            <Grid.Column>
              <Transition>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              </Transition>
            </Grid.Column>
            <Grid.Column>
              <Transition>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              </Transition>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Transition>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              </Transition>
            </Grid.Column>
            <Grid.Column>
              <Transition>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              </Transition>
            </Grid.Column>
            <Grid.Column>
              <Transition>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              </Transition>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Transition>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              </Transition>
            </Grid.Column>
            <Grid.Column>
              <Transition>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              </Transition>
            </Grid.Column>
            <Grid.Column>
              <Transition>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              </Transition>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default GameWindow;
