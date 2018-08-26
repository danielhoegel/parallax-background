'use strict';

/**
 * Background image parallax effect
 * @author Daniel Högel <hoegel.daniel@gmail.com>
 * @version 1.0
 */
(function () {

	/**
  * Enable background parallax effect for element
  * @param {HTMLElement} element - DOM element with parallax class
     * @param {number} [speedFactor=0.3] - factor of parallax speed
     * @param {string} [backgroundX=50%] - background x position
  */
	function parallax(element) {
		var speedFactor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.3;
		var backgroundX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '50%';

		var top = element.offsetTop;
		var height = element.offsetHeight;
		var backgroundY = 0;

		/** update background position on scroll event */
		function update() {
			var windowTop = window.pageYOffset || document.body.scrollTop;

			// check if element is in visible viewport
			if (windowTop + windowHeight > top && windowTop < top + height) {
				// calc new bg top position
				var heightPercentage = (top - windowTop) / windowHeight;
				backgroundY = Math.round(heightPercentage * windowHeight * speedFactor);
			}

			// set bg top position
			element.style.backgroundPosition = backgroundX + ' ' + backgroundY + 'px';
		}

		// remove scroll event listener (if already set)
		window.removeEventListener('scroll', update);
		// add scroll event listener (again)
		window.addEventListener('scroll', update);
		// initial update
		update();
	}

	/**
 * Helper: listen to height changes of element
 * @param {HTMLElement} element 
 * @param {function} [callback] - function, that gets called on height change
 * @param {number} [interval=100]
 */
	function onHeightChange(element, callback) {
		var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;

		var prevHeight = element.offsetHeight;

		window.setInterval(function () {
			var currentHeight = element.offsetHeight;

			if (currentHeight !== prevHeight) {
				prevHeight = currentHeight;
				if (typeof callback === 'function') {
					callback();
				}
			}
		}, interval);
	}

	/**
  * GLOBAL VARIABLES
  */
	var windowHeight = window.innerHeight;

	/**
  * SETUP PARALLAX ELEMENTS
  */
	document.addEventListener('DOMContentLoaded', function () {
		var parallaxElements = document.querySelectorAll('.parallax');

		if (parallaxElements.length) {

			/** init the parallax effect for alll parallaxElements */
			var initParallax = function initParallax() {
				parallaxElements.forEach(function (element) {
					parallax(element, 0.3, '50%');
				});
			};

			// init parallax effect


			initParallax();

			// init parallax effect again on document height change
			onHeightChange(document.body, initParallax);

			// listen for window resize
			window.addEventListener('resize', function () {
				windowHeight = window.innerHeight;
			});
		}
	});
})();