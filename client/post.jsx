class Post extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      notice: false,
      saved: false
    }

    this.savePost = this.savePost.bind(this);
  }

  savePost() {
  	if (this.props.user !== null) {
	  	$.ajax({
        url: '/post',
        method: 'GET',  
        headers: {
          username: this.props.user,
          postContent: encodeURI(JSON.stringify(this.props.post))
        },
        success: (data) => {
          this.setState({
            saved: true
          })
        },
        error: (err) => {
          console.error('could not save post: ', err);
        },
      });
  	} else {
  		this.setState({
        notice: true
      });
  	}
  }

  loginNotice() {
    if (!this.state.notice) {
      return (
        <span></span>
      );
    } else {
      return (
        <span>Log in to save posts</span>
      );
    }
  }

  buttonText() {
    if (this.state.saved) {
      return (
        <span>Saved!</span>
      );
    } else {
      return (
        <span>Save Post</span>
      );
    }
  }

	render() {
		return (
			<div className='post' style={{margin: "1%", background: "aliceblue"}}>
				<button className='save-post-button' onClick={this.savePost} style={{display: "inline-block", width: "15%"}}>{this.buttonText()}</button>
				{this.loginNotice()}
				<div className='post-content' style={{display: "inline-block", width: "85%"}}>
					<div className='post-media' style={{display: "inline-block", width: "30%"}}>
						<a href={this.props.post.url}><img src={this.props.post.thumbnail.length > 8 ? this.props.post.thumbnail : 'assets/reddit.png'} /></a>
					</div>
					<div className='post-metadata' style={{display: "inline-block", width: "70%"}}>
						<div className='post-title'>
							<a href={this.props.post.url}>{decodeURI(this.props.post.title)}</a>
						</div>
						<div className='post-comment-count'>
              <br/>
							<a href={this.props.post.url}>{this.props.post.commentCount} comments</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

window.Post = Post;
