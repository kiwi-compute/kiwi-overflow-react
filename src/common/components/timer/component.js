import React from 'react';
import { ProgressBar } from '@blueprintjs/core';

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

    const progressPercentage = this.state.secondsLeft / this.props.totalTime;

    if (secondsLeft === 0 && this.props.onTimerDone) {
      this.props.onTimerDone();
    }

    return <ProgressBar value={progressPercentage} animate={false} intent={'success'} animate={true} />;
  }
}
