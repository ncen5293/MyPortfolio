import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import '../styles/Home.css';

const dialogue = {
  'Persona 5': 'Looking Cool, Joker!',
  'Devil May Cry 5': 'SSS',
  'Kirby Series': 'Poyo',
  "JoJo's Bizarre Adventure": 'This is... Requiem'
}

class LikeModal extends Component {
  render() {
    let likeDialogue = '';
    if (dialogue[this.props.title]) {
      likeDialogue = dialogue[this.props.title];
    } else {
      likeDialogue = 'Looking Cool, Joker!';
    }
    return (
      <Modal basic
        open={this.props.open}
        onClose={this.props.onMenuToggle}
      >
        <Modal.Content>
          {likeDialogue}
        </Modal.Content>
      </Modal>
    )

  }
}

export default LikeModal;
