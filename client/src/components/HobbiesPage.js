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
                    <Card.Content extra>
                      <p>
                        (Further) Fire Emblem: Three Houses
                      </p>
                    </Card.Content>
                  </Card>
                  <Card raised color='blue'>
                    <Card.Content>
                      <Card.Header>Devil May Cry 5</Card.Header>
                      <Card.Meta>Favorite Stylish Action Game</Card.Meta>
                      <Card.Description>
                        I like this
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <p>
                        (Further) Dark Souls 3, Monster Hunter: World
                      </p>
                    </Card.Content>
                  </Card>
                </Card.Group>
              </Grid.Column>
              <Grid.Column>
                <Header as='h3' icon textAlign='center' dividing>
                  <Header.Content>Shows</Header.Content>
                </Header>
                <Card.Group itemsPerRow={2}>
                  <Card raised color='red'>
                    <Card.Content>
                      <Card.Header>The Travelers</Card.Header>
                      <Card.Meta>Favorite Sci-fi Show</Card.Meta>
                      <Card.Description>
                        I like this
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <p>
                        (Further) Agents of S.H.I.E.L.D
                      </p>
                    </Card.Content>
                  </Card>
                  <Card raised color='red'>
                    <Card.Content>
                      <Card.Header>JoJo's Bizarre Adventure</Card.Header>
                      <Card.Meta>Favorite Anime</Card.Meta>
                      <Card.Description>
                        I like this
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <p>
                        (Further) Persona 4: The Animation
                      </p>
                    </Card.Content>
                  </Card>
                </Card.Group>
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
