/// <reference types="node" />
import * as React from 'react';
import { Props, Value } from './Select';
interface SelectProps extends Props {
    willUnmount: () => void;
}
interface State {
    active: boolean;
    data: Value[][];
    value: Value[];
}
export default class Element extends React.Component<SelectProps, State> {
    refSelectMask: HTMLDivElement | null;
    timer: NodeJS.Timeout;
    reflist: {};
    constructor(props: SelectProps);
    initNumber: (num: string | number) => string | number;
    getMonth: () => Value[];
    getDate: (year: string | number, month: string | number) => Value[];
    onClose: () => void;
    onConfirm: () => void;
    onChange: (index: number, item?: Value) => void;
    touch: (type: string) => void;
    maskTouchStart: (e: any) => void;
    maskTouchEnd: (e: any) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    listView(): JSX.Element[];
    render(): JSX.Element;
}
export {};
