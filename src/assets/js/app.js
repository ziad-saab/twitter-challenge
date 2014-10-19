var $ = require('jquery');
var FastClick = require('fastclick');
var React = require('react/addons');
require('foundation/foundation');

FastClick.attach(document.body);
$(document).foundation();

var TwitterBoxes = require('components/twitter-boxes');
React.renderComponent(TwitterBoxes(), document.getElementById('app'));