import * as tslib_1 from "tslib";
/*
 * @Author: 宋乾
 * @Date: 2019-01-25 11:50:38
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-05-06 18:59:21
 */
import * as React from 'react';
import List from './List';
import Tool from '../Tool/Tool';
import * as styles from '../../less/select.module.less.js';
import * as border from '../../less/border.module.less.js';
let { Mounted } = Tool;
let Element = class Element extends React.Component {
    constructor(props) {
        super(props);
        this.isMove = false;
        this.reflist = {};
        this.initNumber = (num) => {
            if (num < 10) {
                num = `0${num}`;
            }
            return num;
        };
        this.getMonth = () => {
            let arr = [];
            for (let i = 1; i <= 12; i++) {
                arr.push({
                    value: this.initNumber(i),
                    text: `${this.initNumber(i)}`,
                });
            }
            return arr;
        };
        this.getDate = (year, month) => {
            year = Number(year);
            month = Number(month);
            let arr = [];
            let max = [1, 3, 5, 7, 8, 10, 12].indexOf(month) !== -1 ? 31 : 30;
            if (month === 2) {
                max = (year % 400 === 0 || year % 4 === 0 && year % 100 !== 0) ? 29 : 28;
            }
            for (let i = 1; i <= max; i++) {
                arr.push({
                    value: this.initNumber(i),
                    text: `${this.initNumber(i)}`,
                });
            }
            return arr;
        };
        this.onClose = () => {
            this.props.willUnmount();
        };
        this.onConfirm = () => {
            this.props.setValue(this.state.value, true);
            this.props.willUnmount();
        };
        this.onChange = (index, item = { value: '', text: '' }) => {
            setTimeout(() => {
                this.props.setValue(this.state.value);
                this.setState(prev => {
                    let value = [...prev.value];
                    let data = [...prev.data];
                    value[index] = item;
                    // 时间单独处理
                    if (this.props.type === 'date') {
                        data[1] = this.getMonth();
                        let year = (this.state.value[0] || { value: 1970 }).value;
                        let month = (this.state.value[1] || { value: 1 }).value;
                        data[2] = this.getDate(year, month);
                    }
                    else {
                        data[index + 1] = item.children || [];
                    }
                    return {
                        data,
                        value,
                    };
                });
            }, 0);
        };
        this.touch = (type) => {
            let mask = this.refSelectMask;
            if (mask) {
                mask[type]('touchstart', this.maskTouchStart);
                mask[type]('touchmove', this.maskTouchMove);
                mask[type]('touchend', this.maskTouchEnd);
            }
        };
        this.maskTouchStart = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.isMove = false;
        };
        this.maskTouchMove = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.isMove = true;
        };
        this.maskTouchEnd = (e) => {
            e.preventDefault();
            e.stopPropagation();
            !this.isMove && this.onClose();
        };
        this.state = {
            active: false,
            data: [
                this.props.data
            ],
            value: [],
        };
    }
    componentDidMount() {
        this.touch('addEventListener');
    }
    componentWillUnmount() {
        this.touch('removeEventListener');
    }
    listView() {
        let arr = [];
        let length = Number(this.props.length);
        for (let i = 0; i < length; i++) {
            let data = this.state.data[i] || [];
            arr.push(React.createElement(List, { key: `sq-list-${i}`, onChange: this.onChange.bind(this, i), data: data }));
        }
        return arr;
    }
    render() {
        return (React.createElement("div", { className: styles.select },
            React.createElement("div", { ref: e => this.refSelectMask = e, className: styles.mask }),
            React.createElement("div", { className: styles.box },
                React.createElement("div", { className: [styles.head, border.brb].join(' ') },
                    React.createElement("div", { className: styles.headBtn, onClick: this.onClose }, "\u53D6\u6D88"),
                    React.createElement("div", { className: styles.headTitle }, "\u8BF7\u9009\u62E9"),
                    React.createElement("div", { className: [styles.headBtn, styles.headBtnactive].join(' '), onClick: this.onConfirm }, "\u786E\u5B9A")),
                React.createElement("div", { className: styles.list }, this.listView().map((item, index) => {
                    return item;
                })))));
    }
};
Element = tslib_1.__decorate([
    Mounted
], Element);
export default Element;
