import React from 'react';

import { withRouter } from 'react-router';

import { Button } from '@blueprintjs/core';

import './styles.css';

class LeaderboardComponent extends React.Component {
  render() {
    const question =
      'Bacon ipsum dolor amet pancetta frankfurter shankle pork chop t-bone hamburger venison turducken andouille bacon sirloin ground round. Beef ribs tri-tip tenderloin bacon shankle biltong pastrami swine leberkas burgdoggen chuck brisket picanha chicken. Picanha venison biltong turkey, capicola spare ribs shank doner meatloaf.'; // this.props.question;
    const questionNumber = 1;

    return (
      <div className="leaderboard-page">
        <div className="container">
          <div className="rankings">
            <h3>Question {questionNumber} Top 3</h3>
            <p>Rankings go here</p>
          </div>
          <div className="question">
            <h5>Question {questionNumber}</h5>
            <p>{question}</p>
          </div>
        </div>
        <div className="footer">
          <Button
            type="button"
            className="studentButton pt-button"
            onClick={() => {
              console.log('button pressed');
            }}
          >
            CT
          </Button>
        </div>
      </div>
    );
  }
}

export const LeaderboardPage = withRouter(LeaderboardComponent);
