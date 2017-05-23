/* global llfwp_luminous_args */
(function ( document, Luminous, NULL ) {

	if ( llfwp_luminous_args === NULL ) return;

	var images = document.querySelectorAll( llfwp_luminous_args.selector );

	if (images.length !== 0) {
		Array.prototype.map.call(images, function (image) {
			new Luminous(image);
		});
	}

})(window.document, window.Luminous);