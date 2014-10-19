var React = require('react/addons');
var TwitterBox = require('./twitter-box');
var cx = React.addons.classSet;

module.exports = React.createClass({
  getInitialState: function() {
    if (window.localStorage) {
      var settings = window.localStorage.getItem('settings');
      if (settings) {
        try {
          settings = JSON.parse(settings);
        }
        catch (e) {}
      }
      if (!settings) {
        settings = {
          columns: this.props.columnOrder.slice(0)
        };
      }
    }
    return {
      layoutMode: false,
      data: settings
    }
  },
  getDefaultProps: function() {
    return {
      columnOrder: ['AppDirect', 'laughingsquid', 'techcrunch'],
      numberOfTweets: 30
    };
  },
  saveState: function() {
    if (window.localStorage) {
      window.localStorage.setItem('settings', JSON.stringify(this.state.data));
    }
  },
  toggleLayout: function() {
    this.setState({
      layoutMode: !this.state.layoutMode
    });
  },
  sort: function(columns, dragging) {
    var data = this.state.data;
    data.columns = columns;
    data.dragging = dragging;
    this.setState({
      data: data
    });
    
  },
  dragStart: function(e) {
    e.currentTarget.className += ' twitter-boxes__item--dragging';
    this.dragged = Number(e.currentTarget.dataset.key);
    e.dataTransfer.effectAllowed = 'move';

    // Firefox requires calling dataTransfer.setData
    // for the drag to properly work
    e.dataTransfer.setData('text/html', e.currentTarget);
    
    this.setState({
      isDragging: true
    });
  },
  dragEnd: function(e) {
    e.currentTarget.className = e.currentTarget.className.replace('twitter-boxes__item--dragging', '');
    this.sort(this.state.data.columns, undefined);
    this.setState({
      isDragging: false
    });
    this.saveState();
  },
  dragOver: function(e) {
    e.preventDefault();
    
    var over = e.currentTarget;
    var dragging = this.state.data.dragging;
    var from = isFinite(dragging) ? dragging: this.dragged;
    var to = Number(over.dataset.key);
    if((e.clientX - over.offsetLeft) > (over.offsetWidth / 2)) to++;
    if(from < to) to--;
    
    var columns = this.state.data.columns;
    columns.splice(to, 0, columns.splice(from, 1)[0]);
    this.sort(columns, to);
  },
  render: function() {
    var self = this;
    
    var columns = this.state.data.columns.map(function(screenName, i) {
      return (
        <div data-key={i} draggable={!!self.state.layoutMode} onDragStart={self.dragStart} onDragEnd={self.dragEnd} onDragOver={self.dragOver} key={screenName} className="twitter-boxes__item">
          <TwitterBox dragging={!!self.state.isDragging} screenName={screenName} numTweets={self.props.numberOfTweets} />
        </div>
      );
    });
    
    var classes = cx({
      'app': true,
      'app--layout': !!this.state.layoutMode
    });
    
    return (
      <div className={classes}>
        <button className="app__layout-toggle" onClick={this.toggleLayout}>Toggle layout</button>
        <div className="twitter-boxes">
          {columns}
        </div>
      </div>
    );
  }
});