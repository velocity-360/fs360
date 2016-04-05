import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './stores/store'
import Main from './components/Main'


class App extends Component {

	constructor(props, context) {
		super(props, context);
		this.refreshData = this.refreshData.bind(this);
		this.state = {
			page: null,
			slug: null
		};
	}

	initialState(){
		return {
			page: null,
			slug: null
		}

	}

	componentWillMount(){

	}

	componentDidMount(){

	}


	refreshData(){

	}

	render(){
		return (
			<Provider store={store}>
				<Main page={this.props.page} slug={this.props.slug} />
			</Provider>				
		)
	}
}

export default App


