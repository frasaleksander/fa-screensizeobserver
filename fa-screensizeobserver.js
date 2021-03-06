(function(factory) {
    'use strict';
    if ('object' == typeof exports) {
        module.exports = factory(require("jquery"));
    } else if('function' == typeof window.jQuery && 'undefined' == typeof window.ScreenSizeObserver) {
        window.ScreenSizeObserver = factory(window.jQuery);
    }
    
})(function($) {
    'use strict';

    var $document = $(document);
    var $window   = $(window);

    var ScreenSizeObserver = (function() {

        var instanceID = 0;

        function ScreenSizeObserver(settings) {
            var _        = this;

            var defaults = {
                $element           : $(document.documentElement),
                sizes              : [
                    { maxWidth  : 767 , className : 'size-xs', },
                    { maxWidth  : 991 , className : 'size-sm', },
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
    }

    function init() {
        var _ = this;
        onInit.call(_);
        onWindowResize.call(_);
    } 


    function onSizeChanged(data) {
        var _ = this;
        execAllCallbacksFromArray(_.onSizeChangedArray, data);
        onSizeEnter.call(_, data);
        onSizeLeave.call(_, data);
        
    }

    function onSizeEnter(data) {
        var _ = this,
            index = data.sizeIndex;

        if("function" == typeof _.sizes[index].onSizeEnter) {
            _.sizes[index].onSizeEnter(data);
        }
    }

    function onSizeLeave(data) {
        var _ = this,
            index = data.oldSizeIndex;

        if("function" == typeof _.sizes[index].onSizeLeave) {
            _.sizes[index].onSizeLeave(data);
        }
    }

    function onInit() {
        var _ = this,
            data;

        setSizeMaxWidth.call(_, _.sizes.length-1, +Infinity);
        _.oldSizeIndex = _.getSizeIndexByWidth($window.width());
        _.currentSizeIndex = _.oldSizeIndex;
        data = getCallbackData.call(_);
        execAllCallbacksFromArray(_.onInitArray, data);
    }

    function onWindowResize() {
        var _ = this,
            data;
        $window.on('resize', function(){
            _.currentSizeIndex = _.getSizeIndexByWidth($window.width());
            if(_.oldSizeIndex != _.currentSizeIndex) {
                data = getCallbackData.call(_);
                onSizeChanged.call(_, data);
                _.oldSizeIndex = _.currentSizeIndex;
            }
        });
    }

    function setSizeMaxWidth(index, maxWidth) {
        var _ = this;
        _.sizes[index].maxWidth = maxWidth;
    }

    function setSizeClassName(index, className) {
        var _ = this;
        _.sizes[index].className = className;
    }

    ScreenSizeObserver.prototype.getSize = function(size) {
        var _ = this,
            i;
        if("number" == typeof size) {
            return _.sizes[size];
        } else if("string" == typeof size) {
            for(i in _.sizes) {
                if(size == _.sizes[i].className) {
                    return _.sizes[i];
                }
            }
        }
        return null;
    };

    ScreenSizeObserver.prototype.getSizeIndexByWidth = function(width) {
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