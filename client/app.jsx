class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentUser: null,
			posts: [],
			currentTab: null,
      badPassword: false,
		};
	}

  // update state with post data
  dataSuccess(data) {
    this.setState({
      posts: this.parsePosts(data)
    })
  }

  // error handling
  dataError(err, feedType) {
    console.error('Failed to get ' + feedType + ' posts');
    console.error(err);
  }

  // page styling
  changeTab(feed) {
    this.setState({
      currentTab: feed
    })
  }
  
  // parse reddit JSON
	parsePosts(data) {
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

  // ajax call for post data
	getRelevantFeed(feed) {
		if (feed === 'top') {
			this.changeTab(feed);
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
			this.changeTab(feed);
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
			this.changeTab(feed);
      if (this.state.currentUser !== null) {
  			$.ajax({
  				url: '/saved',
  				method: 'GET',
  				headers: {
  					'username': this.state.currentUser
  				},
  				success: (data) => {
            this.setState({
              posts: JSON.parse(data)
            })
  				},
  				error: (err) => {
  					this.dataError(err, feed);
  				},
  			});
      } else {
        this.setState({
          posts:[{title: 'Log in to see saved posts'}]
        })
      }
		} else {
			console.error('Unexpected feed. Expected values are \'top\', \'hot\', and \'saved\'.')
		}
	}

  badPassword() {
    if (this.state.badPassword) {
      return (
        <span><b>Username and password do not match</b></span>
      );
    }
  }

  // sign in / logout rendering logic
	getLoginForm() {
	  if (this.state.currentUser !== null) {
	    return (
	    	<span className='logged-in-text'>
	    		Logged in as <b><em>{this.state.currentUser}</em></b><br/>
	    		<button className='btn-logout' onClick={this.logout.bind(this)}>Logout</button>
	    	</span>
	    );
	  } else {
	    return (
	      <span>
		      <form className='login-form'>
		        Username: <input className='login-username' type='text' name='username' /><br/>
		        Password: <input className='login-password' type='password' name='password' /><br/>
		        <button className='btn-login' onClick={this.signin.bind(this)}>Sign in</button>
		      </form>
	      </span>
	    );
	  }
	}

	signin(e) {
	  e.preventDefault();
	  $.ajax({
	    url: '/user',
	    method: 'GET',
	    data: JSON.stringify({
	      username: $('.login-username').val(),
	      password: $('.login-password').val()
	    }),
	    contentType: 'application/json',
	    success: (data) => {
	      if (data === $('.login-username').val()) {  
  	      this.setState({
            currentUser: data,
            badPassword: false
          });
        } else {
          this.setState({
            badPassword: true
          });
        }
	    },
	    error: (err) => {
	      console.error('login failed: ', err);
	    }
	  });
	}

	logout() {
		this.setState({
			currentUser: null,
      posts: [],
      currentTab: null
		})
	}

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

		let selectedTab = {
      display: "inline-block",
      padding: "0.9em",
      backgroundColor: "red",
      color: "white",
      borderRadius: "8px 8px 0 0",
      border: "1px solid black",
      borderBottom: "0",
      marginRight: "0.2em",
      cursor: "pointer",
    };

		return (
			<div className='app'>
        {this.badPassword()}
				{this.getLoginForm()}
				<h1>RedditClient</h1>
				<div className='app-navigation'>
					<div className='navigation-top-button' style={this.state.currentTab === 'top' ? selectedTab : tabStyle} onClick={() => this.getRelevantFeed('top')}>
						Top
					</div>
					<div className='navigation-hot-button' style={this.state.currentTab === 'hot' ? selectedTab : tabStyle} onClick={() => this.getRelevantFeed('hot')}>
						Hot
					</div>
					<div className='navigation-saved-button' style={this.state.currentTab === 'saved' ? selectedTab : tabStyle} onClick={() => this.getRelevantFeed('saved')}>
						Saved
					</div>
				</div>
				<div className='app-feed'>
				  <Feed posts={this.state.posts} user={this.state.currentUser} />
				</div>
			</div>
		);
	}
}

window.App = App;
