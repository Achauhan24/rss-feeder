import React, { Component } from "react";
import {getFeed, increaseCount} from '../../services/feed';
import {deleteCategory} from '../../services/category'

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
      <div key={index}>
        <a href={link} target="_blank" rel="noopener noreferrer" onClick={onClickLink}>{title}</a>
        {`----------------${clickCount}`}
      </div>
    )
  }
}

class Feed extends Component {
  constructor(props) {
    super(props);

    this.countClicks = this.countClicks.bind(this);
    this._renderFeeds = this._renderFeeds.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);

    this.state = {
      loading: true,
      feeds: [],
      error: "",
      count: 0,
    };
  }

  componentDidMount() {
    const agency_category_id = this.props.location.pathname.split('/')[2];
    getFeed(agency_category_id).then(
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

  countClicks(e) {
    increaseCount(e).then(
      () => {
        this.props.history.push(`/feeds/${this.props.location.pathname.split('/')[2]}`);
        window.location.reload();
      }
    );
  }

  handleDeleteCategory(e) {
    const agency_category_id = this.props.location.pathname.split('/')[2];

    deleteCategory(agency_category_id).then(
      () => {
        this.props.history.push("/");
        window.location.reload();
      }
    )
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
                <button type="button" class="btn btn-secondary btn-lg btn-block" onClick={this.handleDeleteCategory}>
                  Delete Category
                  </button>
                {
                  this._renderFeeds()
                }
              </React.Fragment>
            )
        }
      </React.Fragment>
    );
  }
}
export default Feed;
