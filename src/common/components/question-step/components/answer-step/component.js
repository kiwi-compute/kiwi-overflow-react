import PropTypes from 'prop-types';
import * as React from 'react';
import { QuestionPropType } from 'kiwi/common/models/question';
import { Button } from '@blueprintjs/core';

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
        <div>{this.props.question.text}</div>
        <textarea name="answer" value={this.state.answer} onChange={this._handleTextAreaChanged}></textarea>
        <Button onClick={this._onSubmit}>Submit</Button>
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
