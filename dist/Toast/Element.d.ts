import * as React from 'react';
interface Props {
    duration: number;
    text: string;
    willUnmount: () => void;
}
interface State {
    show: boolean;
    duration: number;
}
export default class Element extends React.Component<Props, State> {
    refs: any;
    toast: any;
    constructor(props: Props);
    /**
     * 动画结束
     */
    transitionend: () => void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
