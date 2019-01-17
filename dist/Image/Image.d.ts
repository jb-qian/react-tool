import * as React from 'react';
interface Props {
    src: string;
    alt?: string;
    className?: string;
    defaultSrc?: string;
    onSuccess?: () => void;
    onError?: (e: any) => void;
}
interface State {
    style: object;
    src: string;
}
export default class MyImage extends React.Component<Props, State> {
    image: any;
    constructor(props: Props);
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
