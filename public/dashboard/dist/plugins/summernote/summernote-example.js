// Summernotes
// ===========
if($('.summernote-fixed-height').length) {
	$('.summernote-fixed-height').summernote({
		height: 300,
		dialogsInBody: true,
		dialogsFade: true
	});
}

if($('.summernote-auto').length) {
	$('.summernote-auto').summernote({
		dialogsInBody: true,
		dialogsFade: true
	});
}

if($('.summernote-airmode').length) {
	$('.summernote-airmode').summernote({
		height: 300,
		tabsize: 2,
		airMode: true,
		dialogsInBody: true,
		dialogsFade: true
	});
}