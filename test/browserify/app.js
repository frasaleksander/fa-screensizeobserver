var $ = require("jquery");

var $html = $(document.documentElement);
var $body = $(document.body);
var $test1 = $('#test1');

var ScreenSizeObserver = require('../../fa-screensizeobserver.js');

var SSO = new ScreenSizeObserver({
	$element: $(document.body),
	onSizeChanged : function(e) {
		$test1.find('p').html('<div>document.documentElement.className:'+e.className+'</div>');
	},
	onInit : function(){
		$test1.find('p').html('<div>document is ready</div>');
	}, 
	sizes: [
		{ 
			className:'size-sm', 
			maxWidth:1000, 
			onSizeEnter: function() {

			}, 
			onSizeLeave: function(){

			}, 
		}, { 
			className:'size-lg', 
		    maxWidth:9999, 
		},
	]
});