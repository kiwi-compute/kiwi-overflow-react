import React from 'react';

import './teacherRoom.css';
import { getRoomByName } from '../../../../api/get-room';
import { subscribeToRoomByID } from '../../../../api/subscribe-to-room';
import { NavbarComponent } from '../Navbar';
import { SVGSpinner, Card, Elevation, Button } from '@blueprintjs/core';
import { transitionStep } from '../../../../api/transition-step';
import { subscribeToRoomJoin } from '../../../../api/subscribe-to-student-join';
import { QuestionStep } from 'kiwi/common/components/question-step';
import { SubStep } from '../../../../common/models/steps';

//TODO: Rename to 'lobby'

export class TeacherRoom extends React.Component {
  state = {
    room: null,
    studentCount: 0,
    step: null,
    subStep: null,
  }

  componentDidMount() {
    getRoomByName(this.props.match.params.roomName).then((room) => {
      this.setState({
        room,
      })
      subscribeToRoomByID(room.id, (room) => {
        this.setState({
          step: room.step,
          })
      })
      subscribeToRoomJoin(room.id, (count) => {
        this.setState({
          studentCount: count,
        })
      })
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.step !== this.state.step) {
      setTimeout(() => {
        this.setState({ subStep: SubStep.Review });
      }, this.state.room.timer * 2000)
    }
  }

  render() {
    return (
      <div className="kw-flex kw-full-height kw-justify-content-center kw-align-items-center">
         <NavbarComponent authenticated />
        {this.state.room ? (
          this.state.step >= 0 && this.state.subStep ? (
            <div className="kw-flex kw-flex-column">
              <QuestionStep 
                questionID={this.state.room.questionID}
                roomID={this.state.room.id}
                step={this.state.step}
                subStep={this.state.subStep}
                isTeacher
              />
              <div className="kw-align-self-end">
                <Button onClick={()=> transitionStep(this.state.step + 1, this.state.room.id, () => {
                  this.setState({
                    subStep: SubStep.Vote
                  })
                })}>Next Question</Button>
              </div>
            </div>
          ) : (
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
              <Button onClick={() => {
                transitionStep(0, this.state.room.id, () => this.setState({
                  subStep: SubStep.Vote,
                }))
              }}><h4>Start Game</h4></Button>
            </div>
          )
      ) : (<SVGSpinner />)}
      </div>
    );
  }
}