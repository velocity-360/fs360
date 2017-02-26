var accountController = require('./AccountController')
var courseController = require('./CourseController')
var postController = require('./PostController')
var projectController = require('./ProjectController')
var eventController = require('./EventController')
var tutorialController = require('./TutorialController')
var profileController = require('./ProfileController')
var subscriberController = require('./SubscriberController')
var commentController = require('./CommentController')
var unitController = require('./UnitController')
var trackController = require('./TrackController')


module.exports = {
	account: accountController,
	courses: courseController,
	course: courseController,
	online: tutorialController,
	tutorial: tutorialController,
	tutorials: tutorialController,
	video: courseController,
	feed: postController,
	post: postController,
	events: eventController,
	event: eventController,
	landing: projectController,
	project: projectController,
	profile: profileController,
	subscriber: subscriberController,
	comment: commentController,
	unit: unitController,
	track: trackController
}
