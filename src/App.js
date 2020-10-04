import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth-service";

import Login from "./components/Login";
import Register from "./components/Register";
import Feed from "./components/Feed/index";
import Profile from "./components/Profile";
import Sidebar from './components/Sidebar';
import AddCategory from "./components/AddCategory";
import Home from './components/Home'

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark sticky-top ">
          <Link to={"/"} className="navbar-brand">
            Rss-Reader
          </Link>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <a href="/home" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-3">
              <Sidebar/>
            </div>
            <div className="col-sm-9 main bg-light pr-4 pl-5 pt-4">
                <div>
                  <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/feeds/:id" component={Feed} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/addCategory" component={AddCategory} />
                  </Switch>
                </div>
            </div>
          </div>
        </div>
          <div>
        </div>
      </div>
    );
  }
}

export default App;
