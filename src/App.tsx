import React, {useState} from 'react';
import {Container, Grid, ThemeProvider} from "@material-ui/core";
import theme from "./theme";
import Header from "./components/Header";
import Menu from "./components/Menu";
import {Tool} from "./Tool";
import {makeStyles} from "@material-ui/styles";
import ToolLayout from "./components/ToolLayout";

const useStyles = makeStyles(() => ({
    toolContainer: {
        paddingTop: 20
    },
    content: {
        display: "flex"
    }
}));

const App = () => {
    const classes = useStyles();
    const [selectedTool, setSelectedTool] = useState<Tool>();
    return (
        <ThemeProvider theme={theme}>
            <Grid container direction="column">
                <Grid item>
                    <Header/>
                </Grid>
                <Grid item className={classes.content}>
                    <Menu onClick={setSelectedTool}/>
                    {selectedTool &&
                    <Container className={classes.toolContainer}>
                        <ToolLayout title={selectedTool.name}>
                            {selectedTool.render()}
                        </ToolLayout>
                    </Container>
                    }
                </Grid>
            </Grid>
        </ThemeProvider>
    )
};

export default App;
