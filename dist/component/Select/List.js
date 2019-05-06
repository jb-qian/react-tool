import * as tslib_1 from "tslib";
/*
 * @Author: 宋乾
 * @Date: 2019-01-25 15:48:42
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-05-06 18:59:32
 */
import * as React from 'react';
import Tool from '../Tool/Tool';
import * as styles from '../../less/select.module.less.js';
import * as border from '../../less/border.module.less.js';
let { Mounted } = Tool;
let List = class List extends React.Component {
    constructor(props) {
        super(props);
        // 转轮高度
        this.height = 40;
        // 转轮距离
        this.rotateX = 22;
        // 转轮最小值
        this.min = 0;
        // 转轮最大值
        this.max = 0;
        // 触摸值
        this.start = 0;
        this.move = 0;
        this.end = 0;
        // 开始、结束的位置
        this.startY = 0;
        this.endY = 0;
        // 是否移动了
        this.isMore = false;
        // 是否结束了
        this.isInertial = false;
        this.onChange = (item) => {
            this.props.onChange(item);
        };
        this.renderView = (item, index) => {
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
                return (React.createElement("div", { style: style, className: styles.listItem, key: `select-data-${index}` }, item.text));
            }
            return '';
        };
        this.init = (data) => {
            // 触摸值
            this.start = 0;
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
            });
            this.onChange(this.props.data[0]);
        };
        this.touch = (type) => {
            let list = this.refSelectList;
            if (list) {
                list[type]('touchstart', this.onTouchStart);
                list[type]('touchmove', this.onTouchMove);
                list[type]('touchend', this.onTouchEnd);
            }
        };
        this.setTransform = (currentMove, transition) => {
            this.setState({
                currentMove,
                transition,
            });
        };
        this.onTouchStart = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { pageY } = e.targetTouches[0];
            this.start = pageY;
            this.end = this.state.currentMove;
            this.isMore = false;
            this.startTime = +new Date();
            this.isInertial = false;
            this.startY = pageY;
        };
        this.onTouchMove = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { pageY } = e.targetTouches[0];
            let move = (this.start - pageY) / 1.5 + this.end;
            if (move < this.min - this.rotateX) {
                move = this.min - this.rotateX;
            }
            if (move > this.max + this.rotateX) {
                move = this.max + this.rotateX;
            }
            this.setTransform(move, '');
            this.isMore = true;
            this.isInertial = false;
            this.endY = pageY;
        };
        this.setEnd = (start, position, end = 0) => {
            const t = 1000 / 60 / 3.5;
            // 加速度
            const a = -0.003;
            // 移动的距离
            let move = this.state.currentMove;
            // 未结束
            if (start - end > 0 && !this.isInertial) {
                this.isInertial = false;
                // v末 = v初 + at
                let newStart = start + a * t;
                // S = vt + 1/2at^2;
                move = (position * start * t) + (0.5 * a * t * t) + move;
                if (move < this.min - this.rotateX) {
                    move = this.min - this.rotateX;
                    this.isInertial = true;
                }
                if (move > this.max + this.rotateX) {
                    move = this.max + this.rotateX;
                    this.isInertial = true;
                }
                this.setTransform(move, '');
                requestAnimationFrame(() => {
                    this.setEnd(newStart, position, end);
                });
            }
            else {
                this.isInertial = false;
                // 结束
                if (move < this.min) {
                    move = this.min;
                }
                if (move > this.max) {
                    move = this.max;
                }
                let index = Math.round(move / this.rotateX);
                this.setTransform(index * this.rotateX, `transform 200ms ease-out 0s`);
                this.onChange(this.state.data[index]);
            }
        };
        this.onTouchEnd = (e) => {
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
        };
        this.state = {
            currentMove: 0,
            transition: '',
            data: this.props.data,
        };
        // 获取设备
        let o = window.navigator.platform.toLowerCase();
        let ua = window.navigator.userAgent.toLowerCase();
        this.iPhone = (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1) && (o.indexOf('iphone') > -1 || o.indexOf('ipad') > -1 || o.indexOf('ipod') > -1);
    }
    componentDidMount() {
        this.state.data.length && this.init(this.state.data);
        this.touch('addEventListener');
    }
    componentDidUpdate() {
        this.max = (this.state.data.length - 1) * this.rotateX;
        if (this.props.data.length !== this.state.data.length) {
            this.init(this.props.data);
        }
        else {
            let len = this.props.data.length;
            for (let i = 0; i < len; i++) {
                if (this.props.data[i].value !== this.state.data[i].value) {
                    return this.init(this.props.data);
                }
            }
        }
    }
    componentWillUnmount() {
        this.isInertial = true;
        this.touch('removeEventListener');
    }
    render() {
        let transform = `perspective(1000px) rotateY(0) rotateX(${this.state.currentMove}deg)`;
        let style = { WebkitTransform: transform, transform };
        let transformOrigin = `center center 89px`;
        let iPhone = this.iPhone ? { WebkitTransformOrigin: transformOrigin, transformOrigin } : {};
        return (React.createElement("div", { className: styles.list },
            React.createElement("div", { className: styles.listItems, style: Object.assign({}, style, iPhone, { transition: this.state.transition }) }, this.state.data.map((item, index) => {
                return this.renderView(item, index);
            })),
            React.createElement("div", { className: [styles.active, border.brt, border.brb].join(' ') }),
            React.createElement("div", { ref: e => this.refSelectList = e, className: styles.maskContent })));
    }
};
List = tslib_1.__decorate([
    Mounted
], List);
export default List;
