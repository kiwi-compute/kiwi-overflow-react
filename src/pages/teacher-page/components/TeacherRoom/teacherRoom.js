import React from 'react';

import './teacherRoom.css';
import { getRoomByName } from '../../../../api/get-room';
import NavbarComponent from '../Navbar/navbar';
import { Spinner } from '@blueprintjs/core';

//TODO: Rename to 'lobby'

export class TeacherRoom extends React.Component {
  state = {
    room: null,
  }

  componentDidMount() {
    getRoomByName(this.props.match.params.roomName).then((room) => {
      console.log('room', room);
      this.setState({
        room,
      })
    })
  }

  render() {
    return (
      this.state.room ? (
        <React.Fragment>
          <NavbarComponent authenticated />
          <div className="teacher-room-info">
            <div className="url">
              <div className="section">
                URL
              </div>
            </div>
            <div className="student-count">
              <div className="section">
                Number of students            
              </div>
            </div>
          </div>
        </React.Fragment>
      ) : (<Spinner large />)
    );
  }
}