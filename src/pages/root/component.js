import * as React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { TeacherPage } from '../teacher-page';
import { StudentPage } from '../student-page';
import { TeacherLandingPage } from '../teacher-page/landing';

import "@blueprintjs/core/lib/css/blueprint.css";

export class Root extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/teacher" component={TeacherPage} />
            <Route exact path="/teacher/:teacherID" component={TeacherLandingPage} />
            <Route exact path="/:roomName" component={StudentPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
