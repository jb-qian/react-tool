import * as React from 'react';
interface Props {
    text?: string;
    loading: boolean;
}
export default class Loading extends React.Component<Props> {
    constructor(props: Props);
    render(): JSX.Element;
}
export {};
