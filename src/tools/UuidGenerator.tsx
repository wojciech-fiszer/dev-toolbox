import React, {useState} from 'react';
import {v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5, validate as validateUuid} from 'uuid';
import {Button, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";

const UuidGenerator = () => {
    const [version, setVersion] = useState<"v1" | "v3" | "v4" | "v5">("v4");
    const [amount, setAmount] = useState<string>("1");
    const [amountError, setAmountError] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [namespace, setNamespace] = useState<string>("");
    const [namespaceError, setNamespaceError] = useState<string>("");
    const [uuids, setUuids] = useState<string[]>();
    const validAmountInput = !amountError;
    const validNamespaceInput = !(version === "v3" || version === "v5") || (namespace && !namespaceError);
    const validInputs = validAmountInput && validNamespaceInput;
    const uuidsTextFieldValue = uuids?.join("\n") || "";

    const handleAmountChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        setAmount(value);
        setAmountError("");
        if (!value) {
            setAmountError("Required")
        } else if (isNaN(+value)) {
            setAmountError("Not a number")
        } else if (+value <= 0) {
            setAmountError("Must be greater than 0")
        }
    };

    const handleGenerateButtonClick = () => {
        if (!validInputs) {
            return;
        }
        const uuids = [];
        for (let i = 0; i < +amount; i++) {
            switch (version) {
                case "v1":
                    uuids.push(uuidv1());
                    break;
                case "v3":
                    uuids.push(uuidv3(name, namespace));
                    break;
                case "v4":
                    uuids.push(uuidv4());
                    break;
                case "v5":
                    uuids.push(uuidv5(name, namespace));
                    break;
            }
        }
        setUuids(uuids);
    };

    const handleNamespaceChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const value = event.target.value;
        setNamespace(value);
        setNamespaceError("");
        if (!value) {
            setNamespaceError("Required");
        } else if (!validateUuid(value)) {
            setNamespaceError("Invalid UUID");
        }
    };

    return (
        <Grid container direction="column" spacing={2}>
            <Grid container spacing={2} item>
                <Grid item xs={2}>
                    <TextField
                        label="Amount"
                        value={amount}
                        onChange={handleAmountChange}
                        error={!!amountError}
                        helperText={amountError}
                    />
                </Grid>
                <Grid item xs={2}>
                    <InputLabel id="version-select-label">Version</InputLabel>
                    <Select
                        labelId="version-select-label"
                        id="version-select"
                        fullWidth
                        value={version}
                        onChange={event => setVersion(event.target.value as "v1" | "v3" | "v4" | "v5")}
                    >
                        <MenuItem value="v1">v1</MenuItem>
                        <MenuItem value="v3">v3</MenuItem>
                        <MenuItem value="v4">v4</MenuItem>
                        <MenuItem value="v5">v5</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={2}>
                    {(version === "v3" || version === "v5") && <TextField
                        label="Name"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />}
                </Grid>
                <Grid item xs={2}>
                    {(version === "v3" || version === "v5") && <TextField
                        label="Namespace"
                        value={namespace}
                        onChange={handleNamespaceChange}
                        error={!!namespaceError}
                        helperText={namespaceError}
                    />}
                </Grid>
                <Grid item xs={2}>
                    <Button
                        color="primary"
                        onClick={handleGenerateButtonClick}
                        disabled={!validInputs}
                    >
                        Generate
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                <TextField
                    label="UUIDs"
                    multiline
                    fullWidth
                    rows={24}
                    variant="outlined"
                    value={uuidsTextFieldValue}
                    onChange={() => {
                        // read only text field
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default UuidGenerator;