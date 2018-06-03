import PropTypes from 'prop-types';
import * as React from 'react';
import { getAnswersForStep } from '../../../../../api/get-answer';
import { QuestionPropType } from '../../../../models/question';
import { Card, Icon, Text } from '@blueprintjs/core';
import { IconNames } from "@blueprintjs/icons";


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
      <Card>
        {this.state.answers.map(({ id, text }, index) => {
          const isLast = this.state.answers.length - 1 === index;

          return (
            <Card className={`flex flex--justify-content-between ${isLast ? '' : 'mg-b-05'}`} key={id}>
              <Text>{text}</Text>
              <Icon icon={IconNames.CARET_UP} iconSize={Icon.SIZE_LARGE} />
            </Card>
          );
        })}
      </Card>
    )
  }

  _retrieveAnswers() {
    const { question, roomID, step } = this.props;

    getAnswersForStep(roomID, question.id, step).then((answers) => {
      this.setState({
        answers: answers.filter(({ studentID }) => studentID !== this.props.studentID),
        error: null,
        loading: false
      });
    }).catch((error) => {
      this.setState({ answers: null, error: null, loading: false });
    });
  }
}
