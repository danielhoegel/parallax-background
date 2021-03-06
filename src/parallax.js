/**
 * Background image parallax effect
 * @author Daniel Högel <hoegel.daniel@gmail.com>
 * @version 1.1
 */
(function() {
	/**
	 * Enable background parallax effect for element
	 * @param {HTMLElement} element - DOM element with parallax class
     * @param {number} [speedFactor=0.3] - factor of parallax speed
     * @param {string} [backgroundX=50%] - background x position
	 */
	function parallax(element, speedFactor = 0.3, backgroundX = '50%') {
        const top = element.offsetTop;
        const height = element.offsetHeight;
		const style = window.getComputedStyle(element);
		const backgroundAttachment = style.getPropertyValue('background-attachment');
		let backgroundY = 0;

		/** update background position on scroll event */
		function update() {
			const windowTop = window.pageYOffset || document.body.scrollTop;
		
			// check if element is in visible viewport
			if (
				windowTop + windowHeight > top &&
				windowTop < top + height
			) {
				// calc new bg top position
				const heightPercentage = (top - windowTop) / windowHeight;

				if (backgroundAttachment === 'fixed') {
					// the background does not move by default
					// this needs to change in a slow movement with the page scroll
					backgroundY = heightPercentage * windowHeight * speedFactor;
				} else {
					// 'scroll' || 'local'
					// the background moves with the page scroll by default
					// this movement needs to get slowed down
					backgroundY =
						-1 * windowHeight * heightPercentage // reverse the page scroll (-> fixed)
						* (1 - speedFactor); // reduce the amount of the reverse
				}
            }
			
			// set bg top position
			element.style.backgroundPosition  = `
				${backgroundX} ${Math.round(backgroundY)}px
			`;
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
	function onHeightChange(element, callback, interval = 100) {
        let prevHeight = element.offsetHeight;

		window.setInterval(() => {
            const currentHeight = element.offsetHeight;
            
			if (currentHeight !== prevHeight) {
            	prevHeight = currentHeight;
				if (typeof callback === 'function') {
					callback()
				}
			}
		}, interval);
    }


	/**
	 * GLOBAL VARIABLES
	 */
    let windowHeight = window.innerHeight;


	/**
	 * SETUP PARALLAX ELEMENTS
	 */
	document.addEventListener('DOMContentLoaded', () => {
		const parallaxElements = document.querySelectorAll('.parallax');
		
		if (parallaxElements.length) {

             /** init the parallax effect for alll parallaxElements */
            function initParallax() {
                parallaxElements.forEach(element => {
                    parallax(element, 0.3, '50%');
                });
            }
			
			// init parallax effect
			initParallax()

			// init parallax effect again on document height change
			onHeightChange(document.body, initParallax);

			 // listen for window resize
			 window.addEventListener('resize', () => {
				windowHeight = window.innerHeight;
			});
		}
	});

})();
