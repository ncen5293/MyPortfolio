import React, { Component } from 'react';
import { Image, Transition } from 'semantic-ui-react';
import '../styles/Home.css';

class HomeButtons extends Component {
  render() {
    const visibleProjectButton = this.props.visibleProjectButton;
    const visibleAbilitiesButton = this.props.visibleAbilitiesButton;
    const visibleHobbiesButton = this.props.visibleHobbiesButton;
    return (
      <div className='App-header'>
        <h1>
          Nicky Cen
        </h1>
        <Transition visible={visibleProjectButton} animation='vertical flip' duration={500}>
          <div>
            <div className='projects-button top-left' onClick={() => this.props.onButtonClick('projects')} >
              <h2 className='inner-projects-button'>
                My Projects
              </h2>
            </div>
            <div className='right-projects-button top-right' onClick={() => this.props.onButtonClick('unavailable')} >
              <h2 className='right-inner-projects-button'>
                Coming Soon
              </h2>
            </div>
          </div>
        </Transition>
        <Transition visible={visibleHobbiesButton} animation='vertical flip' duration={700}>
          <div>
            <div className='projects-button middle-left' onClick={() => this.props.onButtonClick('hobbies')} >
              <h2 className='inner-projects-button'>
                My Hobbies
              </h2>
            </div>
            <div className='right-projects-button middle-right' onClick={() => this.props.onButtonClick('unavailable')} >
              <h2 className='right-inner-projects-button'>
                Coming Soon
              </h2>
            </div>
          </div>
        </Transition>
        <Transition visible={visibleAbilitiesButton} animation='vertical flip' duration={900}>
          <div>
            <div className='projects-button bottom-left' onClick={() => this.props.onButtonClick('abilities')} >
              <h2 className='inner-projects-button'>
                My Abilities
              </h2>
            </div>
            <div className='right-projects-button bottom-right' onClick={() => this.props.onButtonClick('unavailable')} >
              <h2 className='right-inner-projects-button'>
                Coming Soon
              </h2>
            </div>
          </div>
        </Transition>
      </div>
    )

  }
}

export default HomeButtons;
