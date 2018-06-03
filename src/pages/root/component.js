import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { TeacherPage } from '../teacher-page/components/Login';
import { TeacherLandingPage } from '../teacher-page/components/Landing';
import { StudentPage } from '../student-page';
import { FindRoom } from '../findroom';
import { TeacherRoom } from '../teacher-page/components/TeacherRoom';

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
// import './styles.css';

export class Root extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/findroom"/>} />
            <Route exact path="/findroom" component={FindRoom}/>
            <Route exact path="/teacher" component={TeacherPage} />
            <Route exact path="/teacher/:teacherID" component={TeacherLandingPage} />
            <Route exact path="/teacher/:teacherID/:roomName" component={TeacherRoom} />
            <Route exact path="/:roomName" component={StudentPage} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
