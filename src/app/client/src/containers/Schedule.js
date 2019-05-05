import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { actionCreators as profileActionCreators } from "../store/Profile";
import { actionCreators as sessionActionCreators } from "../store/Sessions";
import SessionList from "../components/SessionList";
import dates from "../data/dates.json";

class Schedule extends Component {
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
    this.props.requestSessions();
  }

  toggleSelected(session, selected) {
    this.props.selectSession(session, selected);
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
            toggleSelected={this.toggleSelected}
            title={date}
          />
        ))}
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
)(Schedule);
