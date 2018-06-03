import React from "react";
import { Menu, MenuItem, MenuDivider, Icon, Popover, Position } from "@blueprintjs/core";
import { withRouter } from 'react-router';

<<<<<<< HEAD
import "./avatar.css";

class Avatar extends React.Component {
=======
export class AvatarComponent extends React.Component {
>>>>>>> master
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

<<<<<<< HEAD
export default withRouter(Avatar);
=======
export const Avatar = withRouter(AvatarComponent);
>>>>>>> master
