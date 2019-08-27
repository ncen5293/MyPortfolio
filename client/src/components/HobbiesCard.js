import React, { Component } from 'react';
import { Card, Button, Label } from 'semantic-ui-react';
import axios from 'axios';
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
    axios.get(`http://localhost:8080/portfolio/hobbys/${this.props.title}/like`, {params: { title: this.props.title }})
      .then(res => {
        this.setState({ likeCounter: res.data.likes });
      })
      .catch(error => {
        console.error(error)
      })
  }

  onLikeClick = (title) => {
    console.log(`I liked ${title}`);
    axios.put(`http://localhost:8080/portfolio/hobbys/${this.props.title}/like`, {
        title: this.props.title,
        likeCounter: this.state.likeCounter
      })
      .then(res => {
        console.log(res.data);
        if (res.data.likes) {
          this.setState({ likeCounter: res.data.likes });
        }
      })
      .catch(error => {
        console.error(error)
      })
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
