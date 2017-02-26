import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Main from './components/Main'
import { Landing, Home, Online, Split } from './components/layout'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import store from './stores/store'

const initialState = window.__PRELOADED_STATE__

const app = (
	<Provider store={ store.configureStore(initialState) }>
		<Router history={browserHistory}>
			<Route path='/' component={Main}>
				<IndexRoute component={Home} />
				<Route path='/courses' component={Split} />
				<Route path='/tutorials' component={Split} />
				<Route path='/online' component={Landing} />
				<Route path='/account' component={Split} />
				<Route path='/course/:slug' component={Split} />
				<Route path='/tutorial/:slug' component={Split} />
			</Route>
		</Router>
	</Provider>
)

ReactDOM.render(app, document.getElementById('app'))