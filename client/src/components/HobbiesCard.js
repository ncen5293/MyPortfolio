import React, { Component } from 'react';
import { Card, Button, Label } from 'semantic-ui-react';
import '../styles/Home.css';

class HobbiesCard extends Component {
  render() {
    return (
      <Card raised color={this.props.cardColor}>
        <Card.Content>
          <Button circular icon='thumbs up outline' color={this.props.cardColor}/>
          <Label basic pointing='left'>
            0
          </Label>
          <Card.Header>{this.props.title}</Card.Header>
          <Card.Meta>{this.props.genre}</Card.Meta>
          <Card.Description>
            {this.props.desc}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <p>
            {this.props.mentions}
          </p>
        </Card.Content>
      </Card>
    )

  }
}

export default HobbiesCard;
