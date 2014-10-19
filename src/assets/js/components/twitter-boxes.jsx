var React = require('react/addons');
var TwitterBox = require('./twitter-box');

module.exports = React.createClass({
  getDefaultProps: function() {
    return {
      columns: [
        {
          title: 'Latest @AppDirect tweets',
          screenName: 'AppDirect'
        },
        {
          title: 'Latest @laughingsquid tweets',
          screenName: 'laughingsquid'
        },
        {
          title: 'Latest @techcrunch tweets',
          screenName: 'techcrunch'
        }
      ],
      numberOfTweets: 30
    };
  },
  render: function() {
    var self = this;
    
    var columns = this.props.columns.map(function(column) {
      return (
        <div key={column.screenName} className="twitter-boxes__item">
          <TwitterBox title={column.title} screenName={column.screenName} numTweets={self.props.numberOfTweets} />
        </div>
      );
    });
    
    return (
      <div className="twitter-boxes">
        {columns}
      </div>
    );
  }
});