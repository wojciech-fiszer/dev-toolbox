import {Tool} from "./Tool";
import {Typography} from "@material-ui/core";

const tools: Tool[] = [
    {
        id: "first-tool",
        name: "First tool",
        render: () => (<Typography>This is the first tool</Typography>)
    }
];

export default tools;