import * as React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { TeacherPage } from '../teacher-page';
import { StudentPage } from '../student-page';

import { generateRandomName } from '../../utils/randomNameGenerator';

export class Root extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/teacher" component={TeacherPage} />
            <Route exact path="/:roomID" component={StudentPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
