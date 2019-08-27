import React, { Component } from 'react';
import { Modal } from 'semantic-ui-react';
import '../styles/Home.css';

class LikeModal extends Component {
  render() {
    return (
      <Modal basic
        open={this.props.open}
        onClose={this.props.onMenuToggle}
      >
        <Modal.Content>
          Looking Cool, Joker!
        </Modal.Content>
      </Modal>
    )

  }
}

export default LikeModal;
