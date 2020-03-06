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
	input: {
		display: 'none',
	},
	cardContent: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		justifyContent: 'center',
		textAlign: 'center',
	},
	bodyContent: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 'calc(100% - 5rem)',
	},
	body: {
		width: '100%',
		height: '100vh',
		margin: '0',
		padding: '0',
	},
	bodyNoNav: {
		width: '100%',
		height: '100vh',
		margin: '0',
		padding: '0',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		alignItems: 'center',
	},
	templateCards: {
		width: '15rem',
		height: '25rem',
	},
	coverImage: {
		hight: '150px',
		width: '150px',
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
		padding: '1rem',
	},
	accountView: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '5rem',
	},
	genreCard: {
		width: 'auto',
		height: '4rem',
		display: 'flex',
		justifyContent: 'center',
	},
	songAlbumView: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: '5rem',
	},
	songAlbumInfo: {
		flexDirection: 'column',
		display: 'flex',
		justifyContent: 'center',
	},
	songAlbumIcon: {
		display: 'flex',
		flexDirection: 'row',
		objectFit: 'fill',
		paddingBottom: '3rem',
	},
	songAlbumImg: {
		width: '300px',
		height: '300px',
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
		marginLeft: '5rem',
		marginRight: '5rem',
	},
	albumCard: {
		margin: '1rem',
	},
}));
