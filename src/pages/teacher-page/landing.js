import React from 'react';
import { Spinner, Button, Card, Elevation } from '@blueprintjs/core';


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
        <Card interactive={true} elevation={Elevation.TWO}>
          <h5><a href="#">Card heading</a></h5>
          <p>Card content</p>
          <Button>Submit</Button>
        </Card>
        <Spinner small="true" />
      </div>
    );
  }
}