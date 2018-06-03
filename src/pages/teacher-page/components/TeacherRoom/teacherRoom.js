import React from 'react';

import './teacherRoom.css';
import { getRoomByName } from '../../../../api/get-room';
import { subscribeToRoomByID } from '../../../../api/subscribe-to-room';
import { NavbarComponent } from '../Navbar';
import { SVGSpinner, Card, Elevation, Button } from '@blueprintjs/core';
import { transitionStep } from '../../../../api/transition-step';

//TODO: Rename to 'lobby'

export class TeacherRoom extends React.Component {
  state = {
    room: null,
    students: [],
    step: null,
  }

  componentDidMount() {
    getRoomByName(this.props.match.params.roomName).then((room) => {
      this.setState({
        room,
      })
      subscribeToRoomByID(room.id, (room) => {
        if (room.students) {
          this.setState({
            students: room.students,
          })
        }
      })
    })
  }

  render() {
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
                <p>{`${this.state.students.length}`}</p>
              </Card>
            </div>
          </div>
      ) : (<SVGSpinner />)}
      <Button onClick={() => transitionStep(1, this.state.room.id)}>Start Game</Button>
      </div>
    );
  }
}