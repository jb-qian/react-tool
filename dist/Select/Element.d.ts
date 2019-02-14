import * as React from 'react';
import { Props, Value } from './Select';
interface SelectProps extends Props {
    willUnmount: () => void;
}
interface State {
    active: boolean;
}
export default class Element extends React.Component<SelectProps, State> {
    refSelectMask: HTMLDivElement | null;
    constructor(props: SelectProps);
    onClose: () => void;
    onClick: (item: Value) => void;
    onChange: (item: Value) => void;
    touch: (type: string) => void;
    maskTouchStart: (e: any) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
