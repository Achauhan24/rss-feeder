import React, { Component } from "react";
import { Link } from "react-router-dom";
import {getAllFeed} from '../../services/feed';
import { getCategoryList } from '../../services/category';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      message: "",
      categories: [],
      feeds: [],
    };
  }

  componentDidMount() {
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
    getAllFeed().then(
        response => {
          this.setState({
            feeds: response.data.data,
            loading: false
          });
        },
        error => {
          this.setState({
            error:
              (error.response && error.response.data) ||
              error.message ||
              error.toString()
          });
        }
      );
  }

  render() {
    const listCategories = this.state.categories.map((category, index)=> (
        <li className="nav-item">
          <Link to={`/home`}>
              {`${category.name}`}
          </Link>
      </li>
    ))
  return (
      <div>
          <ul className="nav nav-sidebar">{listCategories}</ul>
      </div>
  );
  }
}