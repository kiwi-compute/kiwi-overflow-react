import React from "react";

import "./styles.css";
import "csshake/dist/csshake.css";

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secondsLeft: this.props.totalTime,
    };
    this.currentInterval = null;
  }

  componentDidMount() {
    this.currentInterval = setInterval(() => {
      this.tick();
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
    const { secondsLeft, fontColor } = this.state;

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
