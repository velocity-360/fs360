import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './stores/store'
import Main from './components/Main'


class App extends React.Component {

	constructor(props, context) {
		super(props, context);
		// this.updateVisitor = this.updateVisitor.bind(this);
		// this.signUp = this.signUp.bind(this);
		this.refreshData = this.refreshData.bind(this);
		// this.selectLocation = this.selectLocation.bind(this);

//		this.changeContent = this.changeContent.bind(this);
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


