jsio('import std.js as JS');
jsio('from util.browser import $');
jsio('import .Widget, .Events, .global');

var Button = exports = Class([Widget, Events], function(supr) {
	this._css = 'btn';
	this._type = 'button';
	
	this.init = function(params) {
		params = JS.merge(params, {
			tag: 'button'
		});
		
		supr(this, 'init', [params]);
	}
	
	this.create = function() {
		this._params.style = JS.merge(this._params.style, {
				whiteSpace: 'nowrap',
				display: 'block'
			});
		
		supr(this, 'create', arguments);
		
		this._el.href = 'javascript:> ' + this._params.label;
	};
	
	this.buildWidget = function() {
		var el = this._el;
		
		this.initMouseEvents(el);
		this.initKeyEvents(el);
		
		el.style.userSelect = 'none';
        el.style.MozUserSelect = 'none'; // Mozilla
        el.style.KhtmlUserSelect = 'none'; // Safari
        el.unselectable = 'on'; // IE
	};
	
	this.onClick = function(e) {
		$.stopEvent(e);
		if (this._params.onclick) {
			this._params.onclick(e, this);
		}
		
		supr(this, 'onClick', arguments);
	}
	
	this.captureOnEnter = function(widget) {
		widget.subscribe('KeyDown', this, 'onKeyDown');
		widget.subscribe('KeyUp', this, 'onKeyUp');
	}
	
	this.onKeyDown = function(e) {
		if (e.keyCode == 13) { $.stopEvent(e); this.onMouseDown(); }
	}
	
	this.onKeyUp = function(e) {
		if (e.keyCode == 13) { $.stopEvent(e); this.onMouseUp(); this.onClick(e); }
	}
	
	this.show = function() {
		this.getElement().style.display = 'inline-block';
	}
});

Widget.register(Button, 'Button');
