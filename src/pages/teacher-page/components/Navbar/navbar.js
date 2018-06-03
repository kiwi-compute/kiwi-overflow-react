import * as React from 'react';
import { Navbar, NavbarGroup, Alignment, ControlGroup, InputGroup, Button } from '@blueprintjs/core';

import './navbar.css';

export const NavbarComponent = (props) => {
  return (
    <Navbar  className='pt-fixed-top navBar'>
      <NavbarGroup align={Alignment.LEFT}>
        <h2 className='logo'>Kiwi</h2>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        {props.authenticated ? (
          'User stuff'
        ) : (
          <ControlGroup>
            <InputGroup
              large
              className='login'
              value={props.username}
              placeholder="Username"
              type="text"
              onChange={(e) => props.handleInputChange(e.target.value, 'loginUsername')}
            />
            <InputGroup
              large
              className='login'
              value={props.password}
              placeholder="Password"
              type="password"
              onChange={(e) => props.handleInputChange(e.target.value, 'loginPassword')}
            />
            <Button className='loginButton'onClick={() => props.loginTeacher('loginUsername')} type="submit">Login</Button>
          </ControlGroup>
        )}
      </NavbarGroup>
    </Navbar>
  )
}