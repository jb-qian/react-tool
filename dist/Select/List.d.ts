import * as React from 'react';
import { Value } from './Select';
/**
 * onChange 点击回调
 * data 转轮数据
 */
interface ListProps {
    onChange: (item: Value) => void;
    data: Value[];
}
/**
 * currentMove 记录移动的距离
 * iPhone苹果需要单独设置 transformOrigin 3d属性不同
 * transition 移动时候的属性
 */
interface State {
    currentMove: number;
    iPhone: boolean;
    transition: string;
}
export default class List extends React.Component<ListProps, State> {
    height: number;
    rotateX: number;
    min: number;
    max: number;
    start: number;
    move: number;
    end: number;
    startY: number;
    endY: number;
    startTime: number;
    endTime: number;
    refSelectList: HTMLDivElement | null;
    isMore: boolean;
    isInertial: boolean;
    constructor(props: ListProps);
    onChange: (item: Value) => void;
    renderView: (item: Value, index: number) => "" | JSX.Element;
    touch: (type: string) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    setTransform: (currentMove: number, transition: string) => void;
    onTouchStart: (e: any) => void;
    onTouchMove: (e: any) => void;
    setEnd: (start: number, position: number, end?: number) => void;
    onTouchEnd: (e: any) => void;
    render(): JSX.Element;
}
export {};
