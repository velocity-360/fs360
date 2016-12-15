import React, { Component } from 'react'
import Main from './components/Main'
import { Provider } from 'react-redux'

class App extends Component {
	render(){
		return (
			<Provider store={this.props.route.initial}>
				<Main {...this.props} />
			</Provider>
		)
	}
}

export default App
