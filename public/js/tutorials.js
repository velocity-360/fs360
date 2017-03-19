var selected = 'ALL'

var selectCategory = function(event, category){
	event.preventDefault()
	// console.log('selectCategory: '+category)
	selected = category.toUpperCase()
	$('#selected').html(selected)

	$( '.review_strip_single' ).each(function(i, element){
		if (category == 'all'){
			$(element).removeClass('hidden')
		}
		else if (element.id == category){
			$(element).removeClass('hidden')
		}
		else {
			$(element).addClass('hidden')
		}
	})

    var divPosition = $('#tutorials').offset()
    $('html, body').animate({scrollTop: divPosition.top}, 'slow')
}