import React, { Component } from 'react';
import { Card, Button, Label, Image } from 'semantic-ui-react';
import axios from 'axios';
import LikeModal from './LikeModal';
import dmc5logo from '../images/dmc5logo.png';
import witcher3logo from '../images/witcher3logo.png';
import kirbylogo from '../images/kirbylogo.png';
import persona5logo from '../images/persona5logo.png';
import captainamericalogo from '../images/captainamericalogo.jpg';
import jojologo from '../images/jojologo.png';
import travelerstv from '../images/travelerstv.jpg';
import '../styles/Home.css';

class HobbiesCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeCounter: '-',
      isLikeModalOpen: false
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
    if (localStorage.getItem(`${this.props.title}`) !== 'liked') {
      axios.put(`http://localhost:8080/portfolio/hobbys/${this.props.title}/like`, {
          title: this.props.title,
          likeCounter: this.state.likeCounter
        })
        .then(res => {
          console.log(res.data);
          if (res.data.likes) {
            this.setState({ likeCounter: res.data.likes });
            this.onMenuToggle();
            localStorage.setItem(`${this.props.title}`, 'liked');
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  onMenuToggle = () => {
    this.setState(prevState => ({ isLikeModalOpen: !prevState.isLikeModalOpen }));
    window.setTimeout(() => {this.setState(prevState => ({ isLikeModalOpen: !prevState.isLikeModalOpen }));}, 1250);
  }

  render() {
    let canLike = localStorage.getItem(`${this.props.title}`) !== 'liked';
    let logo = <div/>;
    if (this.props.title === 'Persona 5') {
      logo = <Image src={persona5logo} wrapped ui={false} />;
    } else if (this.props.title === 'Devil May Cry 5') {
      logo = <Image src={dmc5logo} wrapped ui={false} />;
    } else if (this.props.title === 'Kirby Series') {
      logo = <Image src={kirbylogo} wrapped ui={false} />;
    } else if (this.props.title === "The Witcher 3: Wild Hunt") {
      logo = <Image src={witcher3logo} wrapped ui={false} />;
    } else if (this.props.title === 'The Travelers') {
      logo = <Image src={travelerstv} wrapped ui={false} />;
    } else if (this.props.title === "JoJo's Bizarre Adventure") {
      logo = <Image src={jojologo} wrapped ui={false} />;
    } else if (this.props.title === 'Captain America: Winter Soldier') {
      logo = <Image src={captainamericalogo} wrapped ui={false} />;
    }
    return (
      <Card raised color={this.props.cardColor}>
        {logo}
        <Card.Content>
          <Button
            circular
            disabled={!canLike}
            icon='thumbs up outline'
            color={this.props.cardColor}
            onClick={() => this.onLikeClick(this.props.title)}
          />
          <LikeModal
            open={this.state.isLikeModalOpen}
            onMenuToggle={this.onMenuToggle}
            title={this.props.title}
          />
          <Label basic pointing='left'>
            {this.state.likeCounter}
          </Label>
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
