import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../router/routes';
import { signout } from '../actions/auth';

import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const mapDispatchToProps = dispatch => ({
	signout: () => dispatch(signout()),
});

const Navigation = props => {
	const useStyles = makeStyles({
		list: {
			width: 250,
		},
		fullList: {
			width: 'auto',
		},
	});

	const classes = useStyles();
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const toggleDrawer = (side, open) => event => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		setState({ ...state, [side]: open });
	};

	const sideList = side => (
		<div
			className={classes.list}
			role='presentation'
			onClick={toggleDrawer(side, false)}
			onKeyDown={toggleDrawer(side, false)}
		>
			<List>
				<ListItem button component={Link} to={ROUTES.ACCOUNT}>
					<ListItemIcon>
						<AccountCircleIcon />
					</ListItemIcon>
					<ListItemText>Account</ListItemText>
				</ListItem>
				<ListItem button component={Link} to={ROUTES.HOME}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText>Home</ListItemText>
				</ListItem>
				<ListItem button component={Link} to={ROUTES.ARTISTS}>
					<ListItemIcon>
						<PeopleIcon />
					</ListItemIcon>
					<ListItemText>Artists</ListItemText>
				</ListItem>
				<ListItem button component={Link} to={ROUTES.GENRES}>
					<ListItemIcon>
						<AudiotrackIcon />
					</ListItemIcon>
					<ListItemText>Genres</ListItemText>
				</ListItem>
				<Divider />
				<ListItem button onClick={signOut}>
					<ListItemIcon>
						<ExitToAppIcon />
					</ListItemIcon>
					<ListItemText>Sign Out</ListItemText>
				</ListItem>
			</List>
		</div>
	);

	const signOut = () => {
		props.signout();
	};

	return (
		<div>
			<Button onClick={toggleDrawer('left', true)}>
				<MenuIcon />
			</Button>
			<Drawer open={state.left} onClose={toggleDrawer('left', false)}>
				{sideList('left')}
			</Drawer>
		</div>
	);
};
export default connect(null, mapDispatchToProps)(Navigation);
