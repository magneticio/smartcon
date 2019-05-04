import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators } from "../store/Sessions";
import SessionList from "../components/SessionList";
import dates from "../data/dates.json";

class Schedule extends Component {
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
    const { sessions } = this.props;
    let cats = sessions.map(s => s.category.name);
    cats = cats.filter((v, i) => cats.indexOf(v) === i).sort();
    console.log(JSON.stringify(cats));
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
        {dates.map((date, i) => (
          <SessionList
            key={i}
            sessions={sessions.filter(session => session.date === date).sort()}
            title={date}
          />
        ))}
      </div>
    );
  }
}

export default connect(
  state => state.sessions,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Schedule);
