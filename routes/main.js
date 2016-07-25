var express = require('express')
var router = express.Router()

var accountController = require('../controllers/AccountController')
var courseController = require('../controllers/CourseController')
var postController = require('../controllers/PostController')
var projectController = require('../controllers/ProjectController')
var eventController = require('../controllers/EventController')
var controllers = {
	courses: courseController,
	course: courseController,
	feed: postController,
	post: postController,
	events: eventController,
	event: eventController,
	landing: projectController,
	project: projectController
}

require('node-jsx').install({ extension: ".js" })
var React = require('react')
var ReactDOMServer = require('react-dom/server')

// React:
var ServerApp = require('../public/build/es5/ServerApp')
var store = require('../public/build/es5/stores/store')
var initial = require('../public/build/es5/reducers/initial') // default values for all reducesrs


router.get('/', function(req, res, next) {
	var initialData = initial()

	accountController.currentUser(req)
	.then(function(currentUser){
		if (currentUser != null)
			initialData.profileReducer.currentUser = currentUser

		return courseController.find({type:'immersive'})
	})
	.then(function(courses){
		initialData.courseReducer.courseArray = courses
//		return postController.find({limit: 3}) // three most recent blog posts
		var initialState = store.configureStore(initialData).getState()
		var element = React.createElement(ServerApp, {page:'home', initial:initialState})
		res.render('index', {react: ReactDOMServer.renderToString(element), preloadedState:JSON.stringify(initialState)})
	})
	.catch(function(err){

	})
})


router.get('/:page', function(req, res, next) {
	var initialData = initial()
	var page = req.params.page // 'courses', 'feed', 'account'

	accountController.currentUser(req)
	.then(function(currentUser){
		if (currentUser != null)
			initialData.profileReducer.currentUser = currentUser
		
		var controller = controllers[page]
		if (controller == null){ // special pages, like account page:
			var initialState = store.configureStore(initialData).getState()
			var element = React.createElement(ServerApp, {page:page, params:req.query, initial:initialState})
			res.render(page, {react: ReactDOMServer.renderToString(element), preloadedState:JSON.stringify(initialState)})
			return null
		}
		
		return controller.find(req.query)
	})
	.then(function(results){
		if (results == null)
			return

		if (results){
			if (page == 'courses')
				initialData.courseReducer.courseArray = results

			if (page == 'feed')
				initialData.postReducer.postsArray = results

			if (page == 'landing')
				initialData.projectReducer.projects = results
		}

		var initialState = store.configureStore(initialData).getState()
		var element = React.createElement(ServerApp, {page:page, params:req.query, initial:initialState})
		res.render(page, {react: ReactDOMServer.renderToString(element), preloadedState:JSON.stringify(initialState)})
		return
	})
	.catch(function(err){ // TODO: Handle Error

	})
})

router.get('/:page/:slug', function(req, res, next) {
	var initialData = initial()
	var page = req.params.page
	var slug = req.params.slug

	if (page == 'api' || page == 'admin' || page == 'account'){
		next()
		return
	}

	var user = null
	accountController.currentUser(req)
	.then(function(currentUser){ // can be null
		if (currentUser != null)
			initialData.profileReducer.currentUser = currentUser

		return courseController.find({type:'immersive'})
	})	
	.then(function(courses){ 
		initialData.courseReducer.courseArray = courses

		var controller = controllers[page]
		if (controller == null){
			var initialState = store.configureStore(initialData).getState()
			var element = React.createElement(ServerApp, {page:page, slug:slug, initial:initialState})
			res.render(page, {react: ReactDOMServer.renderToString(element), preloadedState:JSON.stringify(initialState)})
			return null
		}

		return controller.find({slug: slug})
	})
	.then(function(results){
		if (results == null)
			return
		
		if (results.length == 0){
			var initialState = store.configureStore(initialData).getState()
			var element = React.createElement(ServerApp, {page:page, slug:slug, initial:initialState})
			res.render(page, {react: ReactDOMServer.renderToString(element), preloadedState:JSON.stringify(initialState)})
			return
		}

		var entity = results[0]
		if (page == 'course'){
			initialData.courseReducer.courses[entity.slug] = entity
		}

		if (page == 'project')
			initialData.projectReducer.projectsArray = [entity]

		if (page == 'event'){
			initialData.eventReducer.eventArray = [entity]
			initialData.eventReducer[event.slug] = event

			// var eventsMap = {}
			// for (var i=0; i<results.length; i++){
			// 	var event = results[i]
			// 	eventsMap[event.slug] = event
			// }

			// initialData.eventReducer.events = eventsMap
		}

		if (page == 'post'){
			initialData.postReducer.postsArray = [entity]
			var posts = {}
			for (var i=0; i<results.length; i++){
				var post = results[i]
				posts[post.slug] = post
			}

			initialData.postReducer.posts = posts
		}


		// Facebook tags:
		var description = (entity.description == null) ? entity.text : entity.description
		if (description.length > 200)
			description = description.substring(0, 200)+'...'

		var tags = {
			title: entity.title,
			url: 'https://www.velocity360.io/'+page+'/'+entity.slug,
			image: 'https://media-service.appspot.com/site/images/'+entity.image+'?crop=260',
			description: description
		}

		var initialState = store.configureStore(initialData).getState()
		var element = React.createElement(ServerApp, {page:page, slug:slug, initial:initialState})
		res.render(page, {react: ReactDOMServer.renderToString(element), preloadedState:JSON.stringify(initialState), tags:tags})
		return
	})
	.catch(function(err){

	})
})


module.exports = router
