/*
 * @Author: 宋乾
 * @Date: 2019-01-25 15:48:42
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-02-15 15:20:08
 */
import * as React from 'react';

import { Value } from './Select';
/**
 * onChange 点击回调
 * data 转轮数据
 * hash 数据更新标识符
 */
interface ListProps {
    onChange: (item: Value) => void;
    data: Value[];
}
/**
 * currentMove 记录移动的距离
 * transition 移动时候的属性
 * data 数据
 * hash 数据更新标识符
 */
interface State{
    currentMove: number;
    transition: string;
    data: Value[];
}

export default class List extends React.Component<ListProps, State> {
    // 转轮高度
    public height:number = 40;
    // 转轮距离
    public rotateX:number = 22;
    // 转轮最小值
    public min:number = 0;
    // 转轮最大值
    public max:number = 0;
    // 触摸值
    public start: number = 0;
    public move: number = 0;
    public end: number = 0;
    // 开始、结束的位置
    public startY: number = 0;
    public endY: number = 0;
    // 开始、结束时间
    public startTime: number;
    public endTime: number;
    // 获取列表元素
    public refSelectList:HTMLDivElement | null;
    // 是否移动了
    public isMore: boolean = false;
    // 是否结束了
    public isInertial: boolean = false;
    // iPhone苹果需要单独设置 transformOrigin 3d属性不同
    public iPhone: boolean;

    constructor(props: ListProps) {
        super(props)
        this.state = {
            currentMove: 0,
            transition: '',
            data: this.props.data,
        }
        // 获取设备
        let o = window.navigator.platform.toLowerCase();
        let ua = window.navigator.userAgent.toLowerCase();
        this.iPhone = (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1) && (o.indexOf('iphone') > -1 || o.indexOf('ipad') > -1 || o.indexOf('ipod') > -1);
    }
    public onChange = (item: Value) => {
        this.props.onChange(item);
    }
    public renderView = (item: Value, index: number) => {
        let newIndex = Math.abs(index - Math.round(this.state.currentMove / this.rotateX));
        let opacity = 1 - (newIndex / 10 * 2.5);
        let transform = `translateZ(89px) rotateX(-${index * this.rotateX}deg)`;
        let WebkitTransform = transform;
        let transformOrigin = `center center -89px`;
        let WebkitTransformOrigin = transformOrigin;
        if (opacity < 0) {
            opacity = 0;
        }
        let style = { opacity, WebkitTransform, WebkitTransformOrigin, transformOrigin, transform, color: '#333' };
        if (style.opacity !== 0) {
            if (style.opacity !== 1) {
                style.color = '#999';
            }
            return (
                <div style={ style } className={ `sq-select-list-item` } key={ `select-data-${index}` }>{ item.text }</div>
            )
        }
        return '';
    }
    public init = (data: Value[]) => {
        // 触摸值
        this.start = 0;
        this.move = 0;
        this.end = 0;
        // 是否移动了
        this.isMore = false;
        // 是否结束了
        this.isInertial = false;
        // 设置初始化state
        this.setState({
            data,
            currentMove: 0,
            transition: '',
        })
        this.onChange(this.props.data[0]);
    }
    public touch = (type: string) => {
        let list = this.refSelectList;
        if (list) {
            list[type]('touchstart', this.onTouchStart);
            list[type]('touchmove', this.onTouchMove);
            list[type]('touchend', this.onTouchEnd);
        }
    }
    public componentDidMount (){
        if (this.state.data.length) {
            this.init(this.state.data);
        }
        this.touch('addEventListener');
    }
    public componentDidUpdate (){
        this.max = (this.state.data.length - 1) * this.rotateX;
        if (this.props.data.length !== this.state.data.length) {
            this.init(this.props.data);
        }else{
            let len = this.props.data.length;
            for (let i = 0; i < len; i++) {
                if (this.props.data[i].value !== this.state.data[i].value) {
                    return this.init(this.props.data);
                }
            }
        }
    }
    public componentWillUnmount (){
        this.touch('removeEventListener');
    }
    public setTransform = (currentMove: number, transition: string) => {
        this.setState({
            currentMove,
            transition,
        })
    }
    public onTouchStart = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        let { pageY } = e.targetTouches[0];
        this.start = pageY;
        this.startY = pageY;
        this.isMore = false;
        this.startTime = +new Date();
        this.isInertial = false;
    }
    public onTouchMove = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        let { pageY } = e.targetTouches[0];
        this.move = this.start - pageY + this.end;
        if (this.move < this.min - this.rotateX * 2) {
            this.move = this.min - this.rotateX * 2;
        }
        if (this.move > this.max + this.rotateX * 2) {
            this.move = this.max + this.rotateX * 2;
        }
        this.setTransform(this.move, '');
        this.isMore = true;
        this.isInertial = false;
        this.endY = pageY;
    }
    public setEnd = (start: number, position: number, end: number = 0) => {
        const t = 1000 / 60;
        // 加速度
        const a = -0.003;
        // 未结束
        if (start - end > 0 && !this.isInertial) {
            this.isInertial = false;
            // v末 = v初 + at
            let newStart = start + a * t;
            // S = vt + 1/2at^2;
            this.move = (position * start * t) + (0.5 * a * t * t) + this.move;
            if (this.move < this.min - this.rotateX * 2) {
                this.move = this.min - this.rotateX * 2;
                this.isInertial = true;
            }
            if (this.move > this.max + this.rotateX * 2) {
                this.move = this.max + this.rotateX * 2;
                this.isInertial = true;
            }
            this.setTransform(this.move, '');
            requestAnimationFrame(() => {
                this.setEnd(newStart, position, end);
            });
        }else{
            this.isInertial = false;
            // 结束
            if (this.move < this.min) {
                this.move = this.min;
            }
            if (this.move > this.max) {
                this.move = this.max;
            }
            let index = Math.round(this.move / this.rotateX);
            this.setTransform(index * this.rotateX, `transform 300ms ease-out 0s`);
            this.end = this.move;
            this.props.onChange(this.state.data[index]);
        }
    }
    public onTouchEnd = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        this.endTime = +new Date();
        let distance = this.startY - this.endY;
        let end = this.endTime - this.startTime;
        // 速度 v = s / t
        let speed = distance / end;
        let absSpeed = Math.abs(speed);
        let position = absSpeed / speed;
        // 没有滑动
        if (!this.isMore) {
            absSpeed = 0;
        }
        this.setEnd(absSpeed, position, 0);
    }
    public render(){
        let transform = `perspective(1000px) rotateY(0) rotateX(${this.state.currentMove}deg)`;
        let style = { WebkitTransform: transform, transform };
        let transformOrigin = `center center 89px`;
        let iPhone = this.iPhone ? { WebkitTransformOrigin: transformOrigin, transformOrigin } : {};
        return (
            <div className={ `sq-select-list` }>
                <div className={ `sq-select-list-items` } style={{ ...style, ...iPhone, transition: this.state.transition }}>
                    {
                        this.state.data.map((item, index) => {
                            return this.renderView(item, index);
                        })
                    }
                </div>
                <div className={ `sq-select-active brt brb` } />
                <div ref={ e => this.refSelectList = e } className={ `sq-select-mask-content` } />
            </div>
        )
    }
}