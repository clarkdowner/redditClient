class Post extends React.Component {
	 constructor(props) {
    super(props);
  }
  
	render() {
		return (
			<div className='post'>
				<button className='save-post-button'></button>
				<div className='post-content'>
					<div className='post-media'>
						<img src={props.post.thumbnail} />
					</div>
					<div className='post-metadata'>
						<div className='post-title'>
							{props.post.title}
						</div>
						<div className='post-comment-count'>
							{props.post.commentCount}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

window.Post = Post;
// export default Post;
