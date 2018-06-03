import PropTypes from 'prop-types';
import * as React from 'react';
import { subscribeToAnswers } from 'kiwi/api/subscribe-to-answers';
import { QuestionPropType } from 'kiwi/common/models/question';
import { AnswerList } from 'kiwi/common/components/question-step/components/answer-list';

export class VoteStep extends React.Component {
  static propTypes = {
    question: QuestionPropType,
    roomID: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired,
    studentID: PropTypes.string.isRequired,
  }

  state = {
    error: null,
    loading: true,
    answers: null,
  }

  componentDidMount() {
    this._retrieveAnswers();
  }

  render() {
    const { answers, error, loading } = this.state;

    if (loading) {
      return <div>Loading...</div>
    } else if (error) {
      return <div>Error...</div>
    } else if (!answers) {
      return <div>Answers Not Found</div>
    }

    return (
      <div className="kw-flex kw-flex-column kw-full-width kw-align-items-center">
        <div className="kw-mg-y-1">Vote on your favorite answer!</div>
        <AnswerList answers={this.state.answers} isVotingMode={true} />
      </div>
    )
  }

  _retrieveAnswers() {
    const { question, roomID, step } = this.props;

    subscribeToAnswers(roomID, question.id, step, (answers) => {
      this.setState({
        answers: answers.filter(({ studentID }) => studentID !== this.props.studentID),
        error: null,
        loading: false
      });
    });
  }
}
