var editor01 = new MediumEditor('.medium-editor-01', {
	buttonLabels: 'fontawesome'
});
var editor02 = new MediumEditor('.medium-editor-02', {
	buttonLabels: 'fontawesome'
});
var edito03 = new MediumEditor('.medium-editor-03', {
	toolbar: {
		sticky: true,
		static: true,
		align: 'left',
		updateOnEmptySelection: true
	},
	buttonLabels: 'fontawesome'
});
var edito04 = new MediumEditor('.medium-editor-04', {
	toolbar: {
		sticky: true,
		static: true,
		align: 'center',
		updateOnEmptySelection: true
	},
	buttonLabels: 'fontawesome'
});
var edito05 = new MediumEditor('.medium-editor-05', {
	toolbar: {
		sticky: true,
		static: true,
		align: 'right',
		updateOnEmptySelection: true
	},
	buttonLabels: 'fontawesome'
});
var edito06 = new MediumEditor('.medium-editor-06', {
	toolbar: {
		buttons: [{
			name: 'bold',
			contentDefault: 'bold'
		},
		{
			name: 'italic',
			contentDefault: '<i>italic</i>'
		},
		{
			name: 'underline',
			contentDefault: '<u>underline</u>'
		},
		{
			name: 'anchor',
			contentDefault: 'link'
		}
		]
	}
});