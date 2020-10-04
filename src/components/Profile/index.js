import React, { Component } from "react";
import AuthService from "../../services/auth-service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            Profile
          </h3>
        </header>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>First Name:</strong>{" "}
          {currentUser.first_name}
        </p>
        <p>
          <strong>Last Name:</strong>{" "}
          {currentUser.last_name}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
      </div>
    );
  }
}