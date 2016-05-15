# fa-screensizeobserver
Observes screen size

###Usage

####Normal way
Script needs jquery to work (for now). Before your closing <body> tag add:
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

```javascript
var SSO1 = new ScreenSizeObserver(settings); //defaults
```

### Settings

Option | Type | Default | Description
------ | ---- | ------- | -----------
sizes | array of objects | ```[{ maxWidth  : 767 , className : 'size-xs', },{ maxWidth  : 991 , className : 'size-sm', },{ maxWidth  : 1199, className : 'size-md', },{ className : 'size-lg' }]``` | All screen sizes. Each size can have maxWidth, className properties (required, last size object doesn't need maxWidth) and onSizeEnter and onSizeLeave events
$element | jquery element | `$(document.documentElement)` | $element is going to get current className asigned
------ | ---- | ------- | -----------