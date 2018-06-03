import PropTypes from 'prop-types';
import * as React from 'react';
import { QuestionPropType } from '../../../../models/question';
import { Button } from '@blueprintjs/core';
import './answer.css'

export class AnswerStep extends React.Component {
  static propTypes = {
    onAnswer: PropTypes.func.isRequired,
    question: QuestionPropType
  }

  state = {
    answer: '',
  }

  render() {
    return (
      <div>
        <h1 className='answerText'>{this.props.question.text}</h1>
        <h3 className=''stepText>Type your knowns in the area below</h3>
        <textarea className='textArea'name="answer" value={this.state.answer} onChange={this._handleTextAreaChanged}></textarea>
        <div className='bottomDiv'>
        <Button className='submitButton'onClick={this._onSubmit}>Submit</Button>
        </div>
      </div>
    );
  }

  _handleTextAreaChanged = ({ currentTarget }) => {
    this.setState({ [currentTarget.name]: currentTarget.value });
  }

  _onSubmit = () => {
    this.props.onAnswer(this.state.answer);
  }
}
