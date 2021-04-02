import React, {useState} from 'react';
import {Grid, TextField} from "@material-ui/core";

const TEXT_FIELD_ROWS = 26;

const Base64Encoder = () => {
    const [text, setText] = useState("");
    const [encoded, setEncoded] = useState("");
    const [encodedError, setEncodedError] = useState("");

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        setText(value);
        setEncoded(btoa(value));
    };

    const handleEncodedChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        setEncoded(value);
        try {
            setText(atob(value));
            setEncodedError("");
        } catch (e) {
            setText("");
            setEncodedError(e.message);
        }
    };

    return <Grid container direction="column" spacing={2}>
        <Grid container spacing={2} item>
            <Grid item xs={6}>
                <TextField
                    label="Text"
                    multiline
                    fullWidth
                    rows={TEXT_FIELD_ROWS}
                    variant="outlined"
                    value={text}
                    onChange={handleTextChange}
                />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    label="Encoded"
                    multiline
                    fullWidth
                    rows={TEXT_FIELD_ROWS}
                    variant="outlined"
                    value={encoded}
                    error={!!encodedError}
                    helperText={encodedError}
                    onChange={handleEncodedChange}
                />
            </Grid>
        </Grid>
    </Grid>;
};

export default Base64Encoder;