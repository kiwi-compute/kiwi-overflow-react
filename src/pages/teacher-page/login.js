import * as React from 'react';
import { InputGroup, ControlGroup, Button} from '@blueprintjs/core';

import './login.css';

export class TeacherPage extends React.Component {
  state = {
    username: '',
    password: '',
  }
  render() {
    return (
      <div className="wrapper">
        <div className="content">
          <h3 className="header">
            Kiwi Teacher Login
          </h3>
          <ControlGroup vertical>
            <InputGroup
              large
              value={this.state.username}
              placeholder="Username"
              type="text"
              onChange={(e) => this._handleUserChange(e.target.value)}
            />
            <InputGroup
              large
              value={this.state.password}
              placeholder="Password"
              type="password"
              onChange={(e) => this._handlePasswordChange(e.target.value)}
            />
            <Button onClick={() => this._loginTeacher()} type="submit">Login</Button>
            </ControlGroup>
        </div>
      </div>
    );
  }

  _handleUserChange = (val) => {
    this.setState({
      username: val,
    })
  }

  _handlePasswordChange = (val) => {
    this.setState({
      password: val,
    })
  }

  _loginTeacher = () => {
    window.location = `teacher/${this.state.username}`;
  }
}
