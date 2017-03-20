
$(document).ready(function () {

			// Cleave (Input Formatter)
			// -------------------------
			// credit card
			if($('.cleave-input-cc').length) {
				var cleaveCreditCard = new Cleave('.cleave-input-cc', {
					creditCard: true
				});
			}
			if($('.cleave-button-cc').length) {
				document.querySelector('.cleave-button-cc').addEventListener('click', function() {
					alert(cleaveCreditCard.getRawValue());
				});
			}

			// phone
			if($('.cleave-input-phone').length) {
				var cleavePhone = new Cleave('.cleave-input-phone', {
					phone: true,
					phoneRegionCode: 'AU'
				});
			}

			// date
			if($('.cleave-input-date').length) {
				var cleaveDate = new Cleave('.cleave-input-date', {
					date: true
				});
			}

			// numeral
			if($('.cleave-input-numeral').length) {
				var cleaveNumeral = new Cleave('.cleave-input-numeral', {
					numeral: true,
					numeralThousandsGroupStyle: 'thousand'
				});
			}

			// custom
			if($('.cleave-input-custom').length) {
				var cleaveCustom = new Cleave('.cleave-input-custom', {
					blocks: [3, 3, 3, 3],
					delimiter: '-',
				});
			}

			if($('.cleave-input-cc-custom').length) {
				var cleaveCreditCardCustom = new Cleave('.cleave-input-cc-custom', {
					creditCard: true,
					onCreditCardTypeChanged: function (type) {
						document.querySelector('.cc-type').innerHTML = type;
					}
				});
			}

			if($('.cleave-input-date-custom').length) {
				var cleaveDateCustom = new Cleave('.cleave-input-date-custom', {
					date: true,
					datePattern: ['Y', 'm', 'd'],
					delimiter: '.'
				});
			}

			if($('.cleave-input-numeral-custom').length) {
				var cleaveNumeralCustom = new Cleave('.cleave-input-numeral-custom', {
					numeral: true,
					numeralDecimalMark: ',',
					delimiter: '.'
				});
			}

			if($('.cleave-input-dollar').length) {
				var cleaveDollar = new Cleave('.cleave-input-dollar', {
					numeral: true,
					prefix: '$'
				});
			}

			if($('.cleave-multi-delimiter').length) {
				var cleaveMutilDelimiters = new Cleave('.cleave-multi-delimiter', {
					uppercase: true,
					delimiters: ['.', '.', '-'],
					blocks: [3, 3, 3, 2]
				});
			}

			if($('.cleave-input-prefix').length) {
				var cleavePrefix = new Cleave('.cleave-input-prefix', {
					uppercase: true,
					delimiter: '',
					prefix: 'UFO',
				    blocks: [3, 6] // or [9]
				});
			}

			if($('.cleave-input-prefix-delimiter').length) {
				var cleavePrefixDelimiter = new Cleave('.cleave-input-prefix-delimiter', {
					numericOnly: true,
					delimiter: '.',
					prefix: 'BE',
					blocks: [5, 3, 3]
				});
			}

			if($('.cleave-input-prefix-edit').length) {
				var cleavePrefixEdit = new Cleave('.cleave-input-prefix-edit', {
					uppercase: true,
					delimiter: '-',
					blocks: [6, 2, 3, 3]
				});
			}

			if($('.cleave-input-multiple-chars').length) {
				var cleaveMultipleChars = new Cleave('.cleave-input-multiple-chars', {
					uppercase: true,
					delimiters: [' ', '|', ' ', ' ', '|', ' ', ' ', '|', ' '],
					blocks: [3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0]
				});
			}

		});