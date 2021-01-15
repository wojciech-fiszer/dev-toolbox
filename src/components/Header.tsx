import React from 'react';
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles(() => ({
    toolbar: {
        display: "flex",
        justifyContent: "space-between"
    }
}));

const Header = () => {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography>dev-toolbox</Typography>
                <IconButton aria-label="Github"
                            onClick={() => window.open('https://github.com/wojciech-fiszer/dev-toolbox')}>
                    <GitHubIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}

export default Header;