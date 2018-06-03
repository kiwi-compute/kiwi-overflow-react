import PropTypes from 'prop-types';
import * as React from 'react';
import { AnswerPropType } from 'kiwi/common/models/answer';
import { AnswerItem } from './components/answer-item';
import { Card } from '@blueprintjs/core';
import './styles.css';

export class AnswerList extends React.Component {
  static propTypes = {
    answers: PropTypes.arrayOf(AnswerPropType),
    isVotingMode: PropTypes.bool.isRequired,
  }

  render() {
    return (
      <Card className="answer-list kw-flex kw-flex-column kw-full-width">
        {this.props.answers.map((answer) => (
          <div key={answer.id}>
            <AnswerItem answer={answer} isVotingMode={this.props.isVotingMode} />
          </div>
        ))}
      </Card>
    );
  }
}
