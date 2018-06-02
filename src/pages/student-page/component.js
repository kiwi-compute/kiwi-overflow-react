import * as React from 'react';
import { getRoom } from '../../api/get-room';

export class StudentPage extends React.Component {
  state = {
    error: null,
    loading: true,
    room: null,
  }

  componentDidMount() {
    getRoom().then((room) => {
      this.setState({
        room,
        loading: false,
      })
    }).catch((error) => {
      this.setState({
        error,
        loading: false,
        room: null,
      })
    })
  }

  render() {
    const { loading, room, error } = this.state;

    if (loading) {
      return <div>Loading...</div>
    } else if (!loading && error) {
      return <div>Error: {error}</div>
    }

    return (
      <React.Fragment>
        <div>Student Page</div>
        <div>Name: {room.id}</div>
      </React.Fragment>
    );
  }
}
