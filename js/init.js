$(document).ready(function() {

				



				// set CSS context to "JS enabled"
				$("html:first").removeClass("no-js");




				


				// smooth scroll to target element
				$('a[href^="#"].scroll').click(function(e) {

					var anchorOffset = 0; /* a value of zero will scroll element to top of viewport */
					var target = $(this).attr('href');
					if ($(target).length > 0) {
						e.preventDefault(); // don't fire the #link
						var targetScrollPos = $(target).offset().top - anchorOffset; // the target scroll position
						var maxScrollPos = $(document).height() - $(window).height() // can't scroll beyond here cos window height
						targetScrollPos = Math.max(0, Math.min(targetScrollPos, maxScrollPos)); // not negative, not more than the max
						var t = (Math.abs(targetScrollPos - $(window).scrollTop()) * 0.75); // calc a time to reach target, from current pos
						$('html, body').animate({scrollTop: targetScrollPos}, t, 'easeInOutQuad'); // do the scroll
					}

				});

				

				var hiddenTrigger;

				

				// resize sections to make them same height as viewport (minimum)
				$('.section').each(function(e) {
					var h = $(window).height();
					$(this).css({'min-height': h + 'px'});
				});

				// function to check when element scrolls into view (true/false)
				function isScrolledIntoView(elem)
				{
                    if (elem == null) {
                        return;
                    }
					var docViewTop = $(window).scrollTop();
					var docViewMiddle = docViewTop + (0.5 * $(window).height());
					var docViewBottom = docViewTop + $(window).height();
					var elemTop = $(elem).offset().top;
					var elemBottom = elemTop + $(elem).height();
					//return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom));
					return ((elemBottom >= docViewMiddle) && (elemTop <= docViewMiddle));
				}

				// calculate the amount (in px) an element has scrolled above the fold (within boundaries)
				function getElementHeightAboveFold(elem)
				{
					var docViewTop = $(window).scrollTop();
					var docViewBottom = docViewTop + $(window).height();
					var elemTop = $(elem).offset().top;
					var elemHeight = $(elem).height();
					return Math.min((elemHeight + $(window).height()), Math.max((docViewBottom - elemTop), 0));
				}

				// calculate the amount (in px) an element has scrolled above the top of the viewport
				function getElementHeightAboveTop(elem)
				{
					var docViewTop = $(window).scrollTop();
					var elemTop = $(elem).offset().top;
					return (docViewTop - elemTop);
				}

				// temp function to report something on screen
				function reportValue(str) {
					$('a[href^="#home"]').text(str);
				}


				// highlight the link in the menu
				function scrollMenuActive() {

					$('nav ul li a[href^="#"]').each(function() {

						var btn = $(this);

						if (isScrolledIntoView(btn.attr('active'))) {
							btn.closest('li').addClass('active');
						} else {
							btn.closest('li').removeClass('active');
						}

					});
				}
				// have this function fire on scroll/load
				$(window).bind('load scroll', $.throttle(100, scrollMenuActive));


//created this for easy generation of frames
				function buildHistoryFramesArray(height, padding, slides) {
					//increment between slides
					var increment = ((height - (padding * 2)) / slides);
					//where to start - used as an incrementer?
					var start = padding - increment;
					//whats returned
					var frameArray = new Array();
					for (i = 0; i < slides; i++) {
						var frame = new Array();
						frame[0] = 'frame' + (((i + 1) < 10) ? '0' : '') + (i + 1);
						frame[1] = start;
						frame[2] = (i < (slides - 1)) ? (frame[1] + increment) : height;
						//increment starter
						start = frame[2];
						//append to outer array
						frameArray[i] = frame;
					}
					return frameArray;
				}

				//cache the history frames into a var (not called everytime the page is scrolled)
				var historyFrames = buildHistoryFramesArray(4800, 1000, 32);

				
				// assign CSS classes on scroll (then let CSS transitions do the animation)
				function scrollAnimate() {

	/*				assignClassByNumber(
							$('#history'), // pass the jQuery object we're animating
							getElementHeightAboveFold($('#history')),
							historyFrames
							);

					assignClassByNumber(
							$('#timeline-2010 h3'), // pass the jQuery object we're animating
							getElementHeightAboveFold($('#timeline-2010 h3')), // pass the current (relative) scroll position
							[
								['popped', 300, 99999] // the 'script' array [ css class, scroll start pos, scroll end pos]

							]
							);
					assignClassByNumber(
							$('#timeline-2013 h3'), // pass the jQuery object we're animating
							getElementHeightAboveFold($('#timeline-2013 h3')), // pass the current (relative) scroll position
							[
								['popped', 300, 99999] // the 'script' array [ css class, scroll start pos, scroll end pos]

							]
							);
					
					assignClassByNumber(
							$('#timeline-2010 img'), // pass the jQuery object we're animating
							getElementHeightAboveFold($('#timeline-2010 img')), // pass the current (relative) scroll position
							[
								['popped', 200, 99999] // the 'script' array [ css class, scroll start pos, scroll end pos]

							]
							);
					assignClassByNumber(
							$('#timeline-2013 img'), // pass the jQuery object we're animating
							getElementHeightAboveFold($('#timeline-2013 img')), // pass the current (relative) scroll position
							[
								['popped', 200, 99999] // the 'script' array [ css class, scroll start pos, scroll end pos]

							]
							);
					*/
				}

				// have this function fire on scroll
				$(window).bind('scroll', $.throttle(20, scrollAnimate));


				// assign CSS class to element when specified number is within given range
				function assignClassByNumber(elem, num, classRangeArray) {

					// start by removing any classes previously assigned by this function
					for (var c = 0; c < classRangeArray.length; c++) {
						elem.removeClass(classRangeArray[c][0]);
					}

					// check each key
					for (var i = 0; i < classRangeArray.length; i++) {

						// check number is in range for this key
						if ((num >= classRangeArray[i][1]) && (num <= classRangeArray[i][2])) {

							// assign the given value as a CSS class and quit
							elem.addClass(classRangeArray[i][0]);
							break;

						}
					}
				}
				// reveal news section on hover
				$('#news').hover(
						function() {
							$(this).removeClass('closed');
						},
						function() {
							$(this).addClass('closed');
						}
				);
				
				// show news section on click
				$('#news').click(
						function() {
							$(this).toggleClass('show');
							$(this).addClass('closed');
						});
						
				// offset the top margin of elements by a proportion of the scroll (parallax)
				function scrollParallax() {
					$('#timeline-2010 .parallax').css({'margin-top': Math.round(getElementHeightAboveFold($('#timeline-2010')) / -1.5) + 'px'});
	//@				$('#timeline-2013 .parallax').css({'margin-top': Math.round(getElementHeightAboveFold($('#timeline-2013')) / -1.5) + 'px'});
					}
				// have this function fire on scroll/load
				$(window).bind('scroll load', $.throttle(20, scrollParallax));


				

				
				
			});