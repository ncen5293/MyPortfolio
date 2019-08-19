import React, { Component } from 'react';
import { Transition } from 'semantic-ui-react';
import HomeButtons from './HomeButtons';
import '../styles/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleProjectButton: false,
      visibleAbilitiesButton: false,
      visibleHobbiesButton: false,
      buttonClicked: false
    }
    this.onButtonClick = this.onButtonClick.bind(this);
    this.toggleButtonVisibility = this.toggleButtonVisibility.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  componentDidMount = () => {
    this.toggleButtonVisibility();
  }

  onButtonClick = (type) => {
    this.toggleButtonVisibility();
    this.changePage(type);
  }

  toggleButtonVisibility = () => {
    if (!this.state.buttonClicked) {
      this.setState(prevState => ({ visibleProjectButton: !prevState.visibleProjectButton, buttonClicked: !prevState.buttonClicked }));
      window.setTimeout(() => {this.setState(prevState => ({ visibleHobbiesButton: !prevState.visibleHobbiesButton }));}, 100);
      window.setTimeout(() => {this.setState(prevState => ({ visibleAbilitiesButton: !prevState.visibleAbilitiesButton }));}, 200);
      window.setTimeout(() => {this.setState(prevState => ({ buttonClicked: !prevState.buttonClicked }));}, 700);
    }
  }

  changePage = (type) => {
    this.setState(prevState => ({ visibleButtonPage: !prevState.visibleButtonPage }));
  }

  render() {
    const visibleProjectButton = this.state.visibleProjectButton;
    const visibleAbilitiesButton = this.state.visibleAbilitiesButton;
    const visibleHobbiesButton = this.state.visibleHobbiesButton;
    const visibleButtonPage = this.state.visibleButtonPage;
    return (
      <div className='App-header'>
        <h1>
          Nicky Cen
        </h1>
        <HomeButtons
          visibleButton={visibleProjectButton}
          onButtonClick={this.onButtonClick}
          leftButton='My Projects'
          rightButton='Coming Soon'
          position='top'
        />
        <HomeButtons
          visibleButton={visibleAbilitiesButton}
          onButtonClick={this.onButtonClick}
          leftButton='My Hobbies'
          rightButton='Coming Soon'
          position='middle'
        />
        <HomeButtons
          visibleButton={visibleHobbiesButton}
          onButtonClick={this.onButtonClick}
          leftButton='My Abilities'
          rightButton='Coming Soon'
          position='bottom'
        />
      </div>
    )
  }
}

export default Home;
