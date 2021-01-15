import React from 'react';
import {List, ListItem, ListItemText} from "@material-ui/core";
import tools from "../tools";
import {makeStyles} from "@material-ui/styles";
import {Tool} from "../Tool";

interface Props {
    onClick: (tool: Tool) => void;
}

const useStyles = makeStyles(() => ({
    list: {
        minWidth: 200
    }
}));

const Menu = ({onClick}: Props) => {
    const classes = useStyles();
    return (
        <List component="nav" className={classes.list}>
            {tools.map(tool => (
                <ListItem button>
                    <ListItemText primary={tool.name} onClick={() => onClick(tool)}/>
                </ListItem>
            ))}
        </List>
    );
};

export default Menu;