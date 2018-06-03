import PropTypes from 'prop-types';
import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';
import { StepInfo, SubStep } from 'kiwi/common/models/steps';
import { Button } from '@blueprintjs/core';
import { AnswerStep } from './components/answer-step';
import { ReviewStep } from './components/review-step';
import { VoteStep } from './components/vote-step';
import { getQuestionByID } from 'kiwi/api/get-question';
import { purpledarker, greylight } from '../../../brand';
import './styles.css';
import { DERIVE_COLUMN } from '@blueprintjs/icons/lib/esm/generated/iconContents';

export class QuestionStep extends React.Component {
  static propTypes = {
    onAnswer: PropTypes.func,
    questionID: PropTypes.string.isRequired,
    roomID: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
    subStep: PropTypes.number,
    studentID: PropTypes.string.isRequired,
  }

  state = {
    subStep: this.props.subStep || SubStep.Answer,
    error: '',
    loading: true,
    question: '',
  }

  componentDidMount() {
    this._retrieveQuestion();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.step !== prevProps.step) {
      this.setState({ subStep: SubStep.Answer });
    }
  }



  _advanceStep = () => {
    this.setState({ subStep: this.state.subStep + 1 });
  }

  _onAnswer = (answer) => {
    this.props.onAnswer(answer);
    this._advanceStep();
  }

  _retrieveQuestion = () => {
    getQuestionByID(this.props.questionID).then((question) => {
      this.setState({ error: '', loading: false, question });
    }).catch((error) => {
      this.setState({ error, loading: false, question: null });
    });
  }

  render() {
    const { error, loading, question } = this.state;

    if (loading) {
      return <div>Loading...</div>
    } else if (error) {
      return <div>Error...</div>
    }

    let stepContent = null;
    switch (this.state.subStep) {
      case SubStep.Answer:
        stepContent = <AnswerStep question={''} onAnswer={this._onAnswer} />
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
}
