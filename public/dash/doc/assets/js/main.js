$(window).load(function() {
	prettyPrint()
});

$(document).ready(function() {
	
	$('[data-toggle="tooltip"]').tooltip();


	var clipboard = new Clipboard('[gl-pre-copy]');
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
	
    $(".gd-sidebar").niceScroll({
		cursorborderradius: "0px",
		cursorborder : false,
		cursorcolor:"#000000",
		cursoropacitymax: 0.15,
	});
	
    $(".prettyprint").niceScroll({
		cursorborderradius: "0px",
		cursorborder : false,
		cursorcolor:"#000000",
		cursoropacitymax: 0.15
	});
	
	
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top - 70
                }, 500);
                return false;
            }
        }
    });
	
});