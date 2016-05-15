# fa-screensizeobserver
Observes screen size

####normal usage
Script needs jquery to work (for now). Before your closing <body> tag add:
```html
<script src="path/to/jquery/jquery.js"></script>
<script src="path/to/fa-screensizeobserver/fa-screensizeobserver.js"></script>
```  
where `path/to/jquery` is location of your `jquery` script and `path/to/fa-screensizeobserver` is location of your `fa-screensizeobserver` script.  


####npm install
```
npm install fa-screensizeobserver --save
```

####browserify usage
```javascript
var ScreenSizeObserver = require('fa-screensizeobserver'); //returns class
```

```javascript
var SSO1 = new ScreenSizeObserver(settings); //defaults
```