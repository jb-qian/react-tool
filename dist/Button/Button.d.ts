import * as React from 'react';
interface Props {
    disabled?: boolean;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties | undefined;
    type?: string;
}
export default class Button extends React.Component<Props> {
    constructor(props: Props);
    click: () => void;
    render(): JSX.Element;
}
export {};
