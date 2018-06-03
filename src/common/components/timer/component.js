import React from 'react';

import './styles.css';

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsLeft: this.props.totalTime
    };
    this.currentInterval = null;
  }

  componentDidMount() {
    this.currentInterval = setInterval(() => {
      if (this.state.secondsLeft === 0) {
        clearInterval(this.currentInterval);
      } else {
        this.tick();
      }
    }, 1000);
  }

  tick = () => {
    this.setState(({ secondsLeft }) => {
      return { secondsLeft: secondsLeft - 1 };
    });
  };

  componentWillUnmount() {
    clearInterval(this.currentInterval);
  }

  render() {
    const { secondsLeft } = this.state;

    if (secondsLeft === 0) {
      this.props.onTimerDone();
    }

    return (
      <div className="timer">
        <div>{secondsLeft}</div>
      </div>
    );
  }
}
