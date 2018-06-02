import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { TeacherPage } from '../teacher-page/components/Login';
import { StudentPage } from '../student-page';
import { TeacherLandingPage } from '../teacher-page/components/Landing';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

export class Root extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/teacher"/>} />
            <Route exact path="/teacher" component={TeacherPage} />
            <Route exact path="/teacher/:teacherID" component={TeacherLandingPage} />
            <Route exact path="/:roomName" component={StudentPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
