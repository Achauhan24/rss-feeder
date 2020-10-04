import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from 'react-select';

import {getAgencyList} from '../../services/agencies';
import { getCategoryList, addCategory } from '../../services/category';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class AddCategory extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeAgency = this.onChangeAgency.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeUrl = this.onChangeUrl.bind(this);


    this.state = {
      agency_id: "",
      category_id: "",
      url: "",
      loading: false,
      message: "",
      agencies: [],
      categories: []
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
    getAgencyList().then(
        response => {
            this.setState({
                agencies: response.data.data,
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

  onChangeAgency(e) {
    this.setState({
      agency_id: e.value
    });
  }

  onChangeCategory(e) {
    this.setState({
      category_id: e.value
    });
  }

  onChangeUrl(e) {
    this.setState({
      url: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();
    const data = new FormData();
    if (this.checkBtn.context._errors.length === 0) {
        data.append("agency_category[agency_id]", this.state.agency_id);
        data.append("agency_category[category_id]", this.state.category_id);
        data.append("agency_category[url]", this.state.url);

        addCategory(data).then(
        () => {
          this.props.history.push("/home");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleSubmit}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="agency">Agency</label>
              <Select 
                options={
                    this.state.agencies.map((agency, index) => {
                        return {
                            key: index,
                            label: agency.name,
                            value: agency.id,
                        }
                    })
                }
                onChange={this.onChangeAgency}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <Select 
                options={
                    this.state.categories.map((category, index) => {
                        return {
                            key: index,
                            label: category.title,
                            value: category.id,
                        }
                    })
                }
                onChange={this.onChangeCategory}
              />
            </div>

            <div className="form-group">
              <label htmlFor="url">Url</label>
              <Input
                type="text"
                className="form-control"
                name="url"
                value={this.state.url}
                onChange={this.onChangeUrl}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Add Category</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}