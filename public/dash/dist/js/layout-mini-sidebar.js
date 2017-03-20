jQuery(document).ready(function($){

	"use strict";

	// Sidebar toggle on mobile < 768
	// ===============================
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

			if ((isMobile.any) || (getWindowWidth <= 769)) {

				if($("#rs-wrapper").hasClass("rs-mini-sidebar")){
					$("#rs-wrapper").removeClass("rs-mini-sidebar");
				}

				$('.rs-sidebar-nav a').navSidebarMultiLevel();

			}
			else if (getWindowWidth > 769) {

				if(!$("#rs-wrapper").hasClass("rs-mini-sidebar")){
					$("#rs-wrapper").addClass("rs-mini-sidebar");
				}
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