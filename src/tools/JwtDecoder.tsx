import React, {useEffect, useState} from 'react';
import {Button, Grid, TextField, Typography} from "@material-ui/core";
import jwt from 'jsonwebtoken';
import {makeStyles} from "@material-ui/styles";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const TOKEN_TEXT_FIELD_ROWS = 24;

const useStyles = makeStyles(() => ({
    verificationControlWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    verificationResultWrapper: {
        display: "flex",
    },
    success: {
        color: "green"
    },
    failure: {
        color: "red"
    }
}));

const JwtDecoder = () => {
    const classes = useStyles();
    const [encoded, setEncoded] = useState<string>("");
    const [decoded, setDecoded] = useState<{ [p: string]: any } | undefined>();
    const [decodingError, setDecodingError] = useState<string>("");
    const [verified, setVerified] = useState<boolean>();
    const [secretOrPrivateKey, setSecretOrPrivateKey] = useState<string>("");
    const [secretOrPrivateKeyError, setSecretOrPrivateKeyError] = useState<string>("");
    const decodedTextFieldValue = decoded ? JSON.stringify(decoded, null, 2) : "";

    useEffect(() => setVerified(undefined), [encoded]);
    useEffect(() => setSecretOrPrivateKeyError(""), [secretOrPrivateKey]);

    const handleEncodedTokenTextFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        setEncoded(value);
        if (!value) {
            setDecoded(undefined);
            setDecodingError("");
            return;
        }
        let decoded: { [p: string]: any } | null;
        try {
            decoded = jwt.decode(value, {
                complete: true,
                json: true
            })
        } catch (error) {
            setDecoded(undefined);
            setDecodingError(error.message);
            return;
        }
        setDecoded(decoded || undefined);
        setDecodingError(decoded ? "" : "Invalid token");
    };

    const handleVerifyButtonClick = () => {
        if (!encoded) {
            return;
        }
        if (!secretOrPrivateKey) {
            setSecretOrPrivateKeyError("Required")
            return;
        }
        try {
            jwt.verify(encoded, secretOrPrivateKey)
        } catch (error) {
            setVerified(false);
            return;
        }
        setVerified(true);
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container spacing={2} item>
                <Grid item xs={6}>
                    <TextField
                        label="Encoded"
                        multiline
                        fullWidth
                        rows={TOKEN_TEXT_FIELD_ROWS}
                        variant="outlined"
                        value={encoded}
                        error={!!decodingError}
                        helperText={decodingError}
                        onChange={handleEncodedTokenTextFieldChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Decoded"
                        multiline
                        fullWidth
                        rows={TOKEN_TEXT_FIELD_ROWS}
                        variant="outlined"
                        value={decodedTextFieldValue}
                        onChange={() => {
                            // read only text field
                        }}
                    />
                </Grid>
            </Grid>
            {decoded && (<Grid container spacing={2} item>
                <Grid item xs={6}>
                    <TextField
                        label={decoded.header.alg.startsWith("HS") ? "Secret" : "Private key"}
                        multiline
                        fullWidth
                        rows={4}
                        variant="outlined"
                        value={secretOrPrivateKey}
                        onChange={event => setSecretOrPrivateKey(event.target.value)}
                        error={!!secretOrPrivateKeyError}
                        helperText={secretOrPrivateKeyError}
                    />
                </Grid>
                <Grid item xs={6} className={classes.verificationControlWrapper}>
                    <Button color="primary"
                            onClick={handleVerifyButtonClick}
                            disabled={!secretOrPrivateKey || !!secretOrPrivateKeyError}
                    >
                        Verify
                    </Button>
                    {typeof verified === 'boolean' && verified &&
                    <div className={`${classes.verificationResultWrapper} ${classes.success}`}>
                        <CheckCircleOutlineIcon/>
                        <Typography>Verification succeed</Typography>
                    </div>}
                    {typeof verified === 'boolean' && !verified &&
                    <div className={`${classes.verificationResultWrapper} ${classes.failure}`}>
                        <CancelOutlinedIcon/>
                        <Typography>Verification failed</Typography>
                    </div>}
                </Grid>
            </Grid>)}
        </Grid>
    );
};

export default JwtDecoder;