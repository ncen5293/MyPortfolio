import React, { Component } from 'react';
import { Card, Grid, Header, Icon, Image, Transition, Segment } from 'semantic-ui-react';
import HobbiesCard from './HobbiesCard';
import '../styles/Home.css';

class HobbiesPage extends Component {
  render() {
    const visible = this.props.visible;
    return (
      <Transition visible={visible} animation='fly left' duration={500}>
        <Segment raised>
          <Header as='h2' icon textAlign='center' dividing>
            <Icon name='game' circular />
            <Header.Content>Hobbies</Header.Content>
          </Header>
          <Grid columns={2} divided doubling>
            <Grid.Row>
              <Grid.Column>
                <Header as='h3' icon textAlign='center' dividing>
                  <Header.Content>Games</Header.Content>
                </Header>
                <Card.Group itemsPerRow={2}>
                  <HobbiesCard
                    cardColor='red'
                    title='Persona 5'
                    genre='Favorite JRPG'
                    desc='Great blend of dungeon crawling and social gameplay. Looking cool, Joker!'
                    mentions='(Further) Fire Emblem: Three Houses'
                  />
                  <HobbiesCard
                    cardColor='blue'
                    title='Devil May Cry 5'
                    genre='Favorite *Stylish* Action Game'
                    desc='Exciting game to get SSS combos. Foolishness Dante.'
                    mentions='(Further) Dark Souls 3, Monster Hunter: World'
                  />
                  <HobbiesCard
                    cardColor='pink'
                    title='Kirby Series'
                    genre='Favorite Sidescroller'
                    desc='Cute and fun Eldritch Horror. Poyo'
                    mentions='(Further) Iconoclasts'
                  />
                  <HobbiesCard
                    cardColor='black'
                    title='The Witcher 3: Wild Hunt'
                    genre='Favorite Western RPG'
                    desc='Great characters and interesting dialogue choices. I hate portals.'
                    mentions='(Further) Divinity: Original Sin 2'
                  />
                </Card.Group>
              </Grid.Column>
              <Grid.Column>
                <Header as='h3' icon textAlign='center' dividing>
                  <Header.Content>Shows & Movies</Header.Content>
                </Header>
                <Card.Group itemsPerRow={2}>
                  <HobbiesCard
                    cardColor='yellow'
                    title='The Travelers'
                    genre='Favorite Sci-fi Show'
                    desc='Great time travel show'
                    mentions='(Further) Agents of S.H.I.E.L.D'
                  />
                  <HobbiesCard
                    cardColor='pink'
                    title="JoJo's Bizarre Adventure"
                    genre='Favorite Anime'
                    desc='Over the top action'
                    mentions='(Further) Persona 4: The Animation'
                  />
                  <HobbiesCard
                    cardColor='blue'
                    title='Captain America: Winter Soldier'
                    genre='Favorite Superhero Movie'
                    desc='Amazing spy-thriller superhero movie'
                    mentions='(Further) Avengers: Infinity War'
                  />
                </Card.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </Transition>
    )

  }
}

export default HobbiesPage;
