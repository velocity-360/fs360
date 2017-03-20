$(function() {

// Override defaults
// $.fn.stepy.defaults.validate 	= true;
$.fn.stepy.defaults.legend 			= false;
// $.fn.stepy.defaults.transition 	= 'fade';
// $.fn.stepy.defaults.duration 	= 150;
$.fn.stepy.defaults.backLabel 		= '<i class="fa fa-angle-left icon-btn m-r"></i>Back';
$.fn.stepy.defaults.nextLabel 		= 'Next<i class="fa fa-angle-right icon-btn m-l"></i>';

// Initialize wizard default
$('#rs-wizard-form').stepy();

// Initialize wizard with title click
$('#rs-wizard-title-click').stepy({
	titleClick: true
});

// Initialize wizard with validation
$('#rs-wizard-validation').stepy({
	validate: true,
	block: true,
	titleClick: true,
// description: false,
next: function(index) {
	if (!$('#rs-wizard-validation').validate(formvalidation)) {
		return false
	}
// if ($('[rs-form-wizard="validation"]').validate(formvalidation)) {
//     alert('wedos');
// }
}
});


// Initialize validation
var formvalidation = {
	ignore: 'input[type=hidden]', // ignore hidden fields
	rules: {
		firstname: "required",
		lastname: "required",
		username: {
			required: true,
			minlength: 4
		},
		password: {
			required: true,
			minlength: 8
		},
		confirm_password: {
			required: true,
			minlength: 8,
			equalTo: "#password"
		},
		email: {
			required: true,
			email: true
		},
		phone: 			"required",
		dob: 			"required",
		gender: 		"required",
		address01: 		"required",
		zip: 			"required",
		country: 		"required",
		ccnum: 			"required",
		cvc: 			"required",
		ccname: 		"required",
		ccdate: 		"required",
		deposit: 		"required",
		contachmethod: 	"required",
		agree: 			"required"
	},

	messages: {
		firstname: "Please enter your firstname",
		lastname: "Please enter your lastname",
		username: {
			required: "Please enter a username",
			minlength: "Your username must consist of at least 2 characters"
		},
		password: {
			required: "Please provide a password",
			minlength: "Your password must be at least 8 characters long"
		},
		confirm_password: {
			required: "Please provide a password",
			minlength: "Your password must be at least 8 characters long",
			equalTo: "Please enter the same password"
		},
		email: "Please enter a valid email address",
		agree: "Please accept our policy"
	},
	errorElement: "p",
	errorPlacement: function ( error, element ) {
		// Add the `help-block` class to the error element
		error.addClass( "help-block" );

		if (element.parents('div').hasClass('checkbox') || element.parents('div').hasClass('radio')) {
			error.appendTo( element.parent().parent().parent() );
		}

		// Inline checkboxes, radios
		else if (element.parents('label').hasClass('checkbox-inline') || element.parents('label').hasClass('radio-inline')) {
			error.appendTo( element.parent().parent() );
		}

		// Selectize
		else if (element.parents('div').hasClass('selectize')) {
			error.appendTo( element.parent() );
		}

		// Filestyle
		else if (element.hasClass('filestyle')) {
			error.appendTo( element.parent() );
		}

		// Has feedback
		else if (element.parents('div').hasClass('has-feedback')) {
			error.appendTo( element.parent() );
		}


		else {
			error.insertAfter(element);
		}
	},
	highlight: function ( element, errorClass, validClass ) {
		// $( element ).parents( ".form-group" ).addClass( "has-error" ).removeClass( "has-success" );
		$( element ).parents( ".form-group" ).addClass( "has-error" );
	},
	unhighlight: function (element, errorClass, validClass) {
		// $( element ).parents( ".form-group" ).addClass( "has-success" ).removeClass( "has-error" );
		$( element ).parents( ".form-group" ).removeClass( "has-error" );
	}
}

$('.stepy-step').find('.button-next').addClass('btn btn-primary btn-wide');
$('.stepy-step').find('.button-back').addClass('btn btn-default btn-wide');

});