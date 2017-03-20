jQuery(document).ready(function($){

	"use strict";
		
	$('#rs-sidebar-toggle-mobile').showSidebar({
        wrapper				: '#rs-wrapper',
        screenOverlay		: '#rs-screen-overlay',
        absoluteFooter 		: '.absolute-footer'
	});
	$('#rs-screen-overlay').hideSidebar({
        wrapper				: '#rs-wrapper',
        screenOverlay		: '#rs-screen-overlay',
        absoluteFooter 		: '.absolute-footer'
	});

	$(function() {
		var mobileDevCheck = function() {

			var getWindowWidth 	= $(window).width();

			if ((isMobile.any) || (getWindowWidth < 1200)) {

				if($("#rs-wrapper").hasClass("rs-horizontal-menu")){
					$("#rs-wrapper").removeClass("rs-horizontal-menu");
				}
				
				$('.rs-sidebar-nav a').navSidebarMultiLevel();

				return false;

			}
			else if (getWindowWidth >= 1200) {

				if(!$("#rs-wrapper").hasClass("rs-horizontal-menu")){
					$("#rs-wrapper").addClass("rs-horizontal-menu");
				}

				return false;
			}
		}

		var refreshMobileCheck;

		$(window).resize(function(e) {
			clearTimeout(refreshMobileCheck);
			refreshMobileCheck = setTimeout(mobileDevCheck, 200);
		});

		mobileDevCheck();
	});

});
