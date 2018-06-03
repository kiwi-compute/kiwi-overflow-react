import PropTypes from 'prop-types';
import * as React from 'react';
import { StepInfo, SubStep } from '../../models/steps';
import { Button } from '@blueprintjs/core';
import { AnswerStep } from './components/answer-step';
import { ReviewStep } from './components/review-step';
import { VoteStep } from './components/vote-step';
import { getQuestionByID } from '../../../api/get-question';

export class QuestionStep extends React.Component {
  static propTypes = {
    onAnswer: PropTypes.func,
    questionID: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
  }

  state = {
    subStep: SubStep.Answer,
    error: null,
    loading: true,
    question: null,
  }

  componentDidMount() {
    this._retrieveQuestion();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.step !== prevProps.step) {
      this.setState({ subStep: SubStep.Answer });
    }
  }

  render() {
    const { error, loading, question } = this.state;

    if (loading) {
      return <div>Loading...</div>
    } else if (error) {
      return <div>Error...</div>
    } else if (!question) {
      return <div>Question Not Found</div>
    }

    let stepContent = null;
    switch (this.state.subStep) {
      case SubStep.Answer:
        stepContent = <AnswerStep question={this.state.question} onAnswer={this._onAnswer} />
        break;
      case SubStep.Vote:
        stepContent = <VoteStep question={this.state.question} />
        break;
      case SubStep.Review:
        stepContent = <ReviewStep question={this.state.question} />
        break;
      default:
    }

    return (
      <React.Fragment>
        <div>{StepInfo[this.props.step].prompt}</div>
        <Button onClick={this._advanceStep}>Next Step</Button>
        {stepContent}
      </React.Fragment>
    )
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
      this.setState({ error: null, loading: false, question });
    }).catch((error) => {
      this.setState({ error, loading: false, question: null });
    });
  }
}
