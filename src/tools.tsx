import {Tool} from "./Tool";
import JwtDecoder from "./tools/JwtDecoder";
import JsonFormatter from "./tools/JsonFormatter";
import UuidGenerator from "./tools/UuidGenerator";
import Base64Encoder from "./tools/Base64Encoder";

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
    },
    {
        id: "uuid-generator",
        name: "UUID generator",
        render: () => <UuidGenerator/>
    },
    {
        id: "base64-encoder",
        name: "Base64 encoder",
        render: () => <Base64Encoder/>
    }
];

export default tools;