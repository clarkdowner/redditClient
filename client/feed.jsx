class Feed extends React.Component {
	constructor(props) {
    super(props);
  }

	render() {
		return (
			<div className='feed' style={{border: "1px solid black"}}>
				<div className='feed-posts'>
					{this.props.posts.map(post => <Post post={post} key={post.id} user={this.props.user} />)}
				</div>
			</div>
		);
	}
}

window.Feed = Feed;
