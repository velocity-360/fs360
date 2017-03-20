jQuery(document).ready(function($){

	"use strict";

	// $('head').append('<link rel="stylesheet/less" type="text/css" href="../less/style.less">');
	// $('body').append('<script src="../less/js/less.min.js"></script>');


	// Google Code Prettify
	// ====================
	$(window).load(function() {
		prettyPrint();
	});



	// Clipboard Copy
	// ==============
	var clipboard = new Clipboard('.rs-pre-copy');
	clipboard.on('success', function(e) {
		e.clearSelection();
		e.trigger.textContent = 'Copied';
		window.setTimeout(function() {
			e.trigger.textContent = 'Copy';
		}, 2000);
	});
	clipboard.on('error', function(e) {
		e.trigger.textContent = 'Press "Ctrl + C" to copy';
		window.setTimeout(function() {
			e.trigger.textContent = 'Copy';
		}, 5000);
	});



	// Back to top
	// ===========
	var backTopEle = '<div class="back-to-top bg-dark b-r-a">' +
					 '<span class="glyphicon glyphicon-chevron-up"></span>' +
					 '</div>';
	$('body').append(backTopEle);

	if ($('.back-to-top').length) {
		var scrollTrigger = 100,
			backToTop = function () {
				var scrollTop = $(window).scrollTop();
				if (scrollTop > scrollTrigger) {
					$('.back-to-top').fadeIn('fast');
				} else {
					$('.back-to-top').fadeOut('fast');
				}
			};
		backToTop();
		$(window).on('scroll', function () {
			backToTop();
		});
		$('.back-to-top').on('click', function (e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop: 0
			}, 700);
		});
	}



	// Regenerate passwords
	// ====================
	// Create a new password on page load
	$('input.get-pass').each(function(){
		$(this).val(randString($(this)));
	});
	// Create a new password
	$(".rs-get-new-pass").click(function(){
		var field = $(this).closest('div').find('input.get-pass');
		field.val(randString(field));
	});
	// Auto Select Pass On Focus
	$('input.get-pass').on("click", function () {
		$(this).select();
	});

	

	// Bootstrap Tooltip
	// =================
	$('[data-toggle="tooltip"]').tooltip();


	// Centered Vertical Elements
	// ==========================
	$('.rs-dashhead-toolbar').verticalCenter();
	$('.v-centered').verticalCenter();
	$('.media-title').verticalCenter();


	// jQUery niceScroll
	// =================
	if (!(isMobile.any)) {
		if($(".rs-scroll-custom").length) {
			$(".rs-scroll-custom").niceScroll({
				cursorborderradius: "0px",
				cursorborder : false,
				cursorcolor:"#000000",
				cursoropacitymax: 0.30,
				horizrailenabled: false,
			}).resize();
		}
	}


	// Keep dropdown show when close button clicked
	// =============================================
	$('.dropdown-menu .remove-button').dropdownCLoseBtn();


	// Absolute Footer
	// =================
	$('.rs-footer').footerAbsolute({
	    absoluteClass		: 'absolute-footer',
	    mainContent			: 'rs-content'
	});


	// Image Placeholder
	// =================
	$('.place-holder').gimgPlaceholder({
	    imageClass			: 'gimg',
        overideClass		: 'fheight'
	});


	// Dashhead toogle toolbar
	// =======================
	$('.toggle-toolbar-btn').dashheadToolbar({
	    dashhead			: 'rs-dashhead',
        toolbarClass		: 'rs-dashhead-toolbar',
        toggleToolbar 		: 'toggle-toolbar',
        // toggleSpeed			: 'fast'
	});


	// Dashhead toogle toolbar
	// =======================
	$('.rs-collapse-panel').panelToggle();
	$('.rs-close-panel').panelClose();
	$('.rs-refresh-panel').panelRefresh();


});




/*
====================================
CENTERING VERTICAL ELEMENTS
====================================
*/
(function($) {

	"use strict";

    $.fn.verticalCenter = function() {

		return this.each( function() {

    		var $this 		= $(this);
    		var thisheight	= $this.height();
    		var halfHeight	= thisheight / 2;
    		$this.css('margin-top','-' + halfHeight + 'px');
    	});
    }

}(jQuery));


/*
====================================
REMOVE BUTTON ON DROPDOWN MENU
====================================
*/
(function($) {

	"use strict";

    $.fn.dropdownCLoseBtn = function() {

    	var $this = $(this);
    	return this.click( function(e) {
			e.stopPropagation();
		});
    }

}(jQuery));


/*
====================================
SIDEBAR TOGGLE ON MOBILE < 800
====================================
*/
(function($) {

	"use strict";

    $.fn.showSidebar = function( options ) {

        var settings = $.extend({
            wrapper				: null,
            screenOverlay		: null,
            absoluteFooter 		: null,
            toggleSidebarClass	: 'rs-toggle-sidebar'
        }, options);

		return this.click(function() {

			$(settings.wrapper).toggleClass(settings.toggleSidebarClass);
			$(settings.screenOverlay).toggleClass(settings.toggleSidebarClass);
			$(settings.absoluteFooter).toggleClass(settings.toggleSidebarClass);
			$('html').css('overflow', 'hidden');

		});
    }

    $.fn.hideSidebar = function( options ) {

        var settings = $.extend({
            wrapper				: null,
            screenOverlay		: null,
            absoluteFooter 		: null,
            toggleSidebarClass	: 'rs-toggle-sidebar'
        }, options);

		return this.click(function() {

			$(settings.wrapper).toggleClass(settings.toggleSidebarClass);
			$(settings.screenOverlay).toggleClass(settings.toggleSidebarClass);
			$(settings.absoluteFooter).toggleClass(settings.toggleSidebarClass);
			$('html').css('overflow', 'auto');

		});
    }


}(jQuery));


/*
====================================
SIDEBAR ACCORDION MULTILEVEL MENU
====================================
*/
(function($) {

	"use strict";

    $.fn.navSidebarMultiLevel = function() {

		return this.click(function() {

    		var $this 			= $(this);
			var closestChilds 	= $this.closest("ul");
			var activeMenus 	= closestChilds.find(".active")
			var closestLi 		= $this.closest("li");
			var menuStatus 		= closestLi.hasClass("active");
			var Count 			= 0;

			closestChilds.find("ul").slideUp("fast",function() {
					if (++Count == closestChilds.find("ul").length)
							activeMenus.removeClass("active");
			});

			if (!menuStatus) {
					closestLi.children("ul").slideDown("fast");
					closestLi.addClass("active");
			}
		});

    }

}(jQuery));


/*
====================================
ABSOLUTE FOOTER FUNCTION
====================================
*/
(function($) {

	"use strict";

    $.fn.footerAbsolute = function( options ) {

    	var $this = $(this);

        var settings = $.extend({
            absoluteClass		: null,
            mainContent			: null,
            minMarginBottom 	: 50,
            marginBottom 		: 'margin-bottom'
        }, options);


		if($this.hasClass(settings.absoluteClass)){
			var Footerheight 	= $('.' + settings.absoluteClass).height();
			var MarginBottom 	= settings.minMarginBottom;

			$('.' + settings.mainContent).css(settings.marginBottom , Footerheight + MarginBottom + "px");
		}

    }

}(jQuery));


/*
====================================
DASHHEAD FUNCTION
====================================
*/
(function($) {

	"use strict";

    $.fn.dashheadToolbar = function( options ) {

        var settings = $.extend({
            dashhead			: null,
            toolbarClass		: null,
            breadcrumb		 	: 'breadcrumb',
            toggleToolbar 		: null,
            toggleSpeed			: 'fast'
        }, options);

        return this.click( function() {

    	var $this = $(this);
		
			// If dashhead parent class has toggle class
			// then remove it first (hide dashhead toolbar & breadcrumb)
			// =========================================================
			if($this.parents('.' + settings.dashhead).hasClass(settings.toggleToolbar)) {
				$this.parents('.' + settings.dashhead).find('.' + settings.toolbarClass).slideUp(settings.toggleSpeed);
				$this.parents('.' + settings.dashhead).find('.' + settings.breadcrumb).slideUp(settings.toggleSpeed);
				$this.parents('.' + settings.dashhead).removeClass(settings.toggleToolbar);
			} 

			// If else, show them all (slidedown)
			// =========================================================
			else {
				$this.parents('.' + settings.dashhead).find('.' + settings.toolbarClass).slideDown(settings.toggleSpeed);
				$this.parents('.' + settings.dashhead).find('.' + settings.breadcrumb).slideDown(settings.toggleSpeed);
				$this.parents('.' + settings.dashhead).addClass(settings.toggleToolbar);
			}
		});

    }

}(jQuery));


/*
====================================
GENTO IMAGE PLACEHOLDER
====================================
*/
(function($) {

	"use strict";

    $.fn.gimgPlaceholder = function( options ) {

        var settings = $.extend({
            imageClass			: null,
            overideClass		: null
        }, options);

        return this.each( function() {

    		var $this 		= $(this);
			var	getImage 	= $this.find('.' + settings.imageClass);
		
			// If difference of placeholder height - image height more than 0 (or has value)
			// =============================================================================
			if(($this.height() - (getImage).height()) > 0){
				getImage.addClass(settings.overideClass);
			}

			// If difference of placeholder width - image width more than 0 (or has value)
			// ===========================================================================
			if(($this.width() - (getImage).width()) > 0){
				if(getImage.hasClass(settings.overideClass)){
					getImage.removeClass(settings.overideClass);
				}
			}

        });

    }

}(jQuery));


/*
====================================
PANEL TOOLBAR FUNCTIONS
====================================
*/
(function($) {

	"use strict";

    $.fn.panelToggle = function( ) {
        return this.click( function() {
        	var $this = $(this);
        	if($this.parents('.panel').find('.panel-body').is(':visible')){
	        	$this.parents('.panel').find('.panel-body').slideUp('fast');
	        	$this.parents('.panel').find('.panel-footer').slideUp('fast');
	        	$this.parents('.panel').find('.icon-toolbar-rotate').toggleClass('rotate');
        	}
        	else {
        		$this.parents('.panel').find('.panel-body').slideDown('fast');
        		$this.parents('.panel').find('.panel-footer').slideDown('fast');
	        	$this.parents('.panel').find('.icon-toolbar-rotate').toggleClass('rotate');
        	}
        });
    }

    $.fn.panelClose = function( ) {
        return this.click( function() {
        	var $this = $(this);
	        $this.parents('.panel').fadeOut(300);
        });
    }

    $.fn.panelRefresh = function( ) {
        return this.click( function() {
        	var $this = $(this);
	        $this.parents('.panel').block({ 
                message: '<div class="panel-loading"></div>',
           	 	timeout: 2000,
           	 	overlayCSS: {
	                backgroundColor: '#fff',
	                opacity: 0.6,
	                cursor: 'wait'
	            },
	            css: {
	                border: 0,
	                padding: 0,
	                backgroundColor: 'none'
	            }
            }); 

        });
    }

}(jQuery));


/*
====================================
REGENERATE PASSWORD
====================================
*/
function randString(id){

	"use strict";

	var dataSet 	= $(id).attr('data-character-set').split(',');  
	var possible 	= '';
	if($.inArray('a-z', dataSet) >= 0){
		possible += 'abcdefghijklmnopqrstuvwxyz';
	}
	if($.inArray('A-Z', dataSet) >= 0){
		possible += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	}
	if($.inArray('0-9', dataSet) >= 0){
		possible += '0123456789';
	}
	if($.inArray('#', dataSet) >= 0){
		possible += '![]{}()%&*$#^<>~@|';
	}
	var text = '';
	for(var i=0; i < $(id).attr('data-size'); i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;

}(jQuery);



