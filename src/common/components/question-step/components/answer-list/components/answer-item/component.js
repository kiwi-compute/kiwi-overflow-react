import PropTypes from 'prop-types';
import * as React from 'react';
import { AnswerPropType } from 'kiwi/common/models/answer';
import { voteOnAnswer } from 'kiwi/api/vote-on-answer';
import { Button, Card, Text, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

export class AnswerItem extends React.Component {
  static propTypes = {
    answer: AnswerPropType,
    isVotingMode: PropTypes.bool.isRequired,
  }

  state = {
    isLiked: false,
    isLiking: false,
  }

  render() {
    const voteButton = (
      <div>
        <Button
          onClick={this._toggleVote}
          icon={IconNames.HEART}
          intent={this.state.isLiked ? Intent.SUCCESS : Intent.NONE}
          loading={this.state.isLiking}
        />
      </div>
    );

    return (
      <Card className="kw-flex kw-align-items-center kw-mg-b-1">
        <Text className="kw-flex-grow-1">{this.props.answer.text}</Text>
        {this.props.isVotingMode && voteButton}
      </Card>
    );
  }

  _toggleVote = () => {
    const newIsLiked = !this.state.isLiked;

    this.setState({ isLiking: true });
    voteOnAnswer(this.props.answer.id, newIsLiked).then(() => {
      this.setState({ isLiked: newIsLiked, isLiking: false });
    });
  }
}
