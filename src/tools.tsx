import {Tool} from "./Tool";
import JwtDecoder from "./tools/JwtDecoder";

const tools: Tool[] = [
    {
        id: "jwt-decoder",
        name: "JWT decoder",
        render: () => <JwtDecoder/>
    }
];

export default tools;