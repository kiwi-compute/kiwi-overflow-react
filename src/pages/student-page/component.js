import * as React from 'react';
import { getRoomByName } from 'kiwi/api/get-room';
import { createStudent } from 'kiwi/api/create-student';
import { createAnswer } from 'kiwi/api/create-answer';
import { addStudentToRoom } from 'kiwi/api/add-student-to-room';
import { StudentSignUp } from './components/student-sign-up';
import { subscribeToRoomByID } from 'kiwi/api/subscribe-to-room';
import { RoomNotFound } from './components/room-not-found';
import { QuestionStep } from 'kiwi/common/components/question-step';
import { SubStep } from 'kiwi/common/models/steps';
import { Timer } from 'kiwi/common/components/timer';
import './styles.css';

export class StudentPage extends React.Component {
  state = {
    error: null,
    loading: true,
    room: null,
    student: null,
    subStep: SubStep.Answer,
  }

  componentDidMount() {
    this._retrieveRoom();
  }

  componentDidUpdate(prevProps, prevState) {
    const currentRoomID = this.state.room && this.state.room.id;
    const prevRoomID = prevState.room && prevState.room.id;
    if (currentRoomID !== prevRoomID) {
      this._subscribeToRoomChanges();
    }

    const currentStep = this.state.room && this.state.room.step;
    const prevStep = prevState.room && prevState.room.step;
    if (currentStep !== prevStep) {
      this.setState({ subStep: SubStep.Answer, answerComplete: false });
    }
  }

  render() {
    const { error, loading, room, student } = this.state;

    if (loading) {
      return <div>Loading...</div>
    } else if (error) {
      return <div>Error: {error}</div>
    } else if (!room) {
      return <RoomNotFound />
    } else if (!student) {
      return <StudentSignUp onSubmit={this._createStudent} />
    }

    let timer = null;
    if (this.state.subStep === SubStep.Answer || !this.state.answerComplete) {
      timer = (
        <Timer
          key={`${room.id}-${room.step}`}
          totalTime={10}
          onTimerDone={this._onAnswerStepComplete}
        />
      );
    } else if (this.state.answerComplete && this.state.subStep === SubStep.Vote) {
      timer = (
        <Timer
          key={`${room.id}-${room.step}-${this.state.subStep}`}
          totalTime={30}
          onTimerDone={this._advanceSubStep}
        />
      );
    }

    return (
      <div className="kw-full-height kw-full-width kw-flex kw-flex-column kw-align-items-center kw-justify-content-center">
        <div className="student-page--header kw-align-self-end kw-pd-1">
          {timer && <div className="student-page--timer">{timer}</div>}
        </div>

        <QuestionStep
          onAnswer={this._onAnswer}
          questionID={this.state.room.questionID}
          roomID={this.state.room.id}
          step={this.state.room.step}
          subStep={this.state.subStep}
          studentID={this.state.student.id}
        />
      </div>
    );
  }

  _createStudent = (studentName) => {
    return createStudent({ name: studentName }).then((student) => {
      addStudentToRoom(this.state.room.id, student.id);
      this.setState({ student });
    });
  }

  _onAnswer = (answer) => {
    createAnswer({
      questionID: this.state.room.questionID,
      roomID: this.state.room.id,
      step: this.state.room.step,
      studentID: this.state.student.id,
      text: answer,
    });

    this._advanceSubStep();
  }

  _onAnswerStepComplete = () => {
    this.setState({ answerComplete: true });

    if (this.state.subStep === SubStep.Answer) {
      this._advanceSubStep();
    }
  }

  _retrieveRoom = () => {
    return getRoomByName(this.props.match.params.roomName).then((room) => {
      this.setState({ room, loading: false });
    }).catch((error) => {
      this.setState({ error, loading: false, room: null });
    })
  }

  _subscribeToRoomChanges = () => {
    subscribeToRoomByID(this.state.room.id, (room) => {
      this.setState({ room });
    });
  }

  _advanceSubStep = () => {
    this.setState({ subStep: this.state.subStep + 1 });
  }

  _unsubscribeFromRoomChanges = () => {
  }
}
