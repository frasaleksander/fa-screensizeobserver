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
sizes | array of objects | ```[{ maxWidth  : 767 , className : 'size-xs' }, { maxWidth  : 991 , className : 'size-sm' }, { maxWidth  : 1199, className : 'size-md' }, { className : 'size-lg' }]``` | All screen sizes. Each size must have maxWidth and className except the last one (required only className). You can also create onSizeEnter and onSizeLeave events for each size.
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
		console.log('document is ready');
	}, 
};

var SSO = new ScreenSizeObserver(settings);
```  

### Specific Size Related Events
Event  | Params | Description
-----  | ------ | -----------
onSizeEnter | data   | fires when size is entered
onSizeLeave | data | fires when size is left

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