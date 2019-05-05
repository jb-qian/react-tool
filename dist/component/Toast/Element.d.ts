import * as React from 'react';
import { Props } from './Toast';
interface ToastProps extends Props {
    willUnmount: () => void;
}
interface State {
    show: boolean;
}
export default class Element extends React.Component<ToastProps, State> {
    toast: any;
    constructor(props: ToastProps);
    /**
     * 动画结束
     */
    transitionend: () => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
