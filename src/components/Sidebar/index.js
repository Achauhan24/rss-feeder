import React, { Component } from "react";
import {getAgency, getCategoryList} from '../../services/category';
import './sidebar.css';
import { Link } from "react-router-dom";
import AuthService from "../../services/auth-service";

class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agency_categories: [],
      categories: [],
      currentUser: AuthService.getCurrentUser()
    };
  }

  componentDidMount() {
    getAgency().then(
      response => {
        this.setState({
            agency_categories: response.data.data,
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
    getCategoryList().then(
        response => {
          this.setState({
              categories: response.data.data,
          });
        },
        error => {
          this.setState({
            content:
              (error.response && error.response.data) ||
              error.message ||
              error.toString()
          });
        }
      );
  }

  render() {
    const { currentUser } = this.state;
      const listAgency = this.state.agency_categories.map((agency_category, index)=> (
          <li className="list-group-item" key={index}>
            <Link to={`/feeds/${agency_category.id}`}>
                {`${agency_category.agency.name} | ${agency_category.category.name}`}
            </Link>
        </li>
      ))
      const listCategories = this.state.categories.map((category, index)=> (
        <li className="list-group-item" key={index}>
          <Link to="/">
              {`${category.title}`}
          </Link>
      </li>
    ))
    return (
        <div>
            {
                currentUser ? (
                    <div>
                        <Link to={"/addCategory"} className="nav-link">
                            ADD
                        </Link>
                        <div className="nav nav-sidebar list-group">{listAgency}</div>
                    </div>
                ) : (
                    <div className="nav nav-sidebar list-group">{listCategories}</div>
                )
            }
            
        </div>
    );
  }
}

export default Sidebar;