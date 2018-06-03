import * as React from 'react';
import { NavbarComponent } from 'kiwi/pages/teacher-page/components/Navbar';
import { generateRandomName } from 'kiwi/utils/randomNameGenerator';
import { createRoom } from 'kiwi/api/create-room';
import { fetchQuestions } from 'kiwi/api/fetch-questions';
import './landing.css';

export class TeacherLandingPage extends React.Component {
  state = {
    questions: [],
    selectedId: null,
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
      let unit = 'minutes';
      if (i === 0) {
        unit = 'minute';
      }
      numbers.push(<option key={i}>{`${i + 1} ${unit}`}</option>);
    }
    return <select onChange={(e) => {this._selectTimer(e.target.value)}} className="teacher-landing-select">{numbers}</select>;
  };

  _selectTimer = (time) => {
    this.setState({
      timer: time,
    })
  }

  render() {
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
            <button
              type="button"
              disabled={!this.state.selectedId || !this.state.timer}
              className="pt-button pt-intent-success teacher-landing-create-room-button"
              onClick={() => this._createRoom()}
            >
              Create Room
              <span className="pt-icon-standard pt-icon-arrow-right pt-align-right" />
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }

  _createRoom = () => {
    const roomName = generateRandomName().replace(/\s/g, '');

    createRoom({
      name: roomName,
      questionID: this.state.selectedId,
      step: 0,
      timer: this.state.timer,
    }).then(() => {
      this.props.history.push(`/teacher/${this.props.match.params.teacherID}/${roomName}`)
    });
  }
}
