import React, { Component } from "react";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "../store/Profile";

import dates from "../data/dates.json";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.toggleRoleDropDown = this.toggleRoleDropDown.bind(this);
    this.toggleDateDropDown = this.toggleDateDropDown.bind(this);
    this.state = {
      roleDropdownOpen: false
    };
  }

  toggleRoleDropDown() {
    this.setState({
      roleDropdownOpen: !this.state.roleDropdownOpen
    });
  }

  toggleDateDropDown() {
    this.setState({
      dateDropdownOpen: !this.state.dateDropdownOpen
    });
  }

  render() {
    return (
      <Nav>
        <Container>
          <Dropdown
            nav
            isOpen={this.state.roleDropdownOpen}
            toggle={this.toggleRoleDropDown}
          >
            <DropdownToggle nav caret>
              Role
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Developer</DropdownItem>
              <DropdownItem>Manager</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown
            nav
            isOpen={this.state.dateDropdownOpen}
            toggle={this.toggleDateDropDown}
          >
            <DropdownToggle nav caret>
              Date
            </DropdownToggle>
            <DropdownMenu>
              {dates.map((date, i) => (
                <DropdownItem key={i}>{date}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </Container>
      </Nav>
    );
  }
}

export default connect(
  state => ({ profile: state.profile, sessions: state.sessions }),
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Profile);
