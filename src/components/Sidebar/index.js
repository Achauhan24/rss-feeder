import React, { Component } from "react";
import {getAgency} from '../../services/category';
import './sidebar.css';
import { Link } from "react-router-dom";


class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agency_categories: [],
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
  }

  render() {
      const listAgency = this.state.agency_categories.map((agency_category, index)=> (
          <li className="list-group-item" key={index}>
            <Link to={`/feeds/${agency_category.id}`}>
                {`${agency_category.agency.name} | ${agency_category.category.name}`}
            </Link>
        </li>
      ))
    return (
        <div>
            <Link to={"/addCategory"} className="nav-link">
                ADD
            </Link>
            <div className="nav nav-sidebar list-group">{listAgency}</div>
        </div>
    );
  }
}

export default Sidebar;