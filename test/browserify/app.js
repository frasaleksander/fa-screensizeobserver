var $ = require("jquery");

var $html = $(document.documentElement);
var $body = $(document.body);
var $test1 = $('#test1');

var ScreenSizeObserver = require('../../fa-screensizeobserver.js');

var SSO = new ScreenSizeObserver({
	$element: $(document.body),
	onSizeChanged : function(e) {
		$test1.find('p').html('<div>className:'+e.className+'<br>oldClassName:' + e.oldClassName + '</div>');
	},
	onInit : function(){
		$test1.find('p').html('<div>document is ready</div>');
	}, 
	sizes: [
		{ 
			className:'size-sm', 
			maxWidth:1000, 
			onSizeEnter: function(e) {

			}, 
			onSizeLeave: function(e){

			}, 
		}, { 
			className:'size-lg', 
		    maxWidth:9999, 
		},
	]
});