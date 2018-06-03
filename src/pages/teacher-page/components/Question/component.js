import React from 'react';

import { withRouter } from 'react-router';
import { Button } from '@blueprintjs/core';

import './styles.css';

class QuestionPageComponent extends React.Component {
  render() {
    // TODO: Get question number
    const questionNumber = 1;

    return (
      <div className="question-page">
        <div className="container">
          <h3>Question {questionNumber}</h3>
          <p>
            Bacon ipsum dolor amet chicken boudin leberkas, biltong meatloaf
            kevin sausage cow buffalo spare ribs jerky filet mignon bresaola.
            Doner shoulder chicken rump corned beef meatloaf, short loin jowl
            leberkas pork chop cow chuck pancetta. Shankle buffalo spare ribs
            pork. Biltong ham hock pork short loin.
          </p>
        </div>
        <div className="footer">
          <Button
            type="button"
            className="studentButton pt-button"
            onClick={() => {console.log('button pressed')}}
          >
            Create
          </Button>
        </div>
      </div>
    );
  }
}

export const QuestionPage = withRouter(QuestionPageComponent);
