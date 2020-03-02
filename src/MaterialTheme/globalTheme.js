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
		backgroundColor: '#f4f4f4',
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
}));
