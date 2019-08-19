import React, { Component } from 'react';
import { Image, Transition } from 'semantic-ui-react';
import HomeButtons from 'HomeButtons';
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
    this.buttonVisibility();
  }

  onButtonClick = (type) => {
    this.buttonVisibility();
  }

  buttonVisibility = () => {
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
        <HomeButtons
          visibleProjectButton={visibleProjectButton}
          visibleAbilitiesButton={visibleAbilitiesButton}
          visibleHobbiesButton={visibleHobbiesButton}
          onButtonClick={this.onButtonClick}
        />
      </div>
    )

  }
}

export default Home;
