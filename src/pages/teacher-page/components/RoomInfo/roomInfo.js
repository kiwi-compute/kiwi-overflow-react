import React from 'react';

import './styles.css';

//TODO: Rename to 'lobby'

export class TeacherRoomInfoPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="teacher-room-info">
        <div className="url">
          <div className="section">
            URL
          </div>
        </div>
        <div className="student-count">
          <div className="section">
            Number of students            
          </div>
        </div>
      </div>
    );
  }
}