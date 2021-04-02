import React, {useState} from 'react';
import {Grid, TextField, Typography} from "@material-ui/core";
import parse from 'url-parse';
import URLParse from 'url-parse';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const UrlParser = () => {

    const [urlFieldValue, setUrlFieldValue] = useState("");
    const [urlError, setUrlError] = useState("");
    const [url, setUrl] = useState<URLParse>();

    const handleUrlFieldValueChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        setUrlFieldValue(value);
        try {
            setUrl(parse(value, true));
            setUrlError("");
        } catch (e) {
            setUrl(undefined);
            setUrlError(e.message);
        }
    };

    return <Grid container direction="column" spacing={2}>
        <Grid container spacing={2} item>
            <Grid item xs={12}>
                <TextField
                    label="URL"
                    fullWidth
                    variant="outlined"
                    value={urlFieldValue}
                    error={!!urlError}
                    helperText={urlError}
                    onChange={handleUrlFieldValueChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField label="Hash" value={url?.hash || ""} fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Host" value={url?.host || ""} fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Hostname" value={url?.hostname || ""} fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Href" value={url?.href || ""} fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Origin" value={url?.origin || ""} fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Password" value={url?.password || ""} fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Pathname" value={url?.pathname || ""} fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Port" value={url?.port || ""} fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Protocol" value={url?.protocol || ""} fullWidth/>
            </Grid>
            <Grid item xs={12}>
                <Typography>Query</Typography>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Key</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {url && url.query && Object.entries(url.query)
                                .map(entry => (
                                    <TableRow>
                                        <TableCell>{entry[0]}</TableCell>
                                        <TableCell>{entry[1]}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12}>
                <TextField label="Username" value={url?.username || ""} fullWidth/>
            </Grid>
        </Grid>
    </Grid>;
};

export default UrlParser;