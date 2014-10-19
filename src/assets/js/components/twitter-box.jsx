var React = require('react/addons');
var twitterApi = require('api/twitter');
var cx = React.addons.classSet;

function getTweetUrl(tweet) {
  return 'https://twitter.com/' + tweet.user.name + '/status/' + tweet.id_str;
}

var Tweet = React.createClass({
  // TODO: add oEmbed instead of regular link (https://dev.twitter.com/web/embedded-tweets)
  render: function() {
    var tweet = this.props.tweet;
    return (
      <div className="tweet">
        <a className="tweet__link" target="__blank" href={getTweetUrl(tweet)}>
          <div className="tweet__content">{tweet.text}</div>
          <div className="tweet__date">{new Date(tweet.created_at).toLocaleString()}</div>
        </a>
      </div>
    );
  }
});

module.exports = React.createClass({
  getInitialState: function() {
    return {
      tweets: [],
      loading: true
    }
  },
  shouldComponentUpdate: function() {
    return !this.props.dragging;
  },
  componentWillMount: function() {
    var self = this;
    
    if (!this.props.screenName) {
      this.setState({
        loading: false
      });
      return;
    }
    
    twitterApi(
      'statuses/user_timeline.json',
      {
        screen_name: this.props.screenName,
        count: this.props.numTweets
      }
    ).always(
      function() {
        self.setState({
          loading: false
        });
      }
    ).then(
      function(tweets) {
        self.setState({
          tweets: tweets
        });
      },
      function(error) {
        self.setState({
          error: error || new Error('unknown error')
        });
      }
    );
  },
  render: function() {
    var tweets = this.state.tweets.map(function(tweet) {
      return (
        <div key={tweet.id_str} className="twitter-box__tweet">
          <Tweet tweet={tweet} />
        </div>
      );
    });
    
    var classes = cx({
      'twitter-box': true,
      'twitter-box--loading': !!this.state.loading,
      'twitter-box--error': !!this.state.error,
      'twitter-box--no-tweets': !this.state.loading && !this.state.tweets.length
    });
    
    return (
      <div className={classes}>
        <h2 className="twitter-box__title">Latest @{this.props.screenName} tweets</h2>
        <div className="twitter-box__tweets">
          {tweets}
        </div>
      </div>
    );
  }
});