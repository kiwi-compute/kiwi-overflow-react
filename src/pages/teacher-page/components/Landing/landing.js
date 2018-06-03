import React from "react";
import {
  Menu,
  Alignment,
  Position,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Button,
  MenuItem,
  MenuDivider,
  Popover
} from "@blueprintjs/core";
import NavbarComponent from '../Navbar/navbar';

import { Select } from "@blueprintjs/select";
import { generateRandomName } from '../../../../utils/randomNameGenerator';
import { createRoom } from '../../../../api/create-room';
import { fetchQuestions } from '../../../../api/fetch-questions';

import { Timer } from '../../../../common/components/timer';

import "./landing.css";

export class TeacherLandingPage extends React.Component {
  state = {
    questions: [],
    selectedId: null,
    newRoom: null,
  }
  
  componentDidMount() {
    fetchQuestions().then((questions) => {
      this.setState({
        questions,
      })
    })
  }

  generateOptions = list => {
    list.unshift("Select a question...");
    const selections = list.map((el, i) => {
      if (i === 0) {
        return (
          <option key="default" disabled selected hidden>
            Select a question...
          </option>
        );
      } else {
        return <option key={el.id} value={el.id}>{el.text}</option>;
      }
    });
    return <select onChange={(e) => {this._selectQuestion(e.target.value)}} className="teacher-landing-select">{selections}</select>;
  };

  _selectQuestion = (id) => {
    this.setState({
      selectedId: id,
    })
  }

  generateMinutes = () => {
    const numbers = [
      <option key="default" disabled selected hidden>
        Set timer...
      </option>
    ];
    for (let i = 0; i < 5; i++) {
      numbers.push(<option key={i}>{i + 1}</option>);
    }
    return <select onChange={(e) => {this._selectTimer(e.target.value)}} className="teacher-landing-select">{numbers}</select>;
  };

  _selectTimer = (time) => {
    this.setState({
      timer: time,
    })
  }

  render() {
    console.log('state', this.state);
    return (
      <React.Fragment>
        <NavbarComponent authenticated/>
        <div className="teacher-landing-page">
          <div className="teacher-landing-content">
            <div className="teacher-landing-select-container">
              <div className="pt-select teacher-landing-question-select">
                {this.state.questions ? this.generateOptions(this.state.questions) : null}
              </div>
            </div>
            <div className="teacher-landing-select-container">
              <div className="pt-select teacher-landing-time-select">
                {this.generateMinutes()}
              </div>
            </div>
          </div>
          <div className="teacher-landing-create-room-container">
           
                      </div>
                      <footer className='footer'>
                      <button className='teacher-landing-create-room-button'>Create Room</button></footer>
        </div>
      </React.Fragment>
    );
  }

  _createRoom = () => {
    const room = generateRandomName().replace(/\s/g, '');
    const roomObj = {
      room,
      questionID: this.state.selectedId,
      step: 0,
      timer: this.state.timer,
    }
    createRoom(roomObj).then(() => {
      this.props.history.push(`${this.props.match.params.teacherID}/${room}`)
    })
  }
}
