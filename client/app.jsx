class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: null,
			// posts: [],
			// render dummy data
			posts: [
			{
				thumbnail: 'https://i.redditmedia.com/cYidbHscdtzbVO41NcrzMG7ql12oclgYsogzoyI_soQ.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=108&amp;s=9aa457aca3c516907dbe2c826c0ddaee',
				title: 'Says Who?',
				commentCount: 100,
			},
			{
				thumbnail: 'https://i.redditmedia.com/cYidbHscdtzbVO41NcrzMG7ql12oclgYsogzoyI_soQ.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=108&amp;s=9aa457aca3c516907dbe2c826c0ddaee',
				title: 'Cows aren\'t blue',
				commentCount:200,
			},
			{
				thumbnail: 'https://i.redditmedia.com/cYidbHscdtzbVO41NcrzMG7ql12oclgYsogzoyI_soQ.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=108&amp;s=9aa457aca3c516907dbe2c826c0ddaee',
				title: 'Super Cool Post',
				commentCount:500,
			},
			]
		};
	}

	// getRelevantFeed(feed) {
	// 	// getRelevantFeed to be written elsewhere
	// 	let posts = getRelevantFeed(feed);

	// 	this.setState({
	// 		posts: posts
	// 	});
	// }

	// componentWillMount() {
	// 	getRelevantFeed('top');
	// }

	render() {
		return (
			<div className='app'>
				<div className='app-navigation'>
					<Navigation />
				</div>
				<div className='app-feed'>
				  <Feed posts={this.state.posts}/>
				</div>
			</div>
		);
	}
}

window.App = App;
// export default App;
