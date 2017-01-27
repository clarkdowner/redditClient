let customParse = (data) => {
	let posts = [];

	data.data.children.map(post => {
		let postData = {};
		postData.id = post.data.id;
		postData.thumbnail = post.data.thumbnail;
		postData.title = post.data.title;
		postData.commentCount = post.data.num_comments;
		postData.url = 'https://reddit.com' + post.data.permalink;
		posts.push(postData);
	});

	return posts;
}

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: null,
			posts: [],
			// // render dummy data
			// posts: [
			// {
			// 	thumbnail: 'https://i.redditmedia.com/cYidbHscdtzbVO41NcrzMG7ql12oclgYsogzoyI_soQ.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=108&amp;s=9aa457aca3c516907dbe2c826c0ddaee',
			// 	title: 'Says Who?',
			// 	commentCount: 100,
			// 	id: 1,
			// },
			// {
			// 	thumbnail: 'https://i.redditmedia.com/cYidbHscdtzbVO41NcrzMG7ql12oclgYsogzoyI_soQ.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=108&amp;s=9aa457aca3c516907dbe2c826c0ddaee',
			// 	title: 'Cows aren\'t blue',
			// 	commentCount:200,
			// 	id: 2,
			// },
			// {
			// 	thumbnail: 'https://i.redditmedia.com/cYidbHscdtzbVO41NcrzMG7ql12oclgYsogzoyI_soQ.jpg?fit=crop&amp;crop=faces%2Centropy&amp;arh=2&amp;w=108&amp;s=9aa457aca3c516907dbe2c826c0ddaee',
			// 	title: 'Super Cool Post',
			// 	commentCount:500,
			// 	id: 3,
			// },
			// ]
		};
	}

	dataSuccess(data) {
		this.setState({
			posts: customParse(data)
		})
	}

	dataError(err, feedType) {
		console.error('Failed to get ' + feedType + ' posts');
		console.error(err);
	}

	getRelevantFeed(feed) {
		if (feed === 'top') {
			$.ajax({
				url: '/top',
				method: 'GET',
				success: (data) => {
					this.dataSuccess(data);
				},
				error: (err) => {
					this.dataError(err, feed);
				},
			});
		} else if (feed === 'hot'){
			$.ajax({
				url: '/hot',
				method: 'GET',
				success: (data) => {
					this.dataSuccess(data);
				},
				error: (err) => {
					this.dataError(err, feed);
				},
			});
		} else if (feed === 'saved') {
						$.ajax({
				url: '/saved',
				method: 'GET',
				success: (data) => {
					this.dataSuccess(data);
				},
				error: (err) => {
					this.dataError(err, feed);
				},
			});
		} else {
			console.error('Unexpected feed. Expected values are \'top\', \'hot\', and \'saved\'.')
		}
	}

	// Initialize feed with Top Posts
	// componentDidMount() {
	// 	this.getRelevantFeed('top');
	// }

	render() {

		let tabStyle = {
			display: "inline-block",
			padding: "0.9em",
			backgroundColor: "red",
			color: "white",
			borderRadius: "8px 8px 0 0",
			marginRight: "0.2em",
			cursor: "pointer",
		};

		return (
			<div className='app'>
				<div className='app-navigation'>
					<div className='navigation-top-button' style={tabStyle} onClick={() => this.getRelevantFeed('top')}>
						Top
					</div>
					<div className='navigation-hot-button' style={tabStyle} onClick={() => this.getRelevantFeed('hot')}>
						Hot
					</div>
					<div className='navigation-saved-button' style={tabStyle} onClick={() => this.getRelevantFeed('saved')}>
						Saved
					</div>
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
