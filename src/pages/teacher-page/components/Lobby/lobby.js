import React from 'react';
import {Card, Elevation, Button } from '@blueprintjs/core';
import { transitionStep } from '../../../../api/transition-step';

export const TeacherLobby = (props) => {
  return (
    <div className="teacher-room-info">
      <div className="card">
        <Card elevation={Elevation.TWO}>
          <h1>URL:</h1>
          <p>{`/${props.roomName}`}</p>
        </Card>
      </div>
      <div className="card">
        <Card elevation={Elevation.TWO}>
          <h1>Number of students:</h1>
          <p>{`${props.studentCount}`}</p>
        </Card>
      </div>
      <Button onClick={() => transitionStep(0, props.roomID)}>Start Game</Button>
    </div>
  )
}