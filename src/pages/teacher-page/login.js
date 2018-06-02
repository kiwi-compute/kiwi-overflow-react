import * as React from 'react';
import { InputGroup, ControlGroup, Button} from '@blueprintjs/core';
import { NavbarComponent } from './navbar';

import './login.css';

export class TeacherPage extends React.Component {
  state = {
    loginUsername: '',
    loginPassword: '',
    regUser: '',
    regPassword: '',
  }
  render() {
    return (
      <div className="wrapper">
        <NavbarComponent loginTeacher={this._loginTeacher} handleInputChange={this._handleInputChange} username={this.state.loginUsername} password={this.state.loginPassword} authenticated={false} />
        <div className="content">
          <h3 className="header">
            Register New Teacher
          </h3>
          <ControlGroup vertical>
            <InputGroup
              large
              value={this.state.username}
              placeholder="Username"
              type="text"
              onChange={(e) => this._handleInputChange(e.target.value, 'regUser')}
            />
            <InputGroup
              large
              value={this.state.password}
              placeholder="Password"
              type="password"
              onChange={(e) => this._handleInputChange(e.target.value, 'regPassword')}
            />
            <Button onClick={() => this._loginTeacher('regUser')} type="submit">Register</Button>
          </ControlGroup>
        </div>
      </div>
    );
  }

  _handleInputChange = (val, state) => {
    this.setState({
      [state]: val,
    })
  }

  _loginTeacher = (state) => {
    window.location = `teacher/${this.state[state]}`;
  }
}
