import React, { Component } from 'react';
import { Grid, Icon, Image, Segment, Menu, Header, Button } from 'semantic-ui-react';
import axios from 'axios';
import MenuButtons from './MenuButtons';
import Statement from './Statement';
import CommentForm from './CommentForm';
import Comments from './Comments';
import '../styles/Home.css';

class GamePage extends Component {
  render() {
    return (
      <div className='App-header'>
        <Menu widths={3}>
          <Menu.Item>
            <Button onClick={() => {window.location.replace('/')} }>Home Page</Button>
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
            <Button onClick={() => {window.location.replace('/comments')} }>Comments Page</Button>
          </Menu.Item>
        </Menu>
        <Segment>
          <Header as='h2' textAlign='center' dividing>
            <Header.Content>Game Page</Header.Content>
          </Header>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              </Grid.Column>
              <Grid.Column width={8}>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              </Grid.Column>
              <Grid.Column width={8}>
                <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

export default GamePage;
