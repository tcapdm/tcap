;(function($, window, document, undefined) {


$(function() {
	// globals
	
	var $window = $(window),
		$document = $(document),
		docHeight = $document.innerHeight(),
		winWidth = $window.innerWidth(),
		winHeight = $window.innerHeight(),
		$header = $('header'),
		hh = $header.innerHeight(),
		serviceThumb = $('.service-thumb').innerHeight();

	var updateOnResize = debounce(function() {
		console.log("2");
		updateValueOnResize();
		updateStyleOnResize();
		resizeEventListener();
		menuTransfer();
		breadcrumbsResponsive();
	}, 250);


updateStyleOnResize();
resizeEventListener();
menuTransfer();
breadcrumbsResponsive();

/**
* --------------------------------------------------------------------------
* RIPPLE EFFECT BTN
* --------------------------------------------------------------------------
*/
var ripple = function() {
	var target, rect, ripple;
	var top, left;

	$('.ripple-btn').mousedown(function (e) {
		target = e.target;
		rect = target.getBoundingClientRect();
		ripple = target.querySelector('.ripple');

		$(ripple).remove();
		ripple = document.createElement('span');
		ripple.className = 'ripple';
		ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
		target.appendChild(ripple);
		top = e.pageY - rect.top - ripple.offsetHeight / 2 -  document.body.scrollTop;
		left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
		ripple.style.top = top + 'px';
		ripple.style.left = left + 'px';
		return false;
	});
}();

/**
* --------------------------------------------------------------------------
* RESPONSIVE HEADER
* --------------------------------------------------------------------------
*/

function resizeEventListener () {
	if (winWidth <= 600) {
		$('header .logo').removeClass('pull-left');
		$('header .nav').addClass('nav-stick');
	}

	if(winWidth > 600) {
		$('.logo').addClass('pull-left');
	}
}


/**
* --------------------------------------------------------------------------
* MOBILE NAVIGATION
* --------------------------------------------------------------------------
*/

var navResponsive = function(){
	$('.nav-col').click(function(){
	  $(this).toggleClass('animate');
	  $('.navlist').toggleClass('open');
	  $('.menu-shadow').fadeToggle();
	  if($('.footer2').hasClass('open')) {
	  	$('.footer2').removeClass('open').slideToggle();
	  	$('.toggle-footer-btn').find('#footer-btn').toggleClass('fa-chevron-down fa-chevron-up');
	  	$(".footer-toggle-text").text(($(".footer-toggle-text").text() == 'CLOSE SITE MAP') ? 'OPEN SITE MAP' : 'CLOSE SITE MAP').fadeIn();
	  }
	});

	$('.menu-shadow').click(function(){
	  $('.nav-col').removeClass('animate');
	  $('.navlist').removeClass('open');
	  $('.search-bar').slideUp();
	  $(this).fadeOut();
	});
}();

/**
* --------------------------------------------------------------------------
* FOOTER
* --------------------------------------------------------------------------
*/

var footer = function(){
	$('.toggle-footer-btn').click(function() {
		$('html, body').animate({scrollTop:$(document).height()}, 'slow');
		$(this).find('#footer-btn').toggleClass('fa-chevron-down fa-chevron-up');
		$(".footer-toggle-text").text(($(".footer-toggle-text").text() == 'CLOSE SITE MAP') ? 'OPEN SITE MAP' : 'CLOSE SITE MAP').fadeIn();
		$('.footer2').toggleClass('open').slideToggle(400);
		if($('.navlist').hasClass('open')) {
			$('.nav-col').removeClass('animate');
			$('.navlist').removeClass('open');
			$('.menu-shadow').fadeToggle();
		}
	

		return false;
	});
}();

/**
* --------------------------------------------------------------------------
* SEARCH LABAS
* --------------------------------------------------------------------------
*/

var searchBtn = function(){
	$('.search-btn').click(function(){
		$('.search-bar').slideToggle();
		$('.menu-shadow').fadeToggle();
	});
	$('.search-bar span').click(function(){
		$('.search-bar').slideUp();
		$('.menu-shadow').fadeOut();
	});
	$('.search-bar').css('top',hh);
}();


/**
* --------------------------------------------------------------------------
* FIRST MENU TRANSFER TO RESPONSIVE MENU
* --------------------------------------------------------------------------
*/

function menuTransfer() {
	if(winWidth <= 600){
		$('.first-menu').children().clone().addClass('menu-transfer').prependTo('.navlist');
		$('.navlist li a').children('i').remove();
		$('.lang').appendTo('.footer3');
	} else {
		$('.navlist').find('li.menu-transfer').remove();
		$('.lang').appendTo('.submenu');
	}
}

/**
* --------------------------------------------------------------------------
* OFFSET NG BODY
* --------------------------------------------------------------------------
*/

var bodyOffset = function(){
	$('body').css('margin-top',hh);
}();

/**
* --------------------------------------------------------------------------
* HIDE HEADER ON ON SCROLL DOWN
* --------------------------------------------------------------------------
*/

var didScroll;
var lastScrollTop = 0;
var delta = 0;

setInterval(function() {
	if (didScroll) {
		hasScrolled();
		didScroll = false;
	}
});

function hasScrolled() {
	var st = $(this).scrollTop();
	if(Math.abs(lastScrollTop - st) <= delta)
		return;
	
	// If they scrolled down and are past the navbar, add class .nav-up.
	// This is necessary so you never see what is "behind" the navbar.
	if (st > lastScrollTop && st > hh){
		// Scroll Down
		$('header').removeClass('nav-down').addClass('nav-up');
		$('.nav-up').css('top', '-'+hh+'px');
	} else {
		// Scroll Up
		if(st + winHeight < docHeight) {
			$('header').removeClass('nav-up').addClass('nav-down');
			$('.nav-down').css('top', 0);
		}
	}
	lastScrollTop = st;
}

/**
* --------------------------------------------------------------------------
* SLIDER
* --------------------------------------------------------------------------
*/

$('#homeSlider').camera({
	height: '25%',
	navigation: true,
	fx:'simpleFade',
	pagination: true,
	opacityOnGrid: false,
	time: 1000, //tagal ng pagstay ng image
	transPeriod: 500 //animation ng pagpalit ng image
});

/**
* --------------------------------------------------------------------------
* CUSTOM INPUTS
* --------------------------------------------------------------------------
*/
jQuery.fn.customInput = function(){
	return $(this).each(function(){	
		if($(this).is('[type=checkbox],[type=radio]')){
			var input = $(this);
			
			// get the associated label using the input's id
			var label = $('label[for='+input.attr('id')+']');
			
			// wrap the input + label in a div 
			input.add(label).wrapAll('<div class="custom-'+ input.attr('type') +'"></div>');
			
			// necessary for browsers that don't support the :hover pseudo class on labels
			label.hover(
				function(){ $(this).addClass('hover'); },
				function(){ $(this).removeClass('hover'); }
			);
			
			//bind custom event, trigger it, bind click,focus,blur events					
			input.bind('updateState', function(){	
				input.is(':checked') ? label.addClass('checked') : label.removeClass('checked checkedHover checkedFocus'); 
			})
			.trigger('updateState')
			.click(function(){ 
				$('input[name='+ $(this).attr('name') +']').trigger('updateState'); 
			})
			.focus(function(){ 
				label.addClass('focus'); 
				if(input.is(':checked')){  $(this).addClass('checkedFocus'); } 
			})
			.blur(function(){ label.removeClass('focus checkedFocus'); });
		}
	});
};

if ($("div,p").hasClass("input_styled")) {
    $(".input_styled input").customInput();
}

/**
* --------------------------------------------------------------------------
* SLIDER SHOW AND HIDE
* --------------------------------------------------------------------------
*/

var sliderToggle = function(){
	$('.slider-toggle .input_styled input').click(function() {
    if($(this).siblings().hasClass("checked")){
      $('#homeSlider').cameraResume();
      
      $(".slider").css({
        "position": "initial",
        "display": "none",
        "opacity": 1,
        "visibility": "visible"
      });

      $(".slider").stop(true,true).slideDown();
    }else{
      $('#homeSlider').cameraPause();
      
      $(".slider").stop(true,true).slideUp(function(){
        $(".slider").css({
          "position": "fixed",
          "width": "100%",
          "opacity": 0,
          "visibility": "hidden"
        });
      });
    }
	});
}();


/**
* --------------------------------------------------------------------------
* RESPONSIVE BREADCRUMBS
* --------------------------------------------------------------------------
*/

function breadcrumbsResponsive() {
	if(winWidth <= 600){
		$('.breadcrumbs ul').appendTo('.responsive-breadcrumbs-list');
	} else {
		$('.responsive-breadcrumbs-list ul').appendTo('.breadcrumbs');
	}

	$('.responsive-breadcrumbs a').click(function(){
		$(this).find('span').toggleClass('fa-chevron-up fa-chevron-down');
		$('.responsive-breadcrumbs-list').stop(true,true).slideToggle();
	});
};

/**
* --------------------------------------------------------------------------
* PANG KUHA NG STROKE-DASHARRAY NA VALUE
* --------------------------------------------------------------------------
*/

$(".gitna path").each(function(i, el) {
	var total_length = el.getTotalLength();
	console.log(total_length);
});


/**
* --------------------------------------------------------------------------
* TEXT FLOATER UPON HOVER
* --------------------------------------------------------------------------
*/

var JSReplaceLetter = function() {
	var jSReplaceLetter = $('.text-floater').contents();
	var newStr = '';
	
	function replace(str) {
		for (var x = 0; x < str.length; x++) {
			newStr += '<i>' + str[x] + '</i>' ;
		}
	}
	
	var showObject = function(obj) {
		var result = "";
		for (var p in obj) {
			if( obj.hasOwnProperty(p) ) {
				result += p + "=" + '"' + obj[p] + '"' + " ";
			}
		}
		return result;
	}
	
	for (var i = 0; i < jSReplaceLetter.length; i++) {
		if (jSReplaceLetter[i].nodeType === 3) {
			var str = jSReplaceLetter[i].wholeText.toString();
			replace(str);
			
		} else if (jSReplaceLetter[i].nodeType === 1) {
			var str = jSReplaceLetter[i].innerText;
			var el = jSReplaceLetter[i].nodeName;
			
			var attributess = {};


			$.each( $(jSReplaceLetter[i])[0].attributes, function( i, attr ) {
				attributess[ attr.name ] = attr.value;
			});
			
			var attributeString = showObject(attributess);
			
			newStr += '<' + el + " " + attributeString + '>';
			replace(str);
			newStr += '</' + el + '>';
		}
	}
	
	$('.text-floater').html(newStr);

}();


/**
* --------------------------------------------------------------------------
* PARTICLES ON HOMEPAGE
* --------------------------------------------------------------------------
*/

particleground(document.getElementById('particles-foreground'), {
  dotColor: 'rgba(0, 0, 0, 0.5)',
  lineColor: 'rgba(0, 0, 0, 0.05)',
  minSpeedX: 0.3,
  maxSpeedX: 0.6,
  minSpeedY: 0.3,
  maxSpeedY: 0.6,
  density: 50000, // One particle every n pixels
  curvedLines: false,
  proximity: 250, // How close two dots need to be before they join
  parallaxMultiplier: 100, // Lower the number is more extreme parallax
  particleRadius: 4, // Dot size
});

particleground(document.getElementById('particles-background'), {
  dotColor: 'rgba(0, 0, 0, 0.5)',
  lineColor: 'rgba(0, 0, 0, 0.05)',
  minSpeedX: 0.075,
  maxSpeedX: 0.15,
  minSpeedY: 0.075,
  maxSpeedY: 0.15,
  density: 30000, // One particle every n pixels
  curvedLines: false,
  proximity: 20, // How close two dots need to be before they join
  parallaxMultiplier: 250, // Lower the number is more extreme parallax
  particleRadius: 2, // Dot size
});

/**
* --------------------------------------------------------------------------
* ANIMATION ON HOMEPAGE SECTION 1
* --------------------------------------------------------------------------
*/
$(document).mousemove(function(e) {
	$('.tcap-globe image').parallax(10, e);
});

$.fn.parallax = function ( resistance, mouse ) {
	$el = $( this );
	TweenLite.to( $el, 0.2, 
	{
		x : -(( mouse.clientX - (window.innerWidth/2) ) / resistance ),
		y : -(( mouse.clientY - (window.innerHeight/2) ) / resistance )
	});

};

/**
* --------------------------------------------------------------------------
* scroll for more on our services
* --------------------------------------------------------------------------
*/

var serviceUlContent = function(){
	test = $('.service-thumb .service-list ul');
	if (test.offsetHeight < test.scrollHeight ||
	    test.offsetWidth < test.scrollWidth) {
	    $('#scroll-down').show();
	} else {
	    $('#scroll-down').hide();
	}
}();

 // $.srSmoothscroll();

/**
* --------------------------------------------------------------------------
* GOOGLE MAP
* --------------------------------------------------------------------------
*/

google.maps.event.addDomListener(window, 'load', init);
function init() {
	var mapOptions = {
		zoom: 15,
		center: new google.maps.LatLng(14.5839664, 121.0633393),
		styles: [{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#ff0200"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"labels.text","stylers":[{"visibility":"on"},{"saturation":"-3"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#748ca3"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ff000a"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ff0200"},{"saturation":"23"},{"lightness":"20"},{"visibility":"off"}]},{"featureType":"poi.school","elementType":"geometry.fill","stylers":[{"color":"#ffdbda"},{"saturation":"0"},{"visibility":"on"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#ff0200"},{"saturation":"100"},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#f39247"},{"saturation":"0"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#008eff"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#ffe5e5"},{"saturation":"0"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#ff0200"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]}]
	};
	mapOptions = $.extend({
		scrollwheel: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}, mapOptions);
	var mapElement = document.getElementById('map');
	var map = new google.maps.Map(mapElement, mapOptions);
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(14.5839664, 121.0633393),
		map: map,
		title: 'Transcosmos'
	});
}

/**
* --------------------------------------------------------------------------
* BOOTSTRAP VALIDATOR
* --------------------------------------------------------------------------
*/

var formValidate = function(){
	$('#contact_form').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		fields: {
			contact_name: {
				validators: {
					stringLength: {min: 2}, notEmpty: {message: 'Enter your name'} }
			},
			contact_position: {
				validators: {
					stringLength: {min: 2}, notEmpty: {message: 'Enter your position'} }
			},
			contact_company: {
				validators: {
					stringLength: {min: 2}, notEmpty: {message: 'Enter your company'} }
			},
			contact_email: {
				validators: {
					notEmpty: {message: 'Enter your email address'},
					emailAddress: {
						message: 'Enter a valid email address'
					}
				}
			},
			contact_number: {
				validators: {
					stringLength: {min: 7},
					notEmpty: {message: 'Enter your contact number'}
				}
			},
			contact_message: {
				validators: {
					stringLength: {min: 4},
					notEmpty: {message: 'Enter your message'}
				}
			}
		}
	})
		.on('success.form.bv', function(e) {
		$('#success_message').slideDown({ display: "block" }, "slow") // Do something ...
		$('#contact_form').data('bootstrapValidator').resetForm();
		
		
		// Prevent form submission
		e.preventDefault();

		// Get the form instance
		var $form = $(e.target);

		// Get the BootstrapValidator instance
		var bv = $form.data('bootstrapValidator');

		// Use Ajax to submit form data
		$.post($form.attr('action'), $form.serialize(), function(result) {
			console.log(result);
		}, 'json');
	});

		$(".reset").click(function() {
			$(this).closest('form').find("input[type=text], textarea").val("");
		});
}();


/**
* --------------------------------------------------------------------------
* EVENTS
* --------------------------------------------------------------------------
*/

$(window).resize(function(){
	updateOnResize();
	console.log("1");
});

$(window).scroll(function(event){
	didScroll = true;
});


/**
* --------------------------------------------------------------------------
* FUNCTIONS
* --------------------------------------------------------------------------
*/

function updateValueOnResize() {
	console.log("3");
	winWidth = $window.innerWidth();
	winHeight = $window.innerHeight();
	hh = $header.innerHeight();
	docHeight = $document.innerHeight();
	serviceThumb = $('.service-thumb').innerHeight();
}

function updateStyleOnResize() {
	//position of search bar
	$('.search-bar').css('top',hh);

	//offset of body
	$('body').css('margin-top',hh);

	//hide header on on scroll down
	$('.nav-up').css('top', '-'+hh);

	//overflow hidden ng ul dun sa thumbs
	$('.service-thumb .service-list ul').css('height', serviceThumb-80);
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

});
})(jQuery, window, document);