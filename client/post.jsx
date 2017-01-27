class Post extends React.Component {
	constructor(props) {
    super(props);

    this.savePost = this.savePost.bind(this);
  }

  savePost() {
  	// check user

  	// if already saved
  		// remove from user
  	// else
  	  // add to user
  	console.log('save post clicked');
  }

	render() {

		let inline = {
			display: "inline-block",
		};

		return (
			<div className='post'>
				<button className='save-post-button' onClick={this.savePost} style={inline}></button>
				<div className='post-content' style={inline}>
					<div className='post-media' style={inline}>
						<img src={this.props.post.thumbnail.length > 15 ? this.props.post.thumbnail : 'assets/reddit.png'} />
					</div>
					<div className='post-metadata' style={inline}>
						<div className='post-title'>
							{this.props.post.title}
						</div>
						<div className='post-comment-count'>
							{this.props.post.commentCount} comments
						</div>
					</div>
				</div>
			</div>
		);
	}
}

window.Post = Post;
// export default Post;
