import PropTypes from 'prop-types';
import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import { StepInfo, SubStep } from 'kiwi/common/models/steps';
import { ReviewStep } from './components/review-step';
import { VoteStep } from './components/vote-step';
import { getQuestionByID } from 'kiwi/api/get-question';
import { purpledarker } from 'kiwi/brand';
import './styles.css';

export class QuestionStep extends React.Component {
  static propTypes = {
    onAnswer: PropTypes.func,
    questionID: PropTypes.string.isRequired,
    roomID: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
    subStep: PropTypes.number.isRequired,
    studentID: PropTypes.string.isRequired,
  }

  state = {
    error: null,
    loading: true,
    question: '',
  }

  componentDidMount() {
    this._retrieveQuestion();
  }

  render() {
    const { error, loading, question } = this.state;

    if (loading) {
      return <div>Loading...</div>
    } else if (error) {
      return <div>Error...</div>
    }

    let stepContent = null;
    switch (this.props.subStep) {
      case SubStep.Answer:
        stepContent = (
          <AnswerStep
            question={this.state.question}
            onAnswer={this._onAnswer}
          />
        );
        break;
      case SubStep.Vote:
        stepContent = (
          <VoteStep
            question={this.state.question}
            roomID={this.props.roomID}
            step={this.props.step}
            studentID={this.props.studentID}
          />
        );
        break;
      case SubStep.Review:
        stepContent = (
          <ReviewStep
            question={this.state.question}
            roomID={this.props.roomID}
            step={this.props.step}
            studentID={this.props.studentID}
          />
        );
        break;
      default:
    }

    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
          <Card style={{width: '305px', height: '450px', backgroundColor: purpledarker}} elevation={Elevation.TWO}>
            <h2 style={{color: '#CCCCCC', marginBottom: '1em' }}>{this.state.question.text}</h2><h3 style={{color: '#EEEEEE'}}>{StepInfo[this.props.step].prompt}</h3>
          </Card>

          <Card style={{width: '482px', height: '392px'}} elevation={Elevation.TWO}>
            {stepContent}
          </Card>
      </div>
    )
  }

  _onAnswer = (answer) => {
    this.props.onAnswer(answer);
  }

  _retrieveQuestion = () => {
    getQuestionByID(this.props.questionID).then((question) => {
      this.setState({ error: null, loading: false, question });
    }).catch((error) => {
      this.setState({ error, loading: false, question: null });
    });
  }
}
