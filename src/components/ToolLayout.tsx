import React from 'react';
import {Typography} from "@material-ui/core";

interface Props {
    title: string;
    children: JSX.Element;
}

const ToolLayout = ({title, children}: Props) => <>
    <Typography variant="h4">{title}</Typography>
    {children}
</>

export default ToolLayout;