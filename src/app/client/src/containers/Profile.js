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

class Profile extends Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <Nav>
        <Container>
          <Dropdown
            nav
            isOpen={this.state.dropdownOpen}
            toggle={this.toggleDropDown}
          >
            <DropdownToggle nav caret>
              Job Level
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Developer</DropdownItem>
              <DropdownItem>Manager</DropdownItem>
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
