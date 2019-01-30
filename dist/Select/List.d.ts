import * as React from 'react';
import { Value } from './Select';
/**
 * onClick 点击回调
 * data 转轮数据
 */
interface ListProps {
    onClick: (item: Value) => void;
    data: Value[];
}
interface State {
    index: number;
    iPhone: boolean;
    transition: string;
}
export default class List extends React.Component<ListProps, State> {
    height: number;
    rotateX: number;
    min: number;
    max: number;
    start: number;
    more: number;
    end: number;
    startY: number;
    endY: number;
    refSelectList: HTMLDivElement | null;
    startTime: number;
    endTime: number;
    isMore: boolean;
    constructor(props: ListProps);
    onClick: (item: Value) => void;
    renderView: (item: Value, index: number) => "" | JSX.Element;
    touch: (type: string) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    setTransform: (index: number, transition: string) => void;
    onTouchStart: (e: any) => void;
    onTouchMove: (e: any) => void;
    setEnd: () => void;
    onTouchEnd: (e: any) => void;
    render(): JSX.Element;
}
export {};
