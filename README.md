jquery-bts-dropdown
===================

jquery-bts-dropdown is a jQuery plugin for create twitter bootstrap dropdowns.

# How to install ?

The simplest way is to install this plugin via [bower](http://bower.io)

```
bower install -S jquery-bts-dropdown
```
then, you juste have to include into your webpage jquery, then bootstrap and finally, this plugin js file (.min or not, as you prefer)

``` html
<script type="text/javascript" src="/path/to/jquery.min.js"></script>
<script type="text/javascript" src="/path/to/bootstrap.min.js"></script>
<script type="text/javascript" src="/path/to/jquery-bts-dropdown.min.js"></script>
```

# How it works ?

Look, it's very simple.
First, create a basic select element with few options :

``` html
<select name="select" id="example">
	<option value="EN">English</option>
	<option value="FR">French</option>
	<option value="SP">Spanish</option>
</select>
```

Then, init the plugin when dom's ready :

``` js
jQuery(function($){
	$('#example').dropdown(); // yes, that's all !
});
```

Of course, you can pass some options to the plugin via a js object :

``` js
$('#example').dropdown({
	placeholder: 'Select a language', // placeholder for your dropdown list
	value: 'EN', // the selected value
	clases: 'my-custom classes'
});
```

# How can i do some action when user select a value ?
Hey, it's just a select ! You can handle it as a simple select : 

``` js
$('#example').change(function(){
	console.log('User select', $(this).val());
});
```