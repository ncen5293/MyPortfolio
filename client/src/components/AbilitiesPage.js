import React, { Component } from 'react';
import { Header, Icon, Image, Transition, Segment } from 'semantic-ui-react';
import '../styles/Home.css';

class AbilitiesPage extends Component {
  render() {
    const visible = this.props.visible;
    return (
      <Transition visible={visible} animation='browse' duration={500}>
        <Segment raised>
          <Header as='h2' icon textAlign='center' dividing>
            <Icon name='id card outline' circular />
            <Header.Content>Skills</Header.Content>
          </Header>
        </Segment>
      </Transition>
    )

  }
}

export default AbilitiesPage;
