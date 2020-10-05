import React, { Component } from "react";
import {increaseCount, getAllFeed} from '../../services/feed';

class FeedRow extends Component{
  constructor(){
    super();
    this.state = {
      clickCount: 0
    }
  }

  render (){
    const { title, link, index, clickCount, onClickLink } = this.props;
    return(
      <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
        <a href={link} target="_blank" rel="noopener noreferrer" onClick={onClickLink}>{title}</a>
        <span class="badge badge-primary badge-pill">{clickCount}</span>
      </div>
    )
  }
}

class PublicFeed extends Component {
  constructor(props) {
    super(props);

    this.countClicks = this.countClicks.bind(this);
    this._renderFeeds = this._renderFeeds.bind(this);

    this.state = {
      loading: true,
      feeds: [],
      error: "",
    };
  }

  componentDidMount() {
    const category_id = this.props.location.pathname.split('/')[2];
    this.fetchAllFeed(category_id);
  }

  fetchAllFeed(category_id) {
    getAllFeed(category_id).then(
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

  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.id !== this.props.match.params.id) {
      this.fetchAllFeed(nextProps.match.params.id);
    }
  }

  countClicks(e) {
    increaseCount(e).then(
      () => {
        this.props.history.push(`/feeds/${this.props.location.pathname.split('/')[2]}`);
        window.location.reload();
      }
    );
  }

  _renderFeeds() {
    return this.state.feeds.length > 0 ? (
        this.state.feeds.map((feed, index) => (
            <FeedRow
                key={index}
                title={feed.title}
                link={feed.link}
                clickCount={feed.click_count}
                onClickLink={() => this.countClicks(feed.id)}
            />
        ))
    ) : <p>Oops!! No Feeds to display</p>
}

  render() {
    return (
      <React.Fragment>
        {
          this.state.loading ? 
            <div>
              <p>Loading</p>
            </div> : (
              <React.Fragment>
                {
                  <div className="list-group">
                    { this._renderFeeds()}
                  </div>
                }
              </React.Fragment>
            )
        }
      </React.Fragment>
    );
  }
}
export default PublicFeed;