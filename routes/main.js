var express = require('express')
var router = express.Router()
var TextUtils = require('../utils/TextUtils')

var React = require('react')
var ReactRouter = require('react-router')
var ReactDOMServer = require('react-dom/server')

// // React:
var serverapp = require('../public/dist/es5/serverapp')
var store = require('../public/dist/es5/stores/store')
var initial = require('../public/dist/es5/reducers/initial') // default values for all reducesrs

var layout = require('../public/dist/es5/components/layout')


// router.get('/', function(req, res, next) {
	// var initialData = initial()

	// accountController.currentUser(req)
	// .then(function(currentUser){
	// 	if (currentUser != null)
	// 		initialData.profileReducer.currentUser = currentUser

	// 	return courseController.find({}) // fetch all courses for nav bar
	// })
// 	.then(function(courses){
// 		initialData.courseReducer.courseArray = courses
// 		return eventController.find({limit:3})
// 	})
// 	.then(function(events){
// 		initialData.eventReducer.eventArray = events

		// var initialState = store.configureStore(initialData).getState()
		// var element = React.createElement(ServerApp, {page:'home', initial:initialState})
		// res.render('index', {react: ReactDOMServer.renderToString(element), preloadedState:JSON.stringify(initialState)})
// 	})
// 	.catch(function(err){
		// console.log('ERROR: '+err)
// 	})
// })

var controllers = require('../controllers')

matchRoutes = function(req, routes){
	return new Promise(function(resolve, reject){
		ReactRouter.match({ routes, location: req.url }, function(error, redirectLocation, renderProps){
			if (error){
				reject(error)
				return
			}

			// if (redirectLocation){
			// 	return
			// }

			resolve(renderProps)
		})
	})
}

router.get('/', function(req, res, next) {
	var initialData = initial()
	var initialState = null

	controllers.account.currentUser(req)
	.then(function(currentUser){ // can be null
//		console.log('currentUser: '+JSON.stringify(currentUser))
		initialData['account'] = {currentUser: currentUser}
		initialState = store.configureStore(initialData)
		var routes = {
			path: '/',
			component: serverapp,
			initial: initialState,
			indexRoute: {
				component: layout.Home
			}
		}

		return matchRoutes(req, routes)
	})
	.then(function(renderProps){
		var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
	    res.render('index', {
	    	react: html,
	    	preloadedState:JSON.stringify(initialState.getState())
	    })
	})
	.catch(function(err){
		console.log('ERROR: '+err)
	})
})

router.get('/:page', function(req, res, next) {
	var page = req.params.page // 'courses', 'online', 'account'
	if (page == 'tracker'){
		next()
		return
	}

	var initialData = initial()
	var initialState = null

	controllers.account.currentUser(req)
	.then(function(currentUser){
		initialData['account'] = {currentUser: currentUser}
		initialData['session'] = {selectedMenuItem: page}

		initialState = store.configureStore(initialData)

		var routes = {
			path: '/'+page,
			component: serverapp,
			initial: initialState,
			indexRoute: {
				component: layout.Split
			}
		}

		return matchRoutes(req, routes)
	})
	.then(function(renderProps){
		var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
	    res.render('index', {
	    	react: html,
	    	preloadedState:JSON.stringify(initialState.getState())
	    })
	})	
	.catch(function(err){ // TODO: Handle Error
		console.log('ERROR: '+err)

	})
})


router.get('/:page/:slug', function(req, res, next) {
	var initialData = initial()
	var page = req.params.page
	var slug = req.params.slug

	if (page == 'api' || page == 'admin' || page == 'account' || page == 'tracker'){
		next()
		return
	}

	var user = null
	accountController.currentUser(req)
	.then(function(currentUser){ // can be null
		if (currentUser != null)
			initialData.profileReducer.currentUser = currentUser

		return courseController.find({}) // fetch all courses for nav bar
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

		if (page == 'tutorial'){
			initialData.tutorialReducer.tutorials[entity.slug] = entity
		}

		if (page == 'video'){
			initialData.courseReducer.courses[entity.slug] = entity
		}

		if (page == 'project')
			initialData.projectReducer.projectsArray = [entity]

		if (page == 'event'){
			initialData.eventReducer.eventArray = [entity]
			initialData.eventReducer.events[entity.slug] = entity
		}

		if (page == 'post'){
			initialData.postReducer.postsArray = [entity]
			initialData.postReducer.posts[entity.slug] = entity
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
		console.log('ERROR: '+err)
	})
})


module.exports = router
