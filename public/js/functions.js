/* ==============================================
Preload
=============================================== */
$(window).load(function() { // makes sure the whole site is loaded
'use strict';
    $('[data-loader="circle-side"]').fadeOut(); // will first fade out the loading animation
    $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({'overflow':'visible'});
    $(window).scroll();
});

/* ==============================================
Sticky nav
=============================================== */
$(window).scroll(function(){
'use strict';
    if($(this).scrollTop() > 1){
        $('header').addClass("sticky");
    }
    else{
        $('header').removeClass("sticky");
    }
});

/* ==============================================
Menu
=============================================== */
$('a.open_close').on("click",function() {
	'use strict';
	$('.main-menu').toggleClass('show');
	$('.layer').toggleClass('layer-is-visible');
});
$('a.show-submenu').on("click",function() {
	'use strict';
	$(this).next().toggleClass("show_normal");
});
$('a.show-submenu-mega').on("click",function() {
	'use strict';
	$(this).next().toggleClass("show_mega");
});
if($(window).width() <= 480){
	$('a.open_close').on("click",function() {
	'use strict';
	$('.cmn-toggle-switch').removeClass('active');
});
}

/* ==============================================
Common
=============================================== */
/* Tooltip*/
$('.tooltip-1').tooltip({html:true});
	
/* Accordion*/
function toggleChevron(e) {
	'use strict';
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('icon_set_1_icon-11 icon_set_1_icon-10');
}
$('.panel-group').on('hidden.bs.collapse shown.bs.collapse', toggleChevron);

/* Animation on scroll */
new WOW().init();

/* ==============================================
Video modal dialog + Parallax + Scroll to top + Incrementer
=============================================== */
$(function () {
'use strict';
$('.video').magnificPopup({type:'iframe'});	/* video modal*/
$('.parallax-window').parallax({}); /* Parallax modal*/

// Image popups
$('.magnific-gallery').each(function() {
	'use strict';
    $(this).magnificPopup({
        delegate: 'a', 
        type: 'image',
        gallery:{enabled:true}
    });
}); 

/* Hamburger icon*/
var toggles = document.querySelectorAll(".cmn-toggle-switch"); 
  for (var i = toggles.length - 1; i >= 0; i--) {
    var toggle = toggles[i];
    toggleHandler(toggle);
  };

  function toggleHandler(toggle) {
    toggle.addEventListener( "click", function(e) {
      e.preventDefault();
      (this.classList.contains("active") === true) ? this.classList.remove("active") : this.classList.add("active");
    });
  };
  
  /* Scroll to top*/
  $(window).scroll(function() {
		if($(this).scrollTop() != 0) {
			$('#toTop').fadeIn();	
		} else {
			$('#toTop').fadeOut();
		}
	});
	$('#toTop').on("click",function() {
		$('body,html').animate({scrollTop:0},500);
	});	
	});	

 /* Quantity input*/    
 // This button will increment the value
    $('.qtyplus').on("click",function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('name');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val(),10);
        // If is not undefined
        if (!isNaN(currentVal)) {
            // Increment
            $('input[name='+fieldName+']').val(currentVal + 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(1);
        }
    });
    // This button will decrement the value till 0
    $(".qtyminus").on("click",function(e) {
        // Stop acting like a button
        e.preventDefault();
        // Get the field name
        fieldName = $(this).attr('name');
        // Get its current value
        var currentVal = parseInt($('input[name='+fieldName+']').val(),10);
        // If it isn't undefined or its greater than 0
        if (!isNaN(currentVal) && currentVal > 0) {
            // Decrement one
            $('input[name='+fieldName+']').val(currentVal - 1);
        } else {
            // Otherwise put a 0 there
            $('input[name='+fieldName+']').val(0);
        }
    });
	
/* Cat nav onclick active */    
$('ul#cat_nav li a').on('click', function(){
	'use strict';
    $('ul#cat_nav li a.active').removeClass('active');
    $(this).addClass('active');
});

/* ==============================================
Carousel
=============================================== */
  $('.carousel_testimonials').owlCarousel({
    items:1,
    loop:true,
	 autoplay:false,
    animateIn: 'flipInX',
	 margin:30,
    stagePadding:30,
    smartSpeed:450,
	responsiveClass:true,
    responsive:{
        600:{
            items:1
        },
		 1000:{
            items:1,
			nav:false
        }
    }
});