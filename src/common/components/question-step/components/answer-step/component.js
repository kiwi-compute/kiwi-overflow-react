import PropTypes from 'prop-types';
import * as React from 'react';
import { QuestionPropType } from 'kiwi/common/models/question';
import { Button, TextArea } from '@blueprintjs/core';
import './styles.css';

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
      <div className="kw-flex kw-flex-column kw-full-height">
        <div className="kw-flex-grow-1 kw-mg-b-1">
          <TextArea
            className="answer-step--textarea kw-full-width kw-full-height"
            large={true}
            name="answer"
            placeholder="Type your answer here..."
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
