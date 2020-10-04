import React, { Component } from "react";
import { toast } from 'react-toastify';
import {view, generate} from '../../services/feed'

export default class Report extends Component {
  constructor(props) {
    super(props);

    this.generateReport = this.generateReport.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.viewReport = this.viewReport.bind(this);

    this.state = {
      reports: [],
      date: "",
      file: '',
    };
  }

  generateReport(e){
      console.log(this.state.date)
    generate(this.state.date).then(
        response => {
            this.setState({
                file: response.data.pdf,
            })
            // toast.success("Report Generated.", {
            //     position: toast.POSITION.BOTTOM_CENTER,
            // })
        }
      );
  }

  viewReport(e){
      console.log(e);
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
    return (
      <div>
          <form>
                <div className="form-group">
                    <label>Enter Date (MM-DD-YYYY)</label>
                    <input className="form-control" type="text" placeholder="MM-DD-YYYY" onChange={this.onChangeDate}></input>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.generateReport}>Generate</button>
                <button type="submit" className="btn btn-primary ml-2" onClick={this.viewReport}>View</button>
            </form>
       
      </div>
    );
  }
}