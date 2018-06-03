import * as React from 'react';
import { getRoomByName } from 'kiwi/api/get-room';
import { createStudent } from 'kiwi/api/create-student';
import { createAnswer } from 'kiwi/api/create-answer';
import { addStudentToRoom } from 'kiwi/api/add-student-to-room';
import { StudentSignUp } from './components/student-sign-up';
import { subscribeToRoomByID } from 'kiwi/api/subscribe-to-room';
import { RoomNotFound } from './components/room-not-found';
import { QuestionStep } from 'kiwi/common/components/question-step';

export class StudentPage extends React.Component {
  state = {
    error: null,
    loading: true,
    room: null,
    student: null,
  }

  componentDidMount() {
    this._retrieveRoom();
  }

  componentDidUpdate(prevProps, prevState) {
    const currentRoomID = this.state.room && this.state.room.id;
    const prevRoomID = prevState.room && prevState.room.id;

    if (currentRoomID !== prevRoomID) {
      this._unsubscribeFromRoomChanges();
      this._subscribeToRoomChanges();
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

    return (
      <div className="kw-full-height kw-full-width kw-flex kw-flex-column kw-align-items-center kw-justify-content-center">
        <QuestionStep
          onAnswer={this._onAnswer}
          questionID={this.state.room.questionID}
          roomID={this.state.room.id}
          step={this.state.room.step}
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

  _unsubscribeFromRoomChanges = () => {
  }
}
