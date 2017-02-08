// this depends on the SweetAlert library: http://t4t5.github.io/sweetalert/

export default {

	showAlert: (message) => {

		// swal({
		// 	title: "Error!",
		// 	text: "Here's my error message!",
		// 	type: "error",
		// 	confirmButtonText: "Cool"
		// })

		// The type of the modal. SweetAlert comes with 4 
		// built-in types which will show a corresponding icon animation: "warning", "error", 
		// "success" and "info". You can also set it as "input" to get a prompt modal. It 
		// can either be put in the object under the key "type" or passed as the third parameter 
		// of the function.		

		message['type'] = 'error'
		message['confirmButtonText'] = 'Got It'
		swal(message)
	},

	showConfirmation: (message) => {
		message['type'] = 'success'
		message['confirmButtonText'] = 'OK'
		swal(message)
	}

}