import React, { Component } from 'react';
import { Transition, Segment, Header, Icon } from 'semantic-ui-react';
import axios from 'axios';
import '../styles/Home.css';

class Comments extends Component {
  componentDidMount = () => {

  }

  render() {
    let comments = <div/>;
    if (this.props.comments.length === 0) {
      comments = (<Header as='h4' icon textAlign='center'>
                    <Icon name='frown outline' />
                    <Header.Content>Nothing appears to be here</Header.Content>
                  </Header>);
    }
    return (
      <Transition visible={true} animation='fly left' duration={500}>
        <Segment raised>
          <Header as='h2' textAlign='center' dividing>
            <Header.Content>Comments</Header.Content>
          </Header>
          {comments}
        </Segment>
      </Transition>
    )
  }
}

export default Comments;
