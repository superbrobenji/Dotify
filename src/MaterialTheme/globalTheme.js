import { makeStyles, createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#464646',
		},
		secondary: {
			main: '#dedad1',
		},
	},
});

export const useStyles = makeStyles(theme => ({
	accountIcon: {
		marginRight: '5rem',
	},
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
	card: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
		width: '25rem',
		height: 'auto',
	},
	cardContent: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	body: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100vh',
	},
	margin: {
		margin: theme.spacing(2),
	},
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
	textField: {
		width: 200,
	},
	button: {
		margin: '1rem',
	},
	accountView: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '5rem',
	},
	AccountAlbums: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '5rem',
	},
	AccountAlbumList: {
		display: 'flex',
		flexWrap: 'wrap',
		listStyle: 'none',
		justifyContent: 'center',
		alignItems: 'center',
	},
	albumCard: {
		margin: '1rem',
	},
}));
