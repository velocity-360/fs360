$(document).ready(function () {

	if($('#defaultconfig').length) {
		$('#defaultconfig').maxlength();
	}

	if($('#thresholdconfig').length) {
		$('#thresholdconfig').maxlength({
			threshold: 4
		});
	}

	if($('#moreoptions').length) {
		$('#moreoptions').maxlength({
			alwaysShow: true,
			warningClass: "label label-success",
			limitReachedClass: "label label-danger"
		});
	}

	if($('#alloptions').length) {
		$('#alloptions').maxlength({
			alwaysShow: true,
			warningClass: "label label-warning",
			limitReachedClass: "label label-danger",
			separator: ' out of ',
			preText: 'You typed ',
			postText: ' chars available.',
			validate: true
		});
	}

	if($('#textarea').length) {
		$('#textarea').maxlength({
			alwaysShow: true
		});
	}

	if($('#placement').length) {
		$('#placement') .maxlength({
			alwaysShow: true,
			placement: 'top-left'
		});
	}
});