import React, { Component } from 'react';
import { Card, Grid, Header, Icon, Image, Transition, Segment } from 'semantic-ui-react';
import '../styles/Home.css';

class HobbiesPage extends Component {
  render() {
    const visible = this.props.visible;
    return (
      <Transition visible={visible} animation='browse' duration={500}>
        <Segment raised>
          <Header as='h2' icon textAlign='center' dividing>
            <Icon name='game' circular />
            <Header.Content>Hobbies</Header.Content>
          </Header>
          <Grid columns={3} divided>
            <Grid.Row>
              <Grid.Column>
                <Header as='h3' icon textAlign='center' dividing>
                  <Header.Content>Games</Header.Content>
                </Header>
                <Card.Group itemsPerRow={2}>
                  <Card raised color='red'>
                    <Card.Content>
                      <Card.Header>Persona 5</Card.Header>
                      <Card.Meta>Favorite JRPG</Card.Meta>
                      <Card.Description>
                        I like this
                      </Card.Description>
                    </Card.Content>
                  </Card>
                </Card.Group>
              </Grid.Column>
              <Grid.Column>
                <Header as='h3' icon textAlign='center' dividing>
                  <Header.Content>Shows</Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column>
                <Header as='h3' icon textAlign='center' dividing>
                  <Header.Content>Other</Header.Content>
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Transition>
    )

  }
}

export default HobbiesPage;
