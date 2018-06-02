import React from 'react';
import { Spinner, Button, Card, Elevation } from '@blueprintjs/core';

import './landing.css';

export class TeacherLandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const teacherName = this.props.match.params.teacherID;
    const teacherNameString = teacherName.charAt(0).toUpperCase() + teacherName.substring(1);

    return (
      <div className="teacher-landing">
        <h3>{ teacherNameString }'s Classrooms</h3>
        <Card className="classroom-card" interactive={true} elevation={Elevation.TWO}>
          <h5><a href="#">Python 101 SB02</a></h5>
          <p>21 students</p>
          <p>Learn python with ease!</p>
          <Button>Join</Button>
        </Card>
        <Card className="classroom-card" interactive={true} elevation={Elevation.TWO}>
          <h5><a href="#">Python 101 SB02</a></h5>
          <p>21 students</p>
          <p>Learn python with ease!</p>
          <Button>Join</Button>
        </Card>
      </div>
    );
  }
}