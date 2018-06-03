import React from 'react';

import { withRouter } from 'react-router';
import { Button } from '@blueprintjs/core';
import { getQuestionByID } from '../../../../api/get-question';

import './styles.css';

class QuestionPageComponent extends React.Component {
  state ={
    question: null,
  }

  componentDidMount() {
    getQuestionByID(this.props.questionID).then((question) => {
      this.setState({
        question: question.text,
      })
    })

  }

  render() {
    // TODO: Get question number
    return (
      <div className="question-page">
        <div className="container">
          <h3>Question:</h3>
          <p>
            {this.state.question}
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
