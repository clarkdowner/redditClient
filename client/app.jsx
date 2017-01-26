class App extends React.Component {
	render() {
		return (
			<div className='app' style={{border: '1px solid black'}}>
				<div className='app-navigation'>
					<Navigation />
					hey there
				</div>
				<div className='app-feed'>
				  <Feed posts={posts}/>
				</div>
			</div>
		);
	}
}

window.App = App;
// export default App;
