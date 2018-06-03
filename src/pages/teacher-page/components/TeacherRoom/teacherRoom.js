import React from 'react';

import './teacherRoom.css';
import { getRoomByName } from '../../../../api/get-room';
import { subscribeToRoomByID } from '../../../../api/subscribe-to-room';
import { NavbarComponent } from '../Navbar';
import { SVGSpinner, Card, Elevation, Button } from '@blueprintjs/core';
import { transitionStep } from '../../../../api/transition-step';
import { subscribeToRoomJoin } from '../../../../api/subscribe-to-student-join'

//TODO: Rename to 'lobby'

export class TeacherRoom extends React.Component {
  state = {
    room: null,
    studentCount: 0,
    step: null,
  }

  componentDidMount() {
    getRoomByName(this.props.match.params.roomName).then((room) => {
      this.setState({
        room,
      })
      subscribeToRoomByID(room.id, (room) => {
        if (room.step) {
          this.setState({
            step: room.step,
          })
        }
      })
      subscribeToRoomJoin(room.id, (count) => {
        this.setState({
          studentCount: count,
        })
      })
    })
  }

  render() {
    console.log('state', this.state);
    return (
      <div className="wrapper">
         <NavbarComponent authenticated />
        {this.state.room ? (
          <div className="teacher-room-info">
            <div className="card">
              <Card elevation={Elevation.TWO}>
                <h1>URL:</h1>
                <p>{`/${this.props.match.params.roomName}`}</p>
              </Card>
            </div>
            <div className="card">
              <Card elevation={Elevation.TWO}>
                <h1>Number of students:</h1>
                <p>{`${this.state.studentCount}`}</p>
              </Card>
            </div>
            <Button onClick={() => transitionStep(1, this.state.room.id)}>Start Game</Button>
          </div>
      ) : (<SVGSpinner />)}
      </div>
    );
  }
}