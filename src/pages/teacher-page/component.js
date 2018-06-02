import * as React from 'react';
import { Redirect } from 'react-router';
import { InputGroup, Icon, ControlGroup, Button} from '@blueprintjs/core';

import '@blueprintjs/core/lib/css/blueprint.css';

export class TeacherPage extends React.Component {
  state = {
    teacherID: '',
  }
  render() {
    return (
      <div>
        <header>
          Welcome
        </header>
        <div>
          <ControlGroup round>
            <InputGroup
              large
              value={this.state.teacherID}
              placeholder="Enter teacher ID"
              type="text"
              onChange={(e) => this._handleIdChange(e.target.value)}
            />
            <Button onClick={() => this._loginTeacher()} icon="arrow-right" type="submit"></Button>
          </ControlGroup>
        </div>
      </div>
    );
  }

  _handleIdChange = (val) => {
    this.setState({
      teacherID: val,
    })
  }

  _loginTeacher = () => {
    console.log('trying', this.state.teacherID)
    window.location = `teacher/${this.state.teacherID}`;
  }
}
