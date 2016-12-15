var accountController = require('./AccountController')
var courseController = require('./CourseController')
var postController = require('./PostController')
var projectController = require('./ProjectController')
var eventController = require('./EventController')
var tutorialController = require('./TutorialController')

module.exports = {
	account: accountController,
	courses: courseController,
	course: courseController,
	tutorial: tutorialController,
	video: courseController,
	feed: postController,
	post: postController,
	events: eventController,
	event: eventController,
	landing: projectController,
	project: projectController
}