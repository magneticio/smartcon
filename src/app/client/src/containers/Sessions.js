import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "../store/Sessions";

class Sessions extends Component {
  componentDidMount() {
    // This method is called when the component is first added to the document
    this.ensureDataFetched();
  }

  componentDidUpdate() {
    // This method is called when the route parameters change
    //this.ensureDataFetched();
  }

  ensureDataFetched() {
    this.props.requestSessions();
  }

  render() {
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
        {renderSessionsTable(this.props)}
      </div>
    );
  }
}

function renderSessionsTable(props) {
  return <div>Sessions</div>;
}

export default connect(
  state => state.sessions,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Sessions);
