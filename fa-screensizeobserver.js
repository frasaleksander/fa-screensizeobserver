(function(factory) {
	
	if (typeof exports == 'object') {
		module.exports = factory(require('jquery'));
	}
	
})(function($) {

	function setLastSizeItemMaxWidth() {
		var length = ScreenSizeObserver.sizes.length;
		setSizeItemMaxWidth(length-1, maximumDeviceWidth);
	}

	function setSizeItemMaxWidth(index, maxWidth) {
		ScreenSizeObserver.sizes[index].maxWidth = maxWidth;
	}

	function setSizeItemClassName(index, className) {
		ScreenSizeObserver.sizes[index].className = className;
	}

	function onScreenSizeChanged(callback) {
		var data = getScreenSizeData();
		var i;
		callback(data);
		for(i in onScreenSizeChangedMethods) {
			onScreenSizeChangedMethods[i](data);
		}
	}

	function onScreenSizeInit(callback) {

	}

	function getScreenSizeData() {
		return {
			sizeIndex    : newDetectedSizeIndex,
			oldSizeIndex : oldDetectedSizeIndex,
			className    : ScreenSizeObserver.sizes[newDetectedSizeIndex].className,
			oldClassName : ScreenSizeObserver.sizes[oldDetectedSizeIndex].className,
			size         : ScreenSizeObserver.sizes[newDetectedSizeIndex],
			oldSize      : ScreenSizeObserver.sizes[oldDetectedSizeIndex],
		};
	}

	function onDocumentReady() {
		$document.on('ready', function() {
			oldDetectedSizeIndex = getSizeIndex($window.width());
			newDetectedSizeIndex = oldDetectedSizeIndex;
			onScreenSizeChanged(function(sender){
				$html.addClass(sender.className);
			});
		});
	}

	function onWindowResize() {
		$window.on('resize', function() {
			newDetectedSizeIndex = getSizeIndex($window.width());
			if(oldDetectedSizeIndex != newDetectedSizeIndex) {
				onScreenSizeChanged(function(sender) {
					$html.removeClass(sender.oldClassName);
					$html.addClass(sender.className);
				});
				oldDetectedSizeIndex = newDetectedSizeIndex;
			}
		});
	}

	function getSizeIndex(width) {

		var i           = 1;
		var sizes       = ScreenSizeObserver.sizes;
		var length      = ScreenSizeObserver.sizes.length;
		setLastSizeItemMaxWidth();

		if( width <= sizes[0].maxWidth ) {
			return 0;
		}

		for( i = 1; i < length; ++i ) {
			if( width > sizes[i-1].maxWidth && width <= sizes[i].maxWidth ) {
				return i;
			}
		}

	}

	var $window                     = $(window);
	var $document                   = $(document);
	var $html                       = $(document.documentElement);
	var maximumDeviceWidth          = 999999;

	var oldDetectedSizeIndex        = 0;
	var newDetectedSizeIndex        = 0;

	var onScreenSizeChangedMethods  = [];
	var onScreenSizeInitMethods     = [];

	var ScreenSizeObserver          = window.ScreenSizeObserver || {};


	ScreenSizeObserver.sizes        = [ 
		{
			maxWidth  : 767,
			className : 'device-xs',
		}, {
			maxWidth  : 991,
			className : 'device-sm',
		}, {
			maxWidth  : 1199,
			className : 'device-md',
		}, {
			className : 'device-lg',
		},
	];



	ScreenSizeObserver.init = function(settings){
		ScreenSizeObserver = $.extend({}, ScreenSizeObserver, settings);
		onWindowResize();
		onDocumentReady();
	};

	ScreenSizeObserver.onScreenSizeChanged = function(method){
		onScreenSizeChangedMethods.push(method);
	};

	return ScreenSizeObserver;

});