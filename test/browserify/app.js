var $ = require("jquery");

var $html = $(document.documentElement);
var $body = $(document.body);
var $test1 = $('#test1');

var ScreenSizeObserver = require('../../fa-screensizeobserver.js');

var SSO = new ScreenSizeObserver({
	$element: $(document.body),
	onSizeChanged : function(data) {
		console.log(data);
	},
	onInit : function(e){
		$test1.find('p').html('<div>document.documentElement.className:'+e.className+'</div>');
	}, 
	sizes: [
		{ className:'size-s', maxWidth:1000, onSizeEnter: function(){

		}, onSizeLeave: function(){

		} },
		{ className:'size-lg', maxWidth:9999, },
	]
});