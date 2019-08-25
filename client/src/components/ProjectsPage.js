import React, { Component } from 'react';
import { Header, Icon, Image, Transition, Segment } from 'semantic-ui-react';
import '../styles/Home.css';

class ProjectsPage extends Component {
  render() {
    const visible = this.props.visible;
    return (
      <Transition visible={visible} animation='fly down' duration={500}>
        <Segment raised>
          <Header as='h2' icon textAlign='center' dividing>
            <Icon name='file code outline' circular />
            <Header.Content>Projects</Header.Content>
          </Header>
        </Segment>
      </Transition>
    )
  }
}

export default ProjectsPage;
