import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { TeacherPage } from 'kiwi/pages/teacher-page/components/Login';
import { StudentPage } from 'kiwi/pages/student-page';
import { TeacherLandingPage } from 'kiwi/pages/teacher-page/components/Landing';
import FindRoom from 'kiwi/pages/findroom/component';
import { TeacherRoom } from 'kiwi/pages/teacher-page/components/TeacherRoom';
import { QuestionPage as TeacherQuestionPage } from 'kiwi/pages/teacher-page/components/Question';
import { SubmissionsPage as TeacherSubmissionsPage } from 'kiwi/pages/teacher-page/components/Submissions'

import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

export class Root extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/findroom"/>} />
            <Route exact path="/findroom" component={FindRoom}/>
            <Route exact path="/teacher" component={TeacherPage} />
            <Route exact path="/teacher/:teacherID" component={TeacherLandingPage} />
            <Route exact path="/teacher/:teacherID/:roomName" component={TeacherRoom} />
            <Route exact path="/teacher/:teacherID/:roomName/question" component={TeacherQuestionPage} />
            <Route exact path="/teacher/:teacherID/:roomName/submissions" component={TeacherSubmissionsPage} />            
            <Route exact path="/:roomName" component={StudentPage} />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}
