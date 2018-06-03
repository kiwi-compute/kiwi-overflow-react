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

import "./landing.css";

// TODO: Remove dummy questions
const DUMMY_QUESTIONS = [
  "Expressions",
  "Conditionals",
  "Loops",
  "Linked Lists",
  "Object-Oriented Programming",
  "n-Queens Problem",
  "Red/Black Trees"
];

export class TeacherLandingPage extends React.Component {
  constructor(props) {
    super(props);
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
        return <option key={i}>{el}</option>;
      }
    });
    return <select className="teacher-landing-select">{selections}</select>;
  };

  generateMinutes = () => {
    const numbers = [
      <option key="default" disabled selected hidden>
        Set timer...
      </option>
    ];
    for (let i = 0; i < 5; i++) {
      numbers.push(<option key={i}>{i + 1}</option>);
    }
    return <select className="teacher-landing-select">{numbers}</select>;
  };

  render() {
    return (
      <React.Fragment>
        <NavbarComponent authenticated/>
        <div className="teacher-landing-page">
          <div className="teacher-landing-content">
            <div className="teacher-landing-select-container">
              <div className="pt-select teacher-landing-question-select">
                {this.generateOptions(DUMMY_QUESTIONS)}
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
}
