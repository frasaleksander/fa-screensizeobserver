require('nojs2js');
var $ = require("jquery");

var $html = $(document.documentElement);
var $body = $(document.body);
var $test1 = $('#test1');

var ScreenSizeObserver = require('../../fa-screensizeobserver.js');

var settings = {
	$element: $(document.body),
	onSizeChanged : function(e) {
		$test1.find('#title').html('Current class: ' + e.className);
	},
	onInit : function(){
		$test1.find('#box').html('Box initialized');
	}, 
	sizes: [
		{ 
			className:'size-sm', 
			maxWidth:1000, 
			onSizeEnter: function(e) {
				$test1.find('#status').html("Entering: " + e.className);
			}, 
			onSizeLeave: function(e) {
				$test1.find('#status').html("Leaving: " + e.oldClassName);
			}
		}, { 
			className:'size-lg'
		},
	]
};

var SSO = new ScreenSizeObserver(settings);