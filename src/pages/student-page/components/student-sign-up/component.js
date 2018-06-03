import * as React from 'react';
import { generateRandomName } from 'kiwi/utils/randomNameGenerator';
import { Button, Input } from "@blueprintjs/core"
export class StudentSignUp extends React.Component {
  state = {
    studentName: generateRandomName(),
  }

  render() {
    return (
      <div className="student-page kw-full-height kw-full-width kw-flex kw-flex-column kw-align-items-center kw-justify-content-center">
        <h1>Let's Get Started!</h1>
        <h3>What would you like to be called?</h3>

        <div className="kw-flex kw-flex-column kw-align-items-center">
          <input className="pt-input pt-large" name="studentName" onChange={this.handleInputChanged} value={this.state.studentName} />
          <div className="kw-mg-y-1">
            <Button onClick={this.submitName}>Play!</Button>
          </div>
        </div>
      </div>
    );
  }

  handleInputChanged = ({ currentTarget }) => {
    this.setState({
      [currentTarget.name]: currentTarget.value
    });
  }

  submitName = () => {
    this.props.onSubmit(this.state.studentName);
  }
}
