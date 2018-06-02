import * as React from 'react';
import { generateRandomName } from '../../../../utils/randomNameGenerator';

export class StudentSignUp extends React.Component {
  state = {
    studentName: generateRandomName(),
  }

  render() {
    return (
      <div>
        <h1>Enter your name:</h1>
        <input name="studentName" onChange={this.handleInputChanged} value={this.state.studentName} />
        <button onClick={this.submitName} />
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
