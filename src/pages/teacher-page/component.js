import * as React from 'react';

import { generateRandomName } from '../../utils/randomNameGenerator';

export class TeacherPage extends React.Component {
  render() {
    return (
      <div>
        <header>
          <h1>{generateRandomName()}</h1>
        </header>
        <div>Teacher Page</div>
      </div>
    );
  }
}
