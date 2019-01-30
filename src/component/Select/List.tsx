/*
 * @Author: 宋乾
 * @Date: 2019-01-25 15:48:42
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-01-30 17:24:09
 */
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
interface State{
    index: number;
    iPhone: boolean;
    transition: string;
}

export default class List extends React.Component<ListProps, State> {
    // 转轮高度
    public height:number = 36;
    // 转轮距离
    public rotateX:number = 20;
    // 转轮最小值
    public min:number = 0;
    // 转轮最大值
    public max:number = -((this.props.data.length - 1) * this.height);
    // 触摸值
    public start: number = 0;
    public more: number = 0;
    public end: number = 0;

    public startY: number = 0;
    public endY: number = 0;

    public refSelectList:HTMLDivElement | null;
    
    public startTime: number;
    public endTime: number;

    public isMore: boolean;

    constructor(props: ListProps) {
        super(props)
        this.state = {
            index: 0,
            iPhone: false,
            transition: '',
        }
    }
    public onClick = (item: Value) => {
        this.props.onClick(item);
    }
    public renderView = (item: Value, index: number) => {
        let newIndex = Math.abs(index - this.state.index);
        let opacity = 1 - (newIndex / 10 * 2.5);
        let transform = `translateZ(90px) rotateX(-${index * this.rotateX}deg)`;
        let WebkitTransform = transform;
        let transformOrigin = `center center -90px`;
        let WebkitTransformOrigin = transformOrigin;
        if (opacity < 0) {
            opacity = 0;
        }
        let style = { opacity, WebkitTransform, WebkitTransformOrigin, transformOrigin, transform };
        if (style.opacity !== 0) {
            return (
                <div style={ style } className={ `sq-select-list-item` } key={ `select-data-${index}` }>{ item.text }</div>
            )
        }
        return '';
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
        this.touch('addEventListener');
        let o = window.navigator.platform.toLowerCase();
        let ua = window.navigator.userAgent.toLowerCase();
        let iPhone = (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1) && (o.indexOf('iphone') > -1 || o.indexOf('ipad') > -1 || o.indexOf('ipod') > -1);
        this.setState({
            iPhone,
        })
    }
    public componentWillUnmount (){
        this.touch('removeEventListener');
    }
    public setTransform = (index: number, transition: string) => {
        this.setState({
            index,
            transition,
        })
    }
    public onTouchStart = (e: any) => {
        e.preventDefault();
        let { pageY } = e.targetTouches[0];
        this.start = pageY - (this.end || 0);
        this.startY = pageY;
        this.isMore = false;
        this.startTime = +new Date();
    }
    public onTouchMove = (e: any) => {
        e.preventDefault();
        let { pageY } = e.targetTouches[0];
        this.more = pageY - this.start;
        this.setTransform(-(this.more / this.height), '');
        this.isMore = true;
        this.endY = pageY;
    }
    public setEnd = () => {
        // height的值越小 定格的位置越精准
        let height = 20;
        if (Math.abs(this.end - this.more) > height) {
            // speed越大 转的越慢 时间越久
            let speed = 30;
            this.more += (this.end - this.more) / speed;
            this.setTransform(-(this.more / this.height), '');
            requestAnimationFrame(this.setEnd);
        }else{
            if (this.more > this.min) {
                this.end = this.more = this.min;
            }
            if (this.more < this.max) {
                this.end = this.more = this.max;
            }
            let index = -Math.round(this.more / this.height);
            this.end = -index * this.height;
            this.setTransform(index, `transform .2s ease-out`);
        }
    }
    public onTouchEnd = (e: any) => {
        e.preventDefault();
        this.endTime = +new Date();
        let end = this.endTime - this.startTime;
        let max = 300;
        if (end > max) {
            end = max;
        }
        let time = (max - end) / 50;
        if (this.isMore) {
            this.end = this.more + (this.endY - this.startY) * time;
            if (this.end > this.min) {
                this.end = this.min + 60;
            }
            if (this.end < this.max) {
                this.end = this.max - 60;
            }
        }
        this.setEnd();
    }
    public render(){
        let transform = `perspective(1000px) rotateY(0) rotateX(${this.state.index * this.rotateX}deg)`;
        let style = { WebkitTransform: transform, transform };
        let transformOrigin = `center center 90px`;
        let iPhone = this.state.iPhone ? { WebkitTransformOrigin: transformOrigin, transformOrigin } : {};
        return (
            <div className={ `sq-select-list` }>
                <div className={ `sq-select-list-items` } style={{ ...style, ...iPhone, transition: this.state.transition }}>
                    {
                        this.props.data.map((item, index) => {
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