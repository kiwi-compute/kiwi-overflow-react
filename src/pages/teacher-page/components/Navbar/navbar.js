import * as React from 'react';
import { Navbar, NavbarGroup, Alignment, ControlGroup, InputGroup, Button } from '@blueprintjs/core';

import './navbar.css';

export const NavbarComponent = (props) => {
  return (
    <Navbar style={{backgroundColor: 'purple'}} className={'pt-fixed-top'}>
      <NavbarGroup align={Alignment.LEFT}>
        <h2 style={{color: 'white'}}>Kiwi</h2>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        {props.authenticated ? (
          'User stuff'
        ) : (
          <ControlGroup>
            <InputGroup
              large
              value={props.username}
              placeholder="Username"
              type="text"
              onChange={(e) => props.handleInputChange(e.target.value, 'loginUsername')}
            />
            <InputGroup
              large
              value={props.password}
              placeholder="Password"
              type="password"
              onChange={(e) => props.handleInputChange(e.target.value, 'loginPassword')}
            />
            <Button onClick={() => props.loginTeacher('loginUsername')} type="submit">Login</Button>
          </ControlGroup>
        )}
      </NavbarGroup>
    </Navbar>
  )
}