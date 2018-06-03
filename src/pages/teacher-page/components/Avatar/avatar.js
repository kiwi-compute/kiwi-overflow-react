import React from "react";
import { Menu, MenuItem, MenuDivider, Icon, Popover, Position } from "@blueprintjs/core";
import { withRouter } from 'react-router';

export class AvatarComponent extends React.Component {
  state={
    displayMenu: false,
  }
  render() {
    return (
      <React.Fragment>
        <Popover
          content={<MenuContent {...this.props} />}
          position={Position.TOP}
        >
          <Icon color="white" onClick={() => this._toggleMenu} iconSize={35} icon="user" />
        </Popover>
      </React.Fragment>
    );
  }

  _toggleMenu = () => {
    this.setState({
      displayMenu: !this.state.displayMenu,
    })
  }
}

const MenuContent = (props) => {
  return (
    <Menu>
      <MenuDivider title={props.match.params.teacherID}/>
      <MenuItem text="Logout" onClick={() => props.history.push('/teacher')}/>
    </Menu>
  )
}

export const Avatar = withRouter(AvatarComponent);
