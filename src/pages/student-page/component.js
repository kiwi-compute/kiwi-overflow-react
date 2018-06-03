import * as React from 'react';
import { getRoomByName } from '../../api/get-room';
import { createStudent } from '../../api/create-student';
import { createAnswer } from '../../api/create-answer';
import { StudentSignUp } from './components/student-sign-up';
import { subscribeToRoomByID } from '../../api/subscribe-to-room';
import { RoomNotFound } from './components/room-not-found';
import { QuestionStep } from '../../common/components/question-step';

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

    console.log('state...', this.state);

    return (
      <React.Fragment>
        <div>Student Page</div>
        <div>Name: {room.name}</div>

        <QuestionStep
          onAnswer={this._onAnswer}
          questionID={this.state.room.questionID}
          step={this.state.room.step}
        />
      </React.Fragment>
    );
  }

  _createStudent = (studentName) => {
    return createStudent({ name: studentName }).then((student) => {
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
    console.log('unsubscribe');
  }
}
