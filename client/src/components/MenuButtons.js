import React, { Component } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import HomeButtons from './HomeButtons';
import '../styles/Home.css';

class MenuButtons extends Component {
  render() {
    const visible = this.props.visible;
    return (
      <div>
        <Button icon='list' onClick={this.props.onMenuToggle}>Menu</Button>
        <Modal
          open={this.props.open}
          closeOnEscape={true}
          closeOnDimmerClick={true}
          onClose={this.props.onMenuToggle}
          size='fullscreen'
        >
          <Modal.Content>
            <HomeButtons
              visibleButton={this.props.visibleProjectModalButton}
              onButtonClick={this.props.onButtonClick}
              leftButton='My Projects'
              rightButton='Coming Soon'
              position='top'
            />
            <HomeButtons
              visibleButton={this.props.visibleAbilitiesModalButton}
              onButtonClick={this.props.onButtonClick}
              leftButton='My Hobbies'
              rightButton='Coming Soon'
              position='middle'
            />
            <HomeButtons
              visibleButton={this.props.visibleHobbiesModalButton}
              onButtonClick={this.props.onButtonClick}
              leftButton='My Abilities'
              rightButton='Coming Soon'
              position='bottom'
            />
          </Modal.Content>
        </Modal>
      </div>
    )

  }
}

export default MenuButtons;
