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
	var tags = {
		title: 'Home',
		url: 'https://www.velocity360.io/',
		image: 'https://www.velocity360.io/images/logo_round_green_260.png'
	}

	controllers.account.currentUser(req)
	.then(function(currentUser){ // can be null
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
	    	tags: tags,
	    	preloadedState:JSON.stringify(initialState.getState())
	    })
	})
	.catch(function(err){
		console.log('ERROR: '+err)
	})
})

router.get('/account', function(req, res, next) {
	var initialData = initial()
	var initialState = null

	controllers.account.currentUser(req)
	.then(function(currentUser){
		initialData['account'] = {currentUser: currentUser}
		initialData['session'] = {selectedMenuItem: 'account'}

		initialState = store.configureStore(initialData)

		var routes = {
			path: '/account',
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

		var controller = controllers[page] // page can be course or tutorial
		return controller.find({})
	})
	.then(function(entities){
		var reducer = {all: []}
		entities.forEach(function(entity, i) {
			reducer[entity.id] = entity
			reducer[entity.slug] = entity
			reducer.all.push(entity)
		})

		if (page == 'online')
			initialData['tutorial'] = reducer // can be tutorial reducer

		if (page == 'courses')
			initialData['course'] = reducer // can be course reducer

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
	var page = req.params.page
	var slug = req.params.slug

	if (page == 'api' || page == 'admin' || page == 'account' || page == 'tracker'){
		next()
		return
	}

	var initialData = initial()
	var initialState = null
	var tags = null

	controllers.account.currentUser(req)
	.then(function(currentUser){
		initialData['account'] = {currentUser: currentUser}
		var controller = controllers[page] // page can be course or tutorial
		return controller.find({slug: slug})
	})
	.then(function(entities){
		var reducer = {all: null}
		entities.forEach(function(entity, i) {
//			reducer[entity.id] = entity
			reducer[entity.slug] = entity
		})

		initialData[page] = reducer
		initialState = store.configureStore(initialData)

		var routes = {
			path: '/'+page+'/:slug',
			component: serverapp,
			initial: initialState,
			indexRoute: {
				component: layout.Split
			}
		}

		if (entities.length > 0){
			// Facebook tags:
			var entity = entities[0]
			var description = entity.text || entity.description
			if (description.length > 200)
				description = description.substring(0, 200)+'...'

			tags = {
				title: entity.title,
				url: 'https://www.velocity360.io/'+page+'/'+entity.slug,
				image: 'https://media-service.appspot.com/site/images/'+entity.image+'?crop=260',
				description: description
			}
		}

		return matchRoutes(req, routes)
	})
	.then(function(renderProps){
		var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
	    res.render('index', {
	    	react: html,
	    	tags: tags,
	    	preloadedState:JSON.stringify(initialState.getState())
	    })
	})
	.catch(function(err){ // TODO: Handle Error
		console.log('ERROR: '+err)
	})
})


module.exports = router
