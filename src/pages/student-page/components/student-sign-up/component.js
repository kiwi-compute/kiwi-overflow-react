import * as React from 'react';
import { generateRandomName } from '../../../../utils/randomNameGenerator';
import './student.css'
import {Button} from "@blueprintjs/core"
export class StudentSignUp extends React.Component {
  state = {
    studentName: generateRandomName(),
  }

  render() {
    return (
      <div className='centerDiv'>      
        <h1 className='studentStart'>Let's Get Started!</h1> 
        <h3 className='studentName'>What would you like to be called?</h3>       
        <input className='studentInput'name="studentName" onChange={this.handleInputChanged} value={this.state.studentName} />
        <div className='bottomDiv'>
        <Button type='button' className='studentButton pt-button'onClick={this.submitName}>Submit</Button>
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
