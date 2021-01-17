import React, {useEffect, useState} from 'react';
import {Box, Button, Grid, TextField, Typography} from "@material-ui/core";
import jwt from 'jsonwebtoken';
import {makeStyles} from "@material-ui/styles";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const TOKEN_TEXT_FIELD_ROWS = 24;

const useStyles = makeStyles(() => ({
    textField: {
        width: "100%"
    },
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
    const [encoded, setEncoded] = useState<string>();
    const [decoded, setDecoded] = useState<{ [p: string]: any } | null | undefined>();
    const [verified, setVerified] = useState<boolean>();
    const [secretOrPrivateKey, setSecretOrPrivateKey] = useState<string>();
    const [secretOrPrivateKeyError, setSecretOrPrivateKeyError] = useState<string>();
    useEffect(() => setVerified(undefined), [encoded]);
    useEffect(() => setSecretOrPrivateKeyError(undefined), [secretOrPrivateKey]);
    const classes = useStyles();
    const handleEncodedTokenTextFieldChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        setEncoded(value);
        if (!value) {
            setDecoded(undefined);
            return;
        }
        let decoded: { [p: string]: any } | null;
        try {
            decoded = jwt.decode(value, {
                complete: true,
                json: true
            })
        } catch (error) {
            decoded = null;
        }
        setDecoded(decoded);
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
    const decodedTextFieldValue =
        decoded === undefined
            ? ""
            : decoded === null
            ? "Invalid token"
            : JSON.stringify(decoded, null, 2);
    return (
        <Grid container direction="column" spacing={2}>
            <Grid container spacing={2} item>
                <Grid item xs={6}>
                    <TextField
                        className={classes.textField}
                        label="Encoded"
                        multiline
                        rows={TOKEN_TEXT_FIELD_ROWS}
                        variant="outlined"
                        value={encoded}
                        error={decoded === null}
                        onChange={handleEncodedTokenTextFieldChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        className={classes.textField}
                        label="Decoded"
                        multiline
                        rows={TOKEN_TEXT_FIELD_ROWS}
                        variant="outlined"
                        value={decodedTextFieldValue}
                        error={decoded === null}
                        onChange={() => {
                            // read only text field
                        }}
                    />
                </Grid>
            </Grid>
            {decoded && (<Grid container spacing={2} item>
                <Grid item xs={6}>
                    <TextField
                        className={classes.textField}
                        label={decoded.header.alg.startsWith("HS") ? "Secret" : "Private key"}
                        multiline
                        rows={4}
                        variant="outlined"
                        value={secretOrPrivateKey}
                        onChange={event => setSecretOrPrivateKey(event.target.value)}
                        error={!!secretOrPrivateKeyError}
                        helperText={secretOrPrivateKeyError}
                    />
                </Grid>
                <Grid item xs={6} className={classes.verificationControlWrapper}>
                    <Button color="primary" onClick={handleVerifyButtonClick}>Verify</Button>
                    {typeof verified === 'boolean' && verified &&
                    <div className={`${classes.verificationResultWrapper} ${classes.success}`}>
                        <Box p={1}>
                        </Box>
                        <CheckCircleOutlineIcon/>
                        <Typography>Verification succeed</Typography>
                    </div>}
                    {typeof verified === 'boolean' && !verified &&
                    <div className={`${classes.verificationResultWrapper} ${classes.failure}`}>
                        <Box p={1}>
                        </Box>
                        <CancelOutlinedIcon/>
                        <Typography>Verification failed</Typography>
                    </div>}
                </Grid>
            </Grid>)}
        </Grid>
    );
};

export default JwtDecoder;