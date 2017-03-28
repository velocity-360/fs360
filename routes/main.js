var express = require('express')
var router = express.Router()
var utils = require('../utils')

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
	var data = {}
	controllers.account.currentUser(req)
	.then(function(currentUser){
		data['currentUser'] = currentUser // can be null
		return controllers.tutorial.find({limit:6})
	})
	.then(function(tutorials){
		data['tutorials'] = tutorials
	    res.render('home', data)
	})
	.catch(function(err){
	    res.render('home', data)
	})
})

router.get('/account', function(req, res, next) {
	var initialData = initial()
	var initialState = null

	controllers.account.currentUser(req)
	.then(function(currentUser){
		initialData['account'] = {currentUser: currentUser}
		initialData['session'] = {selectedMenuItem: 'account'}
		return controllers.tutorial.find({subscribers: currentUser.id})
//		return controllers.tutorial.find({})
	})
	.then(function(tutorials){
		var tutorialReducer = {
			all: tutorials
		}

		tutorials.forEach(function(tutorial, i){
			tutorialReducer[tutorial.id] = tutorial
			tutorialReducer[tutorial.slug] = tutorial
		})

		initialData['tutorial'] = tutorialReducer

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
		var template = (process.env.ENVIRONMENT == 'prod') ? 'index' : 'index-dev'
	    res.render(template, {
	    	react: html,
	    	preloadedState:JSON.stringify(initialState.getState())
	    })
	})	
	.catch(function(err){ // TODO: Handle Error
		console.log('ERROR: '+err)

	})
})


router.get('/blog', function(req, res, next) {
	var url = process.env.MICROSERVICES_URL+'/api/post'

	var data = {}
	controllers.account.currentUser(req)
	.then(function(currentUser){
		data['currentUser'] = currentUser // can be null
		return utils.Request.get(url, {limit:3, type:'original', site:process.env.SITE_ID}) // fetch most recent 3 posts for sidebar
	})
	.then(function(response){
		// console.log('POSTS: '+JSON.stringify(response))
		data['posts'] = response.results
	    res.render('blog', data)
	})
	.catch(function(err){
		console.log('ERROR: '+err.message)
	    res.render('blog', data)
	})
})

router.get('/:page', function(req, res, next) {
	var page = req.params.page // 'courses', 'tutorials', 'account'
	if (page == 'tracker'){
		next()
		return
	}

	var data = {}
	controllers.account.currentUser(req)
	.then(function(currentUser){
		data['currentUser'] = currentUser // can be null
		var controller = controllers[page]
		return controller.find({})
	})
	.then(function(entities){
		data[page] = entities
	    res.render(page, data)
	})
	.catch(function(err){
	    res.render(page, data)
	})
})

router.get('/post/:slug', function(req, res, next) {
	var url = process.env.MICROSERVICES_URL+'/api/post'

	var data = {}
	controllers.account.currentUser(req)
	.then(function(currentUser){
		data['currentUser'] = currentUser // can be null
		return utils.Request.get(url, {limit:1, slug:req.params.slug, site:process.env.SITE_ID}) // fetch most recent 3 posts for sidebar
	})
	.then(function(response){
		data['post'] = response.results[0]
		data['tags'] = {
			title: data.post.title,
			url: 'https://www.velocity360.io/post/'+data.post.slug,
			image: data.post.images,
			description: data.post.preview
		}

		return controllers.tutorial.find({limit:6}) // fetch tutorials
	})
	.then(function(tutorials){
		data['tutorials'] = tutorials
	    res.render('post', data)
	})
	.catch(function(err){
		console.log('ERROR: '+err.message)
	    res.render('post', data)
	})
})

router.get('/:page/:slug', function(req, res, next) {
	var page = req.params.page
	var slug = req.params.slug

	if (page == 'api' || page == 'admin' || page == 'account' || page == 'tracker' || page == 'premium'){
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
				title: entity.title || entity.name,
				url: 'https://www.velocity360.io/'+page+'/'+entity.slug,
				image: 'https://media-service.appspot.com/site/images/'+entity.image+'?crop=260',
				description: description
			}
		}

		return matchRoutes(req, routes)
	})
	.then(function(renderProps){
		var html = ReactDOMServer.renderToString(React.createElement(ReactRouter.RouterContext, renderProps))
		var template = (process.env.ENVIRONMENT == 'prod') ? 'index' : 'index-dev'
	    res.render(template, {
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
