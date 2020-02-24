import React from 'react';
import logo from '../assets/logo.svg';
import './Home.css';
import { connect } from 'react-redux';
import { dummyAction } from '../actions/dummyAction';

const mapStateToProps = state => ({
	...state,
});

const mapDispatchToProps = dispatch => ({
	dummyAction: () => dispatch(dummyAction()),
});

function Home(props) {
	const dummyAction = event => {
		props.dummyAction();
	};
	return (
		<div className='App'>
			<header className='App-header'>
				<img src={logo} className='App-logo' alt='logo' />
				<p>
					Edit <code>src/components/Home.js</code> and save to reload.
				</p>
				<a
					className='App-link'
					href='https://reactjs.org'
					target='_blank'
					rel='noopener noreferrer'
				>
					Learn React
				</a>
			</header>
			<button onClick={dummyAction}>Test redux action</button>
			<pre>{JSON.stringify(props)}</pre>
		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
