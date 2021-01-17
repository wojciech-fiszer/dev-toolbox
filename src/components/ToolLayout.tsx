import React from 'react';
import {Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";

interface Props {
    title: string;
    children: JSX.Element;
}

const useStyles = makeStyles(() => ({
    toolContent: {
        paddingTop: 20
    }
}));

const ToolLayout = ({title, children}: Props) => {
    const classes = useStyles();
    return (
        <>
            <Typography variant="h4">{title}</Typography>
            <div className={classes.toolContent}>
                {children}
            </div>
        </>
    )
};

export default ToolLayout;