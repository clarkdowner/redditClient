class Navigation extends React.Component {


	render() {
		let tabStyle = {
			display: "inline-block",
			padding: "0.9em",
			backgroundColor: "red",
			color: "white",
			borderRadius: "8px 8px 0 0",
			marginRight: "0.2em",
		};

		return (
			<div className='navigation'>
				<div className='navigation-top-button' style={tabStyle}>
					Top
				</div>
				<div className='navigation-hot-button' style={tabStyle}>
					Hot
				</div>
				<div className='navigation-saved-button' style={tabStyle}>
					Saved
				</div>
			</div>
		);
	}
}

window.Navigation = Navigation;
// export default Navigation;
