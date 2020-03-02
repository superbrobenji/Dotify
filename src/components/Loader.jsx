import React from 'react';
import styles from '../loadercss/loader.module.css';

import { ThemeProvider } from '@material-ui/core/styles';
import { useStyles, theme } from '../MaterialTheme/globalTheme';

const Loader = () => {
	const classes = useStyles();

	return (
		<ThemeProvider theme={theme}>
			<div className={classes.body}>
				<div className={styles.ldsripple}>
					<div></div>
					<div></div>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default Loader;
