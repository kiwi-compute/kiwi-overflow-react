import PropTypes from 'prop-types';
import * as React from 'react';
import { getTopAnswersForStep } from 'kiwi/api/get-answer';
import { QuestionPropType } from 'kiwi/common/models/question';
import { Card, Icon, Text } from '@blueprintjs/core';
import { IconNames } from "@blueprintjs/icons";


export class ReviewStep extends React.Component {
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
      <Card className="kw-flex kw-flex-column">
        {this.state.answers.map(({ id, text }, index) => {
          // const isLast = this.state.answers.length - 1 === index;

          return (
            <Card key={id}>
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

    getTopAnswersForStep(roomID, question.id, step).then((answers) => {
      this.setState({
        answers: answers,
        error: null,
        loading: false
      });
    }).catch((error) => {
      this.setState({ answers: null, error: null, loading: false });
    });
  }
}
