# fa-screensizeobserver
Observes screen size

###Usage

####Normal way
Script needs jquery to work (for now). Before your closing ```<body>``` tag add:
```html
<script src="path/to/jquery/jquery.js"></script>
<script src="path/to/fa-screensizeobserver/fa-screensizeobserver.js"></script>
```  
where `path/to/jquery` is location of your `jquery` script and `path/to/fa-screensizeobserver` is location of your `fa-screensizeobserver` script.  


####NPM Install
```
npm install fa-screensizeobserver --save
```

####Browserify 
```javascript
var ScreenSizeObserver = require('fa-screensizeobserver'); //returns class
```

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
sizes | array of objects | ```[{ maxWidth  : 767 , className : 'size-xs' }, { maxWidth  : 991 , className : 'size-sm' }, { maxWidth  : 1199, className : 'size-md' }, { className : 'size-lg' }]``` | All screen sizes. Each size must have maxWidth and className. Last size needs only className. You can also create onSizeEnter and onSizeLeave events for each size.
$element | jquery element | `$(document.documentElement)` | Current className is going to be added to $element class attribute (on init and on sizechanged events).

####Example:
```javascript
var settings = {
	$element: $(document.body),
	sizes: [
		{ 
			className:'size-sm', 
			maxWidth:1000, 
		}, { 
			className:'size-lg', 
		},
	]
};

var SSO = new ScreenSizeObserver(settings);
```  

### Events

Event  | Params | Description
-----  | ------ | -----------
onInit | data   | fires after object is initialized
onSizeChanged | data | fires after size is changed

####Example:
```javascript
var settings = {
	onSizeChanged : function(e) {
		console.log('Current class: ' + e.className);
	},
	onInit : function(){
		console.log('Initialized');
	}, 
};

var SSO = new ScreenSizeObserver(settings);

//you can also do this
SSO.onSizeChanged(function(e){
	console.log("Data: " + e);
});

SSO.onInit(function(e){
	console.log("Inialized");
});
```  

### Specific Size Related Events
Event  | Params | Description
-----  | ------ | -----------
onSizeEnter | data   | Fires when specific size is entered.
onSizeLeave | data | Fires when specific size is left.

#### Example:
```javascript
var settings = {
	sizes: [
		{ 
			className:'size-sm', 
			maxWidth:1000, 
			onSizeEnter: function(e) {
				console.log("Entering: " + e.className);
			}, 
			onSizeLeave: function(e) {
				console.log("Leaving: " + e.oldClassName);
			}
		}, { 
			className:'size-lg'
		},
	]
};

var SSO = new ScreenSizeObserver(settings);
```

### Public methods
Method  | Args | Description
-----  | ------ | -----------
getSize | size: int or string  | gets size by size index (int) or class name (string) 
getSizeIndexByWidth | width: int | get size index by width (in px)


#### Example:
```javascript
var size0 = SSO.getSize(0); //gets size by index
var sizesm = SSO.getSize('size-sm'); //gets size by class namegall
var sizeIndex = SSO.getSizeIndexByWidth(780); //gets size index by width (in pixels)
```

###License

Copyright (c) 2016 Aleksander Fras  
Licensed under the MIT license.
