import React, { Component } from 'react';
import { Transition, Form, Segment, Header } from 'semantic-ui-react';
import '../styles/Home.css';

class CommentForm extends Component {
  render() {
    return (
      <Transition visible={true} animation='fly left' duration={500}>
        <Segment raised secondary>
          <Header as='h2' textAlign='center' dividing>
            <Header.Content>Create a Comment</Header.Content>
          </Header>
          <Form onSubmit={this.props.onSubmit}>
            <Form.Input fluid label='Screen Name' placeholder='Screen Name' onChange={this.props.onNameChange} />
            <Form.TextArea label='Comment' placeholder='Type your comment here...' onChange={this.props.onCommentChange} />
            <Form.Button content='Submit' />
          </Form>
        </Segment>
      </Transition>
    )
  }
}

export default CommentForm;
