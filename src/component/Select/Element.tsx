/*
 * @Author: 宋乾
 * @Date: 2019-01-25 11:50:38
 * @LastEditors: 宋乾
 * @LastEditTime: 2019-03-20 09:49:01
 */
import * as React from 'react';

import { Props, Value } from './Select';
import List from './List';
import * as styles from '../../less/select.module.less';
import * as border from '../../less/border.module.less';

interface SelectProps extends Props {
    willUnmount: () => void;
}

interface State {
    active: boolean;
    data: Value[][];
    value: Value[];
}

export default class Element extends React.Component<SelectProps, State> {

    public refSelectMask:HTMLDivElement | null;

    public timer: NodeJS.Timeout;

    public reflist = {};

    constructor(props: SelectProps) {
        super(props)
        this.state = {
            active: false,
            data: [
                this.props.data
            ],
            value: [],
        }
    }
    public initNumber = (num: number | string) => {
        if (num < 10) {
            num = `0${num}`;
        }
        return num;
    }
    public getMonth = () => {
        let arr: Value[] = [];
        for (let i = 1; i <= 12; i++) {
            arr.push({
                value: this.initNumber(i),
                text: `${this.initNumber(i)}`,
            })
        }
        return arr;
    }
    public getDate = (year: number | string, month: number | string) => {
        year = Number(year);
        month = Number(month);
        let arr: Value[] = [];
        let max = [1, 3, 5, 7, 8, 10, 12].indexOf(month) !== -1 ? 31 : 30;
        if (month === 2) {
            max = (year % 400 === 0 || year % 4 === 0 && year % 100 !== 0) ? 29 : 28;
        }
        for (let i = 1; i <= max; i++) {
            arr.push({
                value: this.initNumber(i),
                text: `${this.initNumber(i)}`,
            })
        }
        return arr;
    }
    public onClose = () => {
        this.props.willUnmount();
    }
    public onConfirm = () => {
        this.props.setValue(this.state.value, true);
        this.props.willUnmount();
    }
    public onChange = (index: number, item: Value = { value: '', text: '' }) => {
        this.setState(prev => {
            let value = [...prev.value];
            value[index] = item;
            return {
                value,
            }
        })
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.props.setValue(this.state.value);
        }, 10);
        this.setState(prev => {
            let data = [...prev.data];
            data[index + 1] = item.children || [];
            return {
                data,
            }
        })
        // 时间单独处理
        if (this.props.type === 'date') {
            this.setState(prev => {
                let data = [...prev.data];
                data[1] = this.getMonth();
                let year = (this.state.value[0] || { value: 1970 }).value;
                let month = (this.state.value[1] || { value: 1 }).value;
                data[2] = this.getDate(year, month);
                return {
                    data,
                }
            })
        }
    }
    public touch = (type: string) => {
        let mask = this.refSelectMask;
        if (mask) {
            mask[type]('touchstart', this.maskTouchStart);
            mask[type]('touchend', this.maskTouchEnd);
        }
    }
    public maskTouchStart = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
    }
    public maskTouchEnd = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        this.onClose();
    }
    public componentDidMount (){
        this.touch('addEventListener');
    }
    public componentWillUnmount (){
        this.touch('removeEventListener');
    }
    public listView (){
        let arr = [];
        let length = Number(this.props.length);
        for (let i = 0; i < length; i++) {
            let data = this.state.data[i] || [];
            arr.push(<List key={ `sq-list-${i}` } onChange={ this.onChange.bind(this, i) } data={ data } />);
        }
        return arr;
    }
    public render(){
        return (
            <div className={ styles.select }>
                <div ref={ e => this.refSelectMask = e } className={ styles.mask } />
                <div className={ styles.box }>
                    <div className={ [styles.head, border.brb].join(' ') }>
                        <div className={ styles.headBtn } onClick={ this.onClose }>取消</div>
                        <div className={ styles.headTitle }>请选择</div>
                        <div className={ [styles.headBtn, styles.headBtnactive].join(' ') } onClick={ this.onConfirm }>确定</div>
                    </div>
                    <div className={ styles.list }>
                        {
                            this.listView().map((item, index) => {
                                return item;
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}