// JavaScript Document
var nowTemp = new Date();
var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
var checkin = $('#check_in').datepicker({
	todayHighlight: true,
    beforeShowDay: function (date) {
        return date.valueOf() >= now.valueOf();
    },
    autoclose: true

}).on('changeDate', function (ev) {
    if (ev.date.valueOf() > checkout.datepicker("getDate").valueOf() || !checkout.datepicker("getDate").valueOf()) {
        var newDate = new Date(ev.date);
        newDate.setDate(newDate.getDate() + 1);
        checkout.datepicker("update", newDate);
    }
    $('#check_out')[0].focus();
});
var checkout = $('#check_out').datepicker({
    beforeShowDay: function (date) {
        if (!checkin.datepicker("getDate").valueOf()) {
            return date.valueOf() >= new Date().valueOf();
        } else {
            return date.valueOf() > checkin.datepicker("getDate").valueOf();
        }
    },
    autoclose: true

}).on('changeDate', function (ev) {});