import React, {useEffect, useState} from 'react';
import {Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";

const JSON_FIELD_ROWS = 24;

const JsonFormatter = () => {
    const [rawJson, setRawJson] = useState<string>("");
    const [parsedJson, setParsedJson] = useState<any>();
    const [formattedJson, setFormattedJson] = useState<string>("");
    const [parsingError, setParsingError] = useState<string>("");
    const [tabSpaces, setTabSpaces] = useState<number>(2)

    useEffect(() => {
        if (!parsedJson) {
            setFormattedJson("");
            return;
        }
        setFormattedJson(JSON.stringify(parsedJson, null, tabSpaces));
    }, [parsedJson, tabSpaces])

    const handleRawJsonChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        setRawJson(value);

        if (!value) {
            setParsingError("");
            setParsedJson(undefined);
        }

        let parsedValue;
        try {
            parsedValue = JSON.parse(value);
        } catch (error) {
            setParsingError(error.message);
            setParsedJson(undefined);
            return;
        }

        setParsingError("");
        setParsedJson(parsedValue);
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container spacing={2} item>
                <Grid item xs={6}>
                    <InputLabel id="format-select-label">Format</InputLabel>
                    <Select
                        labelId="format-select-label"
                        id="format-select"
                        fullWidth
                        value={tabSpaces}
                        onChange={event => setTabSpaces(+(event.target.value as string))}
                    >
                        <MenuItem value="2">2 space tab</MenuItem>
                        <MenuItem value="3">3 space tab</MenuItem>
                        <MenuItem value="4">4 space tab</MenuItem>
                        <MenuItem value="0">Compact</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={6}>
                </Grid>
            </Grid>
            <Grid container spacing={2} item>
                <Grid item xs={6}>
                    <TextField
                        label="Raw JSON"
                        multiline
                        fullWidth
                        rows={JSON_FIELD_ROWS}
                        variant="outlined"
                        value={rawJson}
                        onChange={handleRawJsonChange}
                        error={!!parsingError}
                        helperText={parsingError}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Formatted JSON"
                        multiline
                        fullWidth
                        rows={JSON_FIELD_ROWS}
                        variant="outlined"
                        value={formattedJson}
                        onChange={() => {
                            // read only text field
                        }}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default JsonFormatter;