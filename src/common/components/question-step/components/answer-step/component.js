import PropTypes from 'prop-types';
import * as React from 'react';
import { QuestionPropType } from 'kiwi/common/models/question';
import { Button, TextArea } from '@blueprintjs/core';

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
      <div className="kw-flex kw-flex-column">
        <div>{this.props.question.text}</div>
        <div className="kw-mg-y-1">
          <TextArea
            className="kw-full-width"
            name="answer"
            value={this.state.answer}
            onChange={this._handleTextAreaChanged}
          />
        </div>
        <div className="kw-align-self-end">
          <Button disabled={!this.state.answer.length} onClick={this._onSubmit}>Submit</Button>
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
