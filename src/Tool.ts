export interface Tool {
    id: string;
    name: string;
    render: () => JSX.Element;
}