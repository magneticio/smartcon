import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators as profileActionCreators } from "../store/Profile";
import { actionCreators as sessionActionCreators } from "../store/Sessions";

import SessionList from "../components/SessionList";

class Discover extends Component {
  constructor(props) {
    super(props);
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  componentDidMount() {
    // This method is called when the component is first added to the document
    this.ensureDataFetched();
  }

  componentDidUpdate() {
    // This method is called when the route parameters change
    //this.ensureDataFetched();
  }

  ensureDataFetched() {
    this.props.discoverSessions();
  }

  toggleSelected(session, selected) {
    this.props.selectSession(session.id, selected, true);
  }

  render() {
    const { discoveredSessions } = this.props;
    return (
      <div>
        <div className="d-flex align-items-center p-3 my-3 text-white-50 bg-kubecon rounded shadow-sm">
          <div className="lh-100">
            <h6 className="mb-0 text-white lh-100">
              KubeCon | CloudNativeCon Europe 2019
            </h6>
            <small>Barcalona, May 20 - 23</small>
          </div>
        </div>
        <SessionList
          sessions={discoveredSessions}
          toggleSelected={this.toggleSelected}
        />
      </div>
    );
  }
}

export default connect(
  state => state.sessions,
  dispatch =>
    bindActionCreators(
      { ...sessionActionCreators, ...profileActionCreators },
      dispatch
    )
)(Discover);
