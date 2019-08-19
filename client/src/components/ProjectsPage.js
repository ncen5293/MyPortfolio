import React, { Component } from 'react';
import { Image, Transition, Segment } from 'semantic-ui-react';
import '../styles/Home.css';

class ProjectsPage extends Component {
  render() {
    const visible = this.props.visible;
    return (
      <Transition visible={visible} animation='browse' duration={500}>
        <Segment raised>
          Projects
        </Segment>
      </Transition>
    )

  }
}

export default ProjectsPage;
