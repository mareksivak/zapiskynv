(function($) {
	
	$.fn.extend({
		
		dropdown: function(options) {
		
			var defaults = {
				duration: 250,
				delay: 250,
				close: function(ul) {
					ul.slideUp(options.duration);
				},
				open: function(ul) {
					ul.hide().slideDown(options.duration);
				}
			},
			options = $.extend(defaults, options),
			dropdown = function() {
				$(this).children('li:has(ul)').each(go);
			},
			go = function() {
				var li = $(this).css('z-index', 1),
				submenu = li.children('ul'),
				deferred;
				dropdown.apply(submenu);
				li.hover(function() {
					li.css('z-index', 3).data('hovering.dropdown', true);
					if(!deferred) {
						options.open(submenu);
						deferred = $.Deferred(),
						resolve = function() {
							li.css('z-index', 2);
							setTimeout(function() {
								deferred && (li.data('hovering.dropdown') || deferred.resolve());
							}, options.delay);
						};
						deferred.promise().done(function() {
							options.close(submenu);
							li.off('mouseleave.dropdown').delay(options.duration).css('z-index', 1);
							deferred = null;
						});
						li.on('mouseleave.dropdown', resolve);
					}
				}, function() {
					li.data('hovering.dropdown', false);
				});
			};
			
			return this.each(dropdown);
			        	
		}
        
	});
    
})(jQuery);
