import React from 'react';
import {Grid, ThemeProvider} from "@material-ui/core";
import theme from "./theme";
import Header from "./components/Header";

const App = () => (
    <ThemeProvider theme={theme}>
        <Grid container direction="column">
            <Grid item>
                <Header/>
            </Grid>
            <Grid item container>
            </Grid>
        </Grid>
    </ThemeProvider>
);

export default App;
