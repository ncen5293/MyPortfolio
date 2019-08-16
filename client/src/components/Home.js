import React, { Component } from 'react';
import { Transition } from 'semantic-ui-react'
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
    window.setTimeout(() => {this.setState(prevState => ({ visibleHobbiesButton: !prevState.visibleHobbiesButton }));}, 150);
    window.setTimeout(() => {this.setState(prevState => ({ visibleAbilitiesButton: !prevState.visibleAbilitiesButton }));}, 300);
  }

  render() {
    const visibleProjectButton = this.state.visibleProjectButton;
    const visibleAbilitiesButton = this.state.visibleAbilitiesButton;
    const visibleHobbiesButton = this.state.visibleHobbiesButton;
    return (
      <div>
        <Transition visible={visibleProjectButton} animation='vertical flip' duration={500}>
          <div className='projects-button top-left'>
            <h2 className='inner-projects-button'>
              My Projects
            </h2>
          </div>
        </Transition>
        <Transition visible={visibleHobbiesButton} animation='vertical flip' duration={700}>
          <div className='projects-button middle-left'>
            <h2 className='inner-projects-button'>
              My Hobbies
            </h2>
          </div>
        </Transition>
        <Transition visible={visibleAbilitiesButton} animation='vertical flip' duration={900}>
          <div className='projects-button bottom-left'>
            <h2 className='inner-projects-button'>
              My Abilities
            </h2>
          </div>
        </Transition>
      </div>
    )

  }
}

export default Home;
