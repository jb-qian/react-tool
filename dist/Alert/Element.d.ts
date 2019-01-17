import * as React from 'react';
import { Props } from './Alert';
interface AlertProps extends Props {
    willUnmount: () => void;
}
interface State {
    name?: string;
    className: string;
}
export default class Element extends React.Component<AlertProps, State> {
    confirm: any;
    constructor(props: AlertProps);
    default: () => void;
    primary: () => void;
    clone: () => void;
    /**
     * 动画结束
     */
    transitionend: () => void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
