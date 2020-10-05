import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth-service";

import Login from "./components/Login";
import Register from "./components/Register";
import Feed from "./components/Feed/index";
import PublicFeed from "./components/PublicFeed/index";
import Profile from "./components/Profile";
import Sidebar from './components/Sidebar';
import AddCategory from "./components/AddCategory";
import Report from './components/Reports'

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
        <Router>
          <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark sticky-top ">
              <Link to={"/"} className="navbar-brand">
                Rss-Reader
              </Link>
              {currentUser ? (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/reports"} className="nav-link">
                        Reports
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to={"/profile"} className="nav-link">
                        Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a href="/" className="nav-link" onClick={this.logOut}>
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
                      <Route exact path="/feeds/:id" render = { props => <Feed {...props} />} />
                      <Route exact path="/public_feeds/:id" render = { props => <PublicFeed {...props} />} />
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/profile" component={Profile} />
                      <Route exact path="/addCategory" component={AddCategory} />
                      <Route exact path="/reports" component={Report} />

                    </Switch>
                  </div>
                </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        </Router>
    );
  }
}

export default App;