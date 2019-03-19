import * as React from 'react';
import { Value } from './Select';
/**
 * @param onChange 点击回调
 * @param data 转轮数据
 * @param hash 数据更新标识符
 */
interface ListProps {
    onChange: (item: Value) => void;
    data: Value[];
}
/**
 * @param currentMove 记录移动的距离
 * @param transition 移动时候的属性
 * @param data 数据
 * @param hash 数据更新标识符
 */
interface State {
    currentMove: number;
    transition: string;
    data: Value[];
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
    iPhone: boolean;
    constructor(props: ListProps);
    onChange: (item: Value) => void;
    renderView: (item: Value, index: number) => "" | JSX.Element;
    init: (data: Value[]) => void;
    touch: (type: string) => void;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    setTransform: (currentMove: number, transition: string) => void;
    onTouchStart: (e: any) => void;
    onTouchMove: (e: any) => void;
    setEnd: (start: number, position: number, end?: number) => void;
    onTouchEnd: (e: any) => void;
    render(): JSX.Element;
}
export {};
