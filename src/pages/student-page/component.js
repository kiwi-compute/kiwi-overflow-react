import * as React from 'react';
import { getRoomByName } from '../../api/get-room';
import { createStudent } from '../../api/create-student';
import { StudentSignUp } from './components/student-sign-up';
import { subscribeToRoomByID } from '../../api/subscribe-to-room';
import { RoomNotFound } from './components/room-not-found';

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
      <React.Fragment>
        <div>Student Page</div>
        <div>Name: {room.name}</div>

        <div>Question: {room.question}</div>
      </React.Fragment>
    );
  }

  _createStudent = (studentName) => {
    return createStudent({ name: studentName }).then((student) => {
      this.setState({ student });
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
