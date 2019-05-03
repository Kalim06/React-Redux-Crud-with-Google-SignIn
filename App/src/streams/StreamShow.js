import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchStreams } from "../redux/actions";

class StreamShow extends Component {
  componentDidMount() {
    this.props.fetchStreams(this.props.match.params.id);
  }
  render() {
    if (!this.props.stream) {
      return "Loading...";
    }

    const { title, description } = this.props.stream;

    return (
      <div>
        <h2>{title}</h2>
        <h5>{description}</h5>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    stream: state.streams[ownProps.match.params.id]
  };
}

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamShow);
