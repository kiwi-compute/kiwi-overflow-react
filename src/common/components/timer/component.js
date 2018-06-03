import React from 'react';
import { ProgressBar, Intent } from '@blueprintjs/core';

import './styles.css';

const TICK_DURATION = 100;

export class Timer extends React.Component {
  totalTicks = this.props.totalTime * 1000;
  currentInterval = null;
  state = {
    complete: false,
    ticksLeft: this.totalTicks
  };

  componentDidMount() {
    this.currentInterval = setInterval(() => {
      if (this.state.ticksLeft <= 0) {
        clearInterval(this.currentInterval);
      } else {
        this.tick();
      }
    }, TICK_DURATION);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.ticksLeft <= 0 && !this.state.complete) {
      clearInterval(this.currentInterval);
      this.setState({ ticksLeft: 0, complete: true });
      this.props.onTimerDone();
    }
  }

  tick = () => {
    this.setState(({ ticksLeft }) => {
      return { ticksLeft: ticksLeft - TICK_DURATION };
    });
  };

  componentWillUnmount() {
    clearInterval(this.currentInterval);
  }

  render() {
    return <ProgressBar
      className="progress-bar"
      value={this.state.ticksLeft / this.totalTicks}
      animate={true}
      intent={Intent.SUCCESS}
    />;
  }
}
