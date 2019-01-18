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
    /**
     * 取消事件
     */
    default: () => void;
    /**
     * 确定事件
     */
    primary: () => void;
    /**
     * 关闭
     */
    clone: () => void;
    /**
     * 动画结束
     */
    transitionend: () => void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
