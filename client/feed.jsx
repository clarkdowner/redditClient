class Feed extends React.Component {
	 constructor(props) {
    super(props);
  }
  
	render() {
		return (
			<div className='feed'>
				<div className='feed-posts'>
					{props.posts.map(post => <Post post={post} />)}
				</div>
			</div>
		);
	}
}

window.Feed = Feed;
// export default Feed;
