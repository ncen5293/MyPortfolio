import React, { Component } from 'react';
import { Card, Button, Label } from 'semantic-ui-react';
import '../styles/Home.css';

class HobbiesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCounter: 0
    }
  }

  componentDidMount = () => {
    console.log(`get backend likes for ${this.props.title}`);
  }

  onLikeClick = (title) => {
    console.log(`I liked ${title}`);
    this.setState(prevState => ({ likeCounter: prevState.likeCounter+1 }));
  }

  render() {
    return (
      <Card raised color={this.props.cardColor}>
        <Card.Content>
          <Button
            circular
            icon='thumbs up outline'
            color={this.props.cardColor}
            onClick={() => this.onLikeClick(this.props.title)}
          />
          <Label basic pointing='left'>
            {this.state.likeCounter}
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
