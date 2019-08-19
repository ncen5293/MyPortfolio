import React, { Component } from 'react';
import { Image, Transition } from 'semantic-ui-react';
import '../styles/Home.css';

class HomeButtons extends Component {
  render() {
    const visibleButton = this.props.visibleButton;
    const leftButton = this.props.leftButton;
    const rightButton = this.props.rightButton;
    const leftButtonStyle = 'projects-button ' + this.props.position + '-left';
    const rightButtonStyle = 'right-projects-button ' + this.props.position + '-right';
    return (
      <Transition visible={visibleButton} animation='vertical flip' duration={500}>
        <div>
          <div className={leftButtonStyle} onClick={() => this.props.onButtonClick(leftButton)} >
            <h2 className='inner-projects-button'>
              {leftButton}
            </h2>
          </div>
          <div className={rightButtonStyle} onClick={() => this.props.onButtonClick(rightButton)} >
            <h2 className='right-inner-projects-button'>
              {rightButton}
            </h2>
          </div>
        </div>
      </Transition>
    )

  }
}

export default HomeButtons;
