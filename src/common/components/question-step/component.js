import PropTypes from 'prop-types';
import React from 'react';
import { Card, Elevation, Text } from '@blueprintjs/core';
import { StepInfo, SubStep } from 'kiwi/common/models/steps';
import { AnswerStep } from './components/answer-step';
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
            question={question}
            onAnswer={this._onAnswer}
          />
        );
        break;
      case SubStep.Vote:
        stepContent = (
          <VoteStep
            question={question}
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
      <div className="kw-flex kw-align-items-center">
          <Card className="kw-flex kw-flex-column kw-justify-content-between" style={{width: '305px', height: '450px', backgroundColor: purpledarker}} elevation={Elevation.TWO}>
            <Text>
              <h1 style={{color: '#EEEEEE'}}>{StepInfo[this.props.step].name}</h1>
              <h2 style={{color: '#EEEEEE'}}>{StepInfo[this.props.step].prompt}</h2>
            </Text>
            <Text>
              <h3 style={{color: '#CCCCCC', marginBottom: '1em' }}>{this.state.question.text}</h3>
            </Text>
          </Card>

          <Card className="question-step--content" elevation={Elevation.TWO}>
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
