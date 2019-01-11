import * as React from 'react';
interface Props {
    default?: () => void;
    title: string;
    primary?: () => void;
    noDefault?: boolean;
    noPrimary?: boolean;
    willUnmount: () => void;
}
interface State {
    name?: string;
    className: string;
}
export default class Element extends React.Component<Props, State> {
    confirm: any;
    constructor(props: Props);
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
