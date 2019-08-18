import React, { Component } from 'react';
import { Image, Transition } from 'semantic-ui-react'
import '../styles/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleProjectButton: false,
      visibleAbilitiesButton: false,
      visibleHobbiesButton: false
    }
  }

  componentDidMount = () => {
    this.setState(prevState => ({ visibleProjectButton: !prevState.visibleProjectButton }));
    window.setTimeout(() => {this.setState(prevState => ({ visibleHobbiesButton: !prevState.visibleHobbiesButton }));}, 100);
    window.setTimeout(() => {this.setState(prevState => ({ visibleAbilitiesButton: !prevState.visibleAbilitiesButton }));}, 200);
  }

  onButtonClick = (type) => {
    this.setState(prevState => ({ visibleProjectButton: !prevState.visibleProjectButton }));
    window.setTimeout(() => {this.setState(prevState => ({ visibleHobbiesButton: !prevState.visibleHobbiesButton }));}, 100);
    window.setTimeout(() => {this.setState(prevState => ({ visibleAbilitiesButton: !prevState.visibleAbilitiesButton }));}, 200);
  }

  render() {
    const visibleProjectButton = this.state.visibleProjectButton;
    const visibleAbilitiesButton = this.state.visibleAbilitiesButton;
    const visibleHobbiesButton = this.state.visibleHobbiesButton;
    return (
      <div className='App-header'>
        <h1>
          Nicky Cen
        </h1>
        <Transition visible={visibleProjectButton} animation='vertical flip' duration={500}>
          <div>
            <div className='projects-button top-left' onClick={() => this.onButtonClick('projects')} >
              <h2 className='inner-projects-button'>
                My Projects
              </h2>
            </div>
            <div className='right-projects-button top-right' onClick={() => this.onButtonClick('unavailable')} >
              <h2 className='right-inner-projects-button'>
                Coming Soon
              </h2>
            </div>
          </div>
        </Transition>
        <Transition visible={visibleHobbiesButton} animation='vertical flip' duration={700}>
          <div>
            <div className='projects-button middle-left' onClick={() => this.onButtonClick('hobbies')} >
              <h2 className='inner-projects-button'>
                My Hobbies
              </h2>
            </div>
            <div className='right-projects-button middle-right' onClick={() => this.onButtonClick('unavailable')} >
              <h2 className='right-inner-projects-button'>
                Coming Soon
              </h2>
            </div>
          </div>
        </Transition>
        <Transition visible={visibleAbilitiesButton} animation='vertical flip' duration={900}>
          <div>
            <div className='projects-button bottom-left' onClick={() => this.onButtonClick('abilities')} >
              <h2 className='inner-projects-button'>
                My Abilities
              </h2>
            </div>
            <div className='right-projects-button bottom-right' onClick={() => this.onButtonClick('unavailable')} >
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

export default Home;
