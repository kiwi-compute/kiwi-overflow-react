import * as React from 'react';
import { withRouter } from 'react-router';
import { Button } from '@blueprintjs/core';
import './styles.css';

import { Timer } from 'kiwi/common/components/timer';

class FindRoomComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push(`/${this.state.value}`);
  }

  render() {
    return (
      <div className="wrapper">
        <div className="content">
          <div>
            Your teacher should give you the name of a classroom to join. Enter it below:
          </div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <input className="pt-input .modifier" type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <Button text="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(FindRoomComponent);
