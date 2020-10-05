import React, { Component } from "react";
import {view} from '../../services/feed';
import './index.css';

export default class Report extends Component {
  constructor(props) {
    super(props);

    this.onChangeDate = this.onChangeDate.bind(this);
    this.viewReport = this.viewReport.bind(this);

    this.state = {
      reports: [],
      date: "",
      file: '',
    };
  }

  viewReport(e){
    e.preventDefault();
    view(this.state.date).then(
        response => {
            this.setState({
                reports: response.data.data,
            });
        }
      );

  }

  onChangeDate(e){
    this.setState({
        date: e.target.value
    })
  }

  render() {
    const listFeeds = this.state.reports.map((feed, index)=> (
       <div className="content-container">
           <div className="content-style">
                <div>{feed.title}</div>
           </div>
           <div className="agency-container">
                <div className="agency-style">{feed.agency.name}</div>
                <div>{`Click Count ${feed.click_count}`}</div>
           </div>
       </div>
    ))
    return (
      <div>
          <form>
                <div className="form-group">
                    <label>Enter Date (MM-DD-YYYY)</label>
                    <input className="form-control" type="text" placeholder="MM-DD-YYYY" onChange={this.onChangeDate}></input>
                </div>
                <button type="submit" className="btn btn-primary ml-2" onClick={this.viewReport}>View</button>
            </form>
            <hr/>
            <div>
                {
                    listFeeds
                }
            </div>
       
      </div>
    );
  }
}