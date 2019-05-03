import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../redux/actions";

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "419312498836-rsqco6agi9fshcoif9lcrm9vu69jpo5h.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  signIn = () => {
    this.auth.signIn();
  };

  signOut = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <div>
          <button onClick={this.signOut} className="ui red google button">
            <i className="google icon" />
            Sign Out
          </button>
        </div>
      );
    } else {
      return (
        <button onClick={this.signIn} className="ui red google button">
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    isSignedIn: state.auth.isSignedIn
  };
}

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
