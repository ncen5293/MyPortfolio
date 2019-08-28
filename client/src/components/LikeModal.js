import React, { Component } from 'react';
import { Modal, Image } from 'semantic-ui-react';
import dmc5sss from '../images/dmc5sss.png';
import jojomenacing from '../images/jojomenacing.png';
import kirbyinhale from '../images/kirbyinhale.png';
import persona5lookingcooljoker from '../images/persona5lookingcooljoker.PNG';
import liked from '../images/thumbsup.png';
import '../styles/Home.css';

const dialogue = {
  'Persona 5': 'Looking Cool, Joker!',
  'Devil May Cry 5': 'SSS',
  'Kirby Series': 'Poyo',
  "JoJo's Bizarre Adventure": 'This is... Requiem'
}

class LikeModal extends Component {
  render() {
    let likeDialogue = liked;
    if (this.props.title === 'Persona 5') {
      likeDialogue = persona5lookingcooljoker;
    } else if (this.props.title === 'Devil May Cry 5') {
      likeDialogue = dmc5sss;
    } else if (this.props.title === 'Kirby Series') {
      likeDialogue = kirbyinhale;
    } else if (this.props.title === "JoJo's Bizarre Adventure") {
      likeDialogue = jojomenacing;
    }
    return (
      <Modal basic
        open={this.props.open}
        onClose={this.props.onMenuToggle}
      >
        <Modal.Content>
          <Image src={likeDialogue} />
        </Modal.Content>
      </Modal>
    )

  }
}

export default LikeModal;
