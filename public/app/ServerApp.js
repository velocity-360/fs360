import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './stores/store'
import Main from './components/Main'


class App extends Component {

	constructor(props, context) {
		super(props, context)
		this.state = {
			page: null,
			slug: null
		}
	}

	initialState(){
		return {
			page: null,
			slug: null
		}

	}

	render(){
		const currentStore = store.configureStore(this.props.initial)

		return (
			<Provider store={currentStore}>
				<Main page={this.props.page} slug={this.props.slug} params={this.props.params} />
			</Provider>				
		)
	}
}

export default App


