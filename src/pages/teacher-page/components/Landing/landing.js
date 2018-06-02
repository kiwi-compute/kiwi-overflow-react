import React from "react";
import {
  Menu,
  Alignment,
  Position,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Button,
  MenuItem,
  MenuDivider,
  Popover
} from "@blueprintjs/core";

import "./landing.css";

// TODO: Remove dummy questions
const DUMMY_QUESTIONS = [
  "Expressions",
  "Conditionals",
  "Loops",
  "Linked Lists",
  "Object-Oriented Programming",
  "n-Queens Problem",
  "Red/Black Trees"
];

export class TeacherLandingPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Menu = (
      <Menu>
        <MenuItem
          icon="new-text-box"
          onClick={this.handleClick}
          text="New text box"
        />
        <MenuItem
          icon="new-object"
          onClick={this.handleClick}
          text="New object"
        />
        <MenuItem icon="new-link" onClick={this.handleClick} text="New link" />
        <MenuDivider />
        <MenuItem text="Settings..." icon="cog" />
      </Menu>
    );

    return (
      <div className="teacher-landing">
        {/* TODO: Remove navbar b/c it needs to be dealt with using React router */}
        <div className="teacher-landing-navbar">
          <img
            src="https://pbs.twimg.com/profile_images/618252716264026112/vqqChM0n.jpg"
            width="50px"
            height="50px"
          />
        </div>
        <div className="teacher-landing-content">
          <Popover content={Menu} position={Position.RIGHT_TOP}>
            <Button icon="share" text="Open in..." />
          </Popover>
        </div>
      </div>
    );
  }
}
