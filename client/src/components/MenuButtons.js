import React, { Component } from 'react';
import { Button, Icon, Modal, Transition } from 'semantic-ui-react';
import HomeButtons from './HomeButtons';
import '../styles/Home.css';

class MenuButtons extends Component {
  render() {
    const visible = this.props.visible;
    return (
      <div>
        <Transition visible={this.props.visibleMenu} animation='browse' duration={500} >
          <Button icon='th' onClick={this.props.onMenuToggle} className='menu-button' />
        </Transition>
        <Modal basic
          open={this.props.open}
          closeOnEscape={true}
          closeOnDimmerClick={true}
          onClose={this.props.onMenuToggle}
        >
          <Modal.Content>
            <div>
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
                rightButton='Comments Page'
                position='bottom'
              />
            </div>
          </Modal.Content>
        </Modal>
      </div>
    )

  }
}

export default MenuButtons;
