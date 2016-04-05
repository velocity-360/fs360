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
		var path = window.location.pathname.replace('/', ''); // http://localhost:3000/
//		console.log('PATH = ' + path);

		var page = 'home';
		var slug = null;
		if (path.length > 0){
			var parts = path.split('/');
			page = parts[0];
			if (parts.length > 1)
				slug = parts[1];
		}

		this.setState({
			page: page,
			slug: slug
		});
	}

	componentDidMount(){

	}


	refreshData(){

	}

	render(){
		return (
			<Main page={this.state.page} slug={this.state.slug} />
		)
	}
}

ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>	
), document.getElementById('app'));



