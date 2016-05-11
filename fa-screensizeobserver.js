(function(factory) {
    'use strict';
    if (typeof exports == 'object') {
        module.exports = factory(require("jquery"));
    }
    
})(function($) {
    'use strict';

    var $document = $(document);
    var $window   = $(window);
    var $html     = $(document.documentElement);

    var ScreenSizeObserver = window.ScreenSizeObserver || {};

    var ScreenSizeObserver = (function() {

        var instanceID = 0;

        function ScreenSizeObserver(settings) {
            var _        = this;

            var defaults = {
                $element           : $(document.documentElement),
                maximumWidth       : 999999,
                sizes              : [
                    { maxWidth  : 767,  className : 'size-xs', },
                    { maxWidth  : 991,  className : 'size-sm', },
                    { maxWidth  : 1199, className : 'size-md', },
                    {                   className : 'size-lg', },
                ],
            };

            _.currentSizeIndex     = 0;
            _.oldSizeIndex         = 0;

            _.onInitArray          = [function(e){
                _.$element.addClass(e.className);
            }];

            _.onSizeChangedArray   = [function(e){
                _.$element.removeClass(e.oldClassName);
                _.$element.addClass(e.className);
            }];


        
            if(("object" == typeof settings) && ("function" == typeof settings.onInit)) {
                _.onInitArray.push(settings.onInit);
                delete settings.onInit;
            }
        
            if(("object" == typeof settings) && ("function" == typeof settings.onSizeChanged)) {
                _.onSizeChangedArray.push(settings.onSizeChanged);
                delete settings.onSizeChanged;
            }

            $.extend(_, defaults, settings);

            init.call(_);

            _.instanceID = instanceID++; 
        };

        return ScreenSizeObserver;

    })();

    function addCallbackToArray(arr, callback) {
        arr.push(callback);
    }

    function execAllCallbacksFromArray(arr, data) {
        var i;
        for(i in arr) {
            arr[i](data);
        }
    }

    function getCallbackData() {
        var _ = this;

        return {
            $element     : _.$element,
            sizeIndex    : _.currentSizeIndex,
            oldSizeIndex : _.oldSizeIndex,
            className    : _.sizes[_.currentSizeIndex].className,
            oldClassName : _.sizes[_.oldSizeIndex].className,
            size         : _.sizes[_.currentSizeIndex],
            oldSize      : _.sizes[_.oldSizeIndex],
        };
    };

    function getSizeIndexByWidth(width) {
        var _ = this,
            i = 1;    

        if( width <= _.sizes[0].maxWidth ) {
            return 0;
        }

        for( i = 1; i < _.sizes.length; ++i ) {
            if( width > _.sizes[i-1].maxWidth && width <= _.sizes[i].maxWidth ) {
                return i;
            }
        }
    };

    function init() {
        var _ = this;
        setSizeMaxWidth.call(_, _.sizes.length-1, _.maximumWidth);
        onDocumentReady.call(_);
        onWindowResize.call(_);
    };    

    function onDocumentReady() {
        var _ = this;
        $document.on('ready', function() {
            _.oldSizeIndex = getSizeIndexByWidth.call(_, $window.width());
            _.currentSizeIndex = _.oldSizeIndex;
            onInit.call(_);
        });
    };

    function onSizeChanged() {
        var _ = this;
        var data = getCallbackData.call(_);
        execAllCallbacksFromArray(_.onSizeChangedArray, data);
    }

    function onSizeEnter() {
        var _ = this;
    }

    function onSizeLeave() {
        var _ = this;
    }

    function onInit(){
        var _ = this;
        var data = getCallbackData.call(_);
        execAllCallbacksFromArray(_.onInitArray, data);
    }

    function onWindowResize() {
        var _ = this;
        $window.on('resize', function(){
            _.currentSizeIndex = getSizeIndexByWidth.call(_, $window.width());
            if(_.oldSizeIndex != _.currentSizeIndex) {
                onSizeChanged.call(_);
                _.oldSizeIndex = _.currentSizeIndex;
            }
        });
    };

    function setSizeMaxWidth(index, maxWidth) {
        var _ = this;
        _.sizes[index].maxWidth = maxWidth;
    };

    function setSizeClassName(index, className) {
        var _ = this;
        _.sizes[index].className = className;
    };


    ScreenSizeObserver.prototype.onSizeChanged = function(callback) {
        var _    = this;
        _.onSizeChangedArray.push(callback);
    };

    ScreenSizeObserver.prototype.onInit = function(callback) {
        var _ = this;
        _.onInitArray.push(callback);
    };

    return ScreenSizeObserver;

});