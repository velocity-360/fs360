jQuery(document).ready(function($){

	"use strict";

	
	// Sidebar multilevel click function menu
	// =============================================
	$('.default-sidebar-nav a').navSidebarMultiLevel();
	// Disable link if has chhildrens
	$(".default-sidebar-nav li:has(ul)").hover(function () {
		$(this).children("a").click(function () {
			return false;
		});
	});

	// Sidebar toggle on mobile < 768
	// ===============================
	$('#rs-sidebar-toggle-mobile').showSidebar({
        wrapper				: '#rs-wrapper',
        screenOverlay		: '#rs-screen-overlay',
        absoluteFooter 		: '.absolute-footer',
	});
	$('#rs-screen-overlay').hideSidebar({
        wrapper				: '#rs-wrapper',
        screenOverlay		: '#rs-screen-overlay',
        absoluteFooter 		: '.absolute-footer',
	});
	

});