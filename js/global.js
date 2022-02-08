var observe;
if (window.attachEvent) {
    observe = function (element, event, handler) {
        element.attachEvent('on'+event, handler);
    };
}
else {
    observe = function (element, event, handler) {
        element.addEventListener(event, handler, false);
    };
}
function init () {
    var text = document.getElementById('text');
    function resize () {
        text.style.height = 'auto';
        text.style.height = text.scrollHeight+'px';
    }
    /* 0-timeout to get the already changed text */
    function delayedResize () {
        window.setTimeout(resize, 0);
    }
    observe(text, 'change',  resize);
    observe(text, 'cut',     delayedResize);
    observe(text, 'paste',   delayedResize);
    observe(text, 'drop',    delayedResize);
    observe(text, 'keydown', delayedResize);

    resize();
}

jQuery(document).ready(function($) {

    $("body").addClass("loaded");

    $(function() {
        $('.lazy').Lazy();
    });

    $('.form__dropdown .dropdown-item').on('click', function(){
    	var value = $(this).data('value');
    	var label = $(this).html();
    	$('select[type="interest"]').val(value);
    	$('.dropdown-toggle').html(label);
    });

	$('.slidetoggle h3').on('click', function(){
		$('.slidetoggle').find('.slidetoggle__content').slideUp();
		$(this).parents('.slidetoggle').find('.slidetoggle__content').slideDown();
		var image = $(this).data('image');

		$(".toggle-image").fadeTo(500,0.1, function() {
			$(".toggle-image").attr("src",image);
		}).fadeTo(500,1);
		return false;
	});

	$('.acceptcookies').on('click', function(){
		$(this).parent().fadeOut();
		Cookies.set('cookies', 'accepted');
	});

	console.log(Cookies.get('cookies'))

	if (Cookies.get('cookies')) {
		$('.cookiealert').hide();
	} else {
		$('.cookiealert').css('display', 'flex');
	}

	/*
	 * Replace all SVG images with inline SVG
	 */
	jQuery('img.svg').each(function(){
	    var $img = jQuery(this);
	    var imgID = $img.attr('id');
	    var imgClass = $img.attr('class');
	    var imgURL = $img.attr('src');

	    jQuery.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = jQuery(data).find('svg');

	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }

	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');

	        // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
	        if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
	            $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
	        }

	        // Replace image with new SVG
	        $img.replaceWith($svg);

	    }, 'xml');

	});
});