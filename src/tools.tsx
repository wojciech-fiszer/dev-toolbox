import {Tool} from "./Tool";
import JwtDecoder from "./tools/JwtDecoder";
import JsonFormatter from "./tools/JsonFormatter";

const tools: Tool[] = [
    {
        id: "jwt-decoder",
        name: "JWT decoder",
        render: () => <JwtDecoder/>
    },
    {
        id: "json-formatter",
        name: "JSON formatter",
        render: () => <JsonFormatter/>
    }
];

export default tools;