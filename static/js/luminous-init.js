/* global llfwp_luminous_args, Luminous, LuminousGallery */
window.jQuery(function ($) {
	'use strict';

	if ( llfwp_luminous_args === undefined ) return;

	var $body = $( document.body )

	var image_link_selectors = llfwp_luminous_args.image_link_selectors.join(',');

	var gallery_selectors = llfwp_luminous_args.gallery_selectors.join(',');

	var luminous_class = 'lum-lightbox-ready';
	llfwp_luminous_args.ignored_image_links.push('.' + luminous_class);
	var ignored_image_links = llfwp_luminous_args.ignored_image_links.join(',');

	var options = {
		closeWithEscape: !!llfwp_luminous_args.close_lightbox_with_esc,

		closeOnScroll: !!llfwp_luminous_args.close_lightbox_on_scroll,

		injectBaseStyles: !!llfwp_luminous_args.inject_base_styles,

		caption: !!llfwp_luminous_args.show_caption ? getCaption : false,

		onOpen: function () {
			$body.trigger( 'luminous-lightbox-open' );
		},

		onClose: function () {
			$body.trigger( 'luminous-lightbox-close' );
		},
	};

	$body.trigger( 'luminous-lightbox-options', [ options ] );

	// enable lightbox on galleries
	if ( gallery_selectors !== '' ) {
		var $galleries = $(gallery_selectors);
		if ($galleries.length !== 0) map($galleries, enableGallery);
	}

	// enable other images
	if ( image_link_selectors !== '' ) {
		var $image_links = $(image_link_selectors);
		if ($image_links.length !== 0) map($image_links, enableImage);
	}

	function map (list, fn) {
		return Array.prototype.map.call(list, fn);
	}

	function enableGallery (gallery) {
		var $gallery_image_links = $(gallery).find(image_link_selectors);
		new LuminousGallery($gallery_image_links, false, options);
		$gallery_image_links.addClass(luminous_class);
	}

	function enableImage (image_link) {
		var $link = $(image_link);
		if (ignored_image_links === '' || $link.is(ignored_image_links)) return;
		new Luminous($link[0], options);
		$link.addClass(luminous_class);
	}

	function getCaption (image_link) {
		var $link = $(image_link);
		var result = $link.parent('.gallery-item').find('.gallery-caption').text();
		if ( result === '' ) result = $link.find('img').attr('alt');
		return result;
	}

});