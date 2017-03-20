

	$('.rs-selectize-tags').selectize({
		persist: false,
		createOnBlur: true,
		create: true
	});

	$('.rs-selectize-optgroup').selectize({
		sortField: 'text',
		create: true
	});

	$('.rs-selectize-single').selectize({
		create: true,
		sortField: {
			field: 'text',
			direction: 'asc'
		}
	});

	$('.rs-selectize-programmatic').selectize({
		options: [
			{class: 'mammal', value: "dog", name: "Dog" },
			{class: 'mammal', value: "cat", name: "Cat" },
			{class: 'mammal', value: "horse", name: "Horse" },
			{class: 'mammal', value: "kangaroo", name: "Kangaroo" },
			{class: 'bird', value: 'duck', name: 'Duck'},
			{class: 'bird', value: 'chicken', name: 'Chicken'},
			{class: 'bird', value: 'ostrich', name: 'Ostrich'},
			{class: 'bird', value: 'seagull', name: 'Seagull'},
			{class: 'reptile', value: 'snake', name: 'Snake'},
			{class: 'reptile', value: 'lizard', name: 'Lizard'},
			{class: 'reptile', value: 'alligator', name: 'Alligator'},
			{class: 'reptile', value: 'turtle', name: 'Turtle'}
		],
		optgroups: [
			{value: 'mammal', label: 'Mammal', label_scientific: 'Mammalia'},
			{value: 'bird', label: 'Bird', label_scientific: 'Aves'},
			{value: 'reptile', label: 'Reptile', label_scientific: 'Reptilia'}
		],
		optgroupField: 'class',
		labelField: 'name',
		searchField: ['name'],
		render: {
			optgroup_header: function(data, escape) {
				return '<div class="optgroup-header">' + escape(data.label) + ' <span class="scientific">' + escape(data.label_scientific) + '</span></div>';
			}
		}
	});



	var REGEX_EMAIL = '([a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@' +
	                  '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)';

	var formatName = function(item) {
		return $.trim((item.first_name || '') + ' ' + (item.last_name || ''));
	};

	$('.rs-selectize-email-contact').selectize({
		persist: false,
		maxItems: null,
		valueField: 'email',
		labelField: 'name',
		searchField: ['first_name', 'last_name', 'email'],
		sortField: [
			{field: 'first_name', direction: 'asc'},
			{field: 'last_name', direction: 'asc'}
		],
		options: [
			{email: 'nikola@tesla.com', first_name: 'Nikola', last_name: 'Tesla'},
			{email: 'brian@thirdroute.com', first_name: 'Brian', last_name: 'Reavis'},
			{email: 'someone@gmail.com'}
		],
		render: {
			item: function(item, escape) {
				var name = formatName(item);
				return '<div>' +
					(name ? '<span class="name">' + escape(name) + '</span>' : '') +
					(item.email ? '<span class="email">' + escape(item.email) + '</span>' : '') +
				'</div>';
			},
			option: function(item, escape) {
				var name = formatName(item);
				var label = name || item.email;
				var caption = name ? item.email : null;
				return '<div>' +
					'<span class="label">' + escape(label) + '</span>' +
					(caption ? '<span class="caption">' + escape(caption) + '</span>' : '') +
				'</div>';
			}
		},
		createFilter: function(input) {
			var regexpA = new RegExp('^' + REGEX_EMAIL + '$', 'i');
			var regexpB = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
			return regexpA.test(input) || regexpB.test(input);
		},
		create: function(input) {
			if ((new RegExp('^' + REGEX_EMAIL + '$', 'i')).test(input)) {
				return {email: input};
			}
			var match = input.match(new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i'));
			if (match) {
				var name       = $.trim(match[1]);
				var pos_space  = name.indexOf(' ');
				var first_name = name.substring(0, pos_space);
				var last_name  = name.substring(pos_space + 1);

				return {
					email: match[2],
					first_name: first_name,
					last_name: last_name
				};
			}
			alert('Invalid email address.');
			return false;
		}
	});