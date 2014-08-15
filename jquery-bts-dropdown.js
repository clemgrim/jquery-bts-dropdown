;(function($){
	/**
	 * dropdown select plugin
	 * Build a dropdown select with bootstrap
	 */
	$.fn.dropdown = function(method){
		if (method === 'element') {
			return Plugin.element.call(this.eq(0));
		}

		var args = arguments;

		this.each(function(){
			var self = $(this);
			
			if ($.isFunction(Plugin[method]) && method.charAt(0) != '_'){
				return Plugin[method].apply(self, Array.prototype.slice.call(args, 1));
			} else {
				return Plugin.init.apply(self, args);
			}
		});

		return this;
	};

	$.fn.dropdown.default = {
		placeholder: null,
		width: '',
		classes: '',
		items: [],
		value: null
	};

	var Plugin = {
		init: function(options) {
			if (this.data('dropdown')) {
				return this;
			}

			if (!$.isPlainObject(options)) {
				options = {};
			}
			
			if (this[0].tagName == 'SELECT') {
				var items = $('option', this);
				options.items = [];
				
				$.each(items, function(){
					options.items.push({
						value: $(this).attr('value'),
						label: $(this).text()
					});
				});
			}
			
			this.options = $.extend({}, $.fn.dropdown.default, options);

			if (this.options.value === null) {
				var selected = $('option', this).filter(function(){
					return $(this).is('[selected]');
				});
				
				if (selected.length > 0) {
					this.options.value = selected.val();
				}
			}
			
			if (this.options.placeholder === null) {
				this.options.placeholder = this.data('placeholder') || '-';
			}
			
			if (!Plugin._isOption.call(this, this.options.value)) {
				this.options.selected = this.options.placeholder;
				this.options.value = null;
			} else {
				this.options.selected = Plugin._getLabel.call(this, this.options.value);
			}
			
			var out = Plugin._render.call(this, this.options),
				wrapper = $('<div/>').addClass('btn-group dropdown btn-block');

			if (this.options.classes) {
				wrapper.addClass(this.options.classes);
			}

			if (this.options.id) {
				wrapper.attr('id', this.options.id);
			}
			
			this.hide().wrap(wrapper);
			
			var $el = this.parent();
			
			$el.append(out);
			
			Plugin._attach.apply(this);

			this.data('dropdown', true);
			this.data('$el', $el);

			return this;
		},

		element: function(){
			return this.data('$el');
		},
		
		destroy: function(){
			var $el = Plugin.element.call(this);
			$el.before(this);
			$el.remove();
			this.show();
			this.removeData('$el');
			this.removeData('dropdown');

			return this;
		},
		
		template: [
                	'<button data-toggle="dropdown" class="btn dropdown-toggle btn-block" type="button">',
                		'<span class="pull-left">{{selected}}</span> ',
                		'<span class="caret" style="position:absolute;right:5px;top:46%;"> </span> ',
                		'<span class="remove" style="position:absolute;right:15px;top:23%;display:block;height:0;">&times;</span> ',
                		'<span class="pull-right error fa fa-exclamation-triangle hidden"></span> ',
                	'</button>',
                    '<ul role="menu" class="dropdown-menu">',
                        '{{#each items}}<li><a href="#" data-value="{{value}}">{{label}}</a></li>{{/each}}',
                    '</ul>'].join(''),
        _render: function(options){
        	var tpl = '',
        		style = options.width && options.width !== '' ? 'style="width:' + options.width + '"' : '';

        	tpl += '<button data-toggle="dropdown" class="btn dropdown-toggle btn-block" type="button">';
        	tpl += 	'<span class="pull-left">' + options.selected + '</span> ';
        	tpl += 	'<span class="caret" style="position:absolute;right:5px;top:46%;"> </span> ';
        	tpl += 	'<span class="remove" style="position:absolute;right:15px;top:23%;display:block;height:0;">&times;</span> ';
        	tpl += 	'<span class="pull-right error fa fa-exclamation-triangle hidden"></span> ';
        	tpl += '</button>';
        	tpl += '<ul role="menu" class="dropdown-menu" ' + style + '>';

        	options.items.forEach(function(item){
    			tpl += '<li><a href="#" data-value="' + item.value + '">' + item.label + '</a></li>';
        	});

        	tpl += '</ul>';

        	return tpl;
        },
		
		_attach: function(){
			var select = this,
				$el = Plugin.element.call(this),
				placeholder = $('button span', $el).eq(0),
				dropdown = $('.btn-group', $el),
				remove = $('.remove', $el),
				options = this.options;
			
			if (options.value === null) {
				remove.hide();
				select.val('');
			} else {
				select.val(options.value);
			}
			
			$('a', $el).click(function(){
				var self = $(this);
				
				select.val(self.data('value'));
				dropdown.removeClass('open');
				placeholder.text(self.text());
				remove.show();
				select.trigger('change');
				
				return false;
			});
			
			remove.click(function(){
				placeholder.text(options.placeholder);
				select.val('');
				remove.hide();
				select.trigger('change');
				
				return false;
			});
		},
		
		_isOption: function(value){
			if (value === null){
				return false;
			}
			
			return $('option', this).filter(function(){
				return $(this).val() == value;
			}).length > 0;
		},
		
		_getLabel: function(value) {
			return $('option', this).filter(function(){
				return $(this).val() == value;
			}).text();
		}
	};
})(jQuery);